<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\FeedbackRepository;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class FeedbackController extends Controller
{
    use ApiResponseTrait;

    protected $repository;

    public function __construct(FeedbackRepository $repository)
    {
        $this->repository = $repository;
    }

    public function get(Request $request)
    {
        try {
            $data = $this->repository->get($request);
            return $this->successResponse($data, 'Product Feedback fetched successfully', 200);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
    public function userFeedback(Request $request)
    {
        try {
            $data = $this->repository->getUserProductFeedback($request);
            return $this->successResponse($data, 'Product Feedback fetched successfully', 200);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function add(Request $request)
    {
        DB::beginTransaction();

        try {
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'category' => 'required',
                'description' => 'required',
            ]);

            if ($validator->fails()) {
                return $this->validationErrorResponse($validator->errors());
            }

            $this->repository->store($request);

            DB::commit();
            return $this->successResponse(null, 'Feedback Added Successfully', 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
}

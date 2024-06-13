<?php

namespace App\Repositories;

use App\Interfaces\AppInterface;
use App\Models\Feedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FeedbackRepository implements AppInterface
{
    public function get(Request $request)
    {
        $feedbacks = Feedback::whereHas('product', function ($query) use ($request) {
            $query->where('slug', $request->product_slug);
        })->with('product:id,name', 'comments.user', 'user:id,name')
        ->latest()->paginate(5);

        return $feedbacks;
    }

    public function getUserProductFeedback(Request $request)
    {
        $feedback = Feedback::where('user_id', Auth::id())->whereHas('product', function ($query) use ($request) {
            $query->where('slug', $request->product_slug);
        })->with('comments.user')->first();

        return $feedback;
    }

    public function store(Request $request)
    {
        $data = $request->all();

        Feedback::create($data);
    }
}

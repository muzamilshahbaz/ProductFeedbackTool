<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\FeedbackController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('unauthenticated', function (){
    return response()->json('Please login to continue', 401);
})->name('api.unauthenticated');

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('user', [AuthController::class, 'user']);
    Route::get('products', [ProductController::class, 'get']);
    Route::get('feedbacks', [FeedbackController::class, 'get']);
    Route::post('feedbacks/add', [FeedbackController::class, 'add']);
    Route::get('feedback/user/get', [FeedbackController::class, 'userFeedback']);
    Route::post('comments/add', [CommentController::class, 'add']);
});

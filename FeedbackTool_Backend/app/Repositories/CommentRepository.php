<?php

namespace App\Repositories;

use App\Interfaces\AppInterface;
use App\Models\Comment;
use App\Models\Product;
use Illuminate\Http\Request;

class CommentRepository implements AppInterface
{
    public function get(Request $request)
    {
    }

    public function store(Request $request)
    {
        $data = $request->all();

        $comment = Comment::create($data);
        $comment = Comment::with('user')->find($comment->id);
        return $comment;
    }
}

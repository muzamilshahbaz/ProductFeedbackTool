<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\User;
use App\Models\Feedback;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $feedbacks = Feedback::all();

        Comment::factory()->count(100)->make()->each(function ($comment) use ($users, $feedbacks) {
            $comment->user_id = $users->random()->id;
            $comment->feedback_id = $feedbacks->random()->id;
            $comment->save();
        });
    }
}

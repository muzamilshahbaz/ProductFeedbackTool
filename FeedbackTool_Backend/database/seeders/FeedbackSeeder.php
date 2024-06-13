<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use App\Models\Feedback;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class FeedbackSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::pluck('id');
        $products = Product::pluck('id');

        $feedbackCount = 50;

        // Ensure we have enough combinations available
        if ($users->count() * $products->count() < $feedbackCount) {
            info('Not enough combinations available.');
        } else {

            $createdFeedbackCount = 0;

            // Generate feedback until the desired count is reached
            while ($createdFeedbackCount < $feedbackCount) {
                $userId = $users->random();
                $productId = $products->random();

                // Check if a feedback already exists for this user and product
                $existingFeedback = Feedback::where('user_id', $userId)
                                            ->where('product_id', $productId)
                                            ->exists();

                // If no feedback exists for this user and product, create one
                if (!$existingFeedback) {
                    Feedback::factory()->create([
                        'user_id' => $userId,
                        'product_id' => $productId,
                    ]);
                    $createdFeedbackCount++;
                }
            }
        }

    }
}

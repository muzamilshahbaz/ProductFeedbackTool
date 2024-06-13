<?php

namespace Database\Factories;

use App\Models\Feedback;
use App\Traits\CommonTrait;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Feedback>
 */
class FeedbackFactory extends Factory
{
    use CommonTrait;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Feedback::class;

    public function definition(): array
    {
        $categories = $this->getFeedbackCategories();

        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'category' => $this->faker->randomElement($categories),
        ];
    }
}

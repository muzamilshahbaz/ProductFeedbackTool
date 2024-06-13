<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'HubSpot',
                'slug' => 'hub-spot',
                'image' => 'uploads/hubspot.jpg',
            ],
            [
                'name' => 'Facebook',
                'slug' => 'face-book',
                'image' => 'uploads/facebook.png',
            ],
            [
                'name' => 'Instagram',
                'slug' => 'insta-gram',
                'image' => 'uploads/instagram.jpg',
            ],
            [
                'name' => 'X (formerly Twitter)',
                'slug' => 'x-twitter',
                'image' => 'uploads/x.png',
            ],
            [
                'name' => 'Laravel',
                'slug' => 'laravel',
                'image' => 'uploads/laravel.png',
            ],
            [
                'name' => 'Google',
                'slug' => 'google',
                'image' => 'uploads/google.png',
            ],
        ];

        // Insert products using the Product model
        Product::insert($products);
    }
}

<?php

namespace App\Repositories;

use App\Interfaces\AppInterface;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class ProductRepository implements AppInterface
{
    public function get(Request $request)
    {
        $products = Product::withCount('feedbacks')->get();

        return $products;
    }

    public function store(Request $request)
    {

    }
}

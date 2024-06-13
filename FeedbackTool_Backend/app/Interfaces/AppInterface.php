<?php

namespace App\Interfaces;

use Illuminate\Http\Request;

interface AppInterface
{
    public function get(Request $request);

    public function store(Request $request);
}

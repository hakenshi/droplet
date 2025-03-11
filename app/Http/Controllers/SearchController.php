<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function findUserByUsername(string $username)
    {
        return new UserResource(User::query()->whereLike($username)->get());
    }
}
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\TodoController;

Route::apiResource('todos', TodoController::class);

<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\CustomerController;
use App\Http\Controllers\Api\V1\RentalInitializationController;
use App\Http\Controllers\Api\V1\ReservationController;
use App\Http\Controllers\Api\V1\VehicleController;
use App\Http\Controllers\RentalController;
use Illuminate\Support\Facades\Route;

Route::prefix('/auth')->group(function () {
    Route::post('signup', [AuthController::class, 'signup']);
    Route::post('signin', [AuthController::class, 'signin']);
    Route::delete('signout', [AuthController::class, 'signout'])->middleware('auth:sanctum');
    Route::get('me', [AuthController::class, 'me'])->middleware('auth:sanctum');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('vehicles', VehicleController::class);
    Route::apiResource('customers', CustomerController::class);
    Route::apiResource('reservations', ReservationController::class);

    Route::post('rentals', RentalInitializationController::class);
    Route::get('rentals', [RentalController::class, 'index']);
    Route::get('rentals/{rental:rental_number}', [RentalController::class, 'show']);
});

<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\CustomerController;
use App\Http\Controllers\Api\V1\DocumentController;
use App\Http\Controllers\Api\V1\RentalDetailsUpdateController;
use App\Http\Controllers\Api\V1\RentalDocumentController;
use App\Http\Controllers\Api\V1\RentalInitializationController;
use App\Http\Controllers\Api\V1\RentalStartController;
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


    /**
     * Rentals
     */
    Route::post('rentals', RentalInitializationController::class);
    Route::get('rentals', [RentalController::class, 'index']);
    Route::get('rentals/{rental:rental_number}', [RentalController::class, 'show']);

    Route::put('rentals/{rental:rental_number}/vehicle', [RentalDetailsUpdateController::class, 'vehicle']);
    Route::put('rentals/{rental:rental_number}/renter', [RentalDetailsUpdateController::class, 'renter']);
    Route::put('rentals/{rental:rental_number}/timeframe', [RentalDetailsUpdateController::class, 'timeframe']);
    Route::put('rentals/{rental:rental_number}/rate', [RentalDetailsUpdateController::class, 'rate']);
    Route::put('rentals/{rental:rental_number}/notes', [RentalDetailsUpdateController::class, 'notes']);

    /**
     * Rental actions
     */
    Route::post('rentals/{rental:rental_number}/start', RentalStartController::class);


    /**
     * Rental Documents
     */
    Route::get('rentals/{rental:rental_number}/documents', [RentalDocumentController::class, 'index']);
    Route::post('rentals/{rental:rental_number}/documents', [RentalDocumentController::class, 'store']);
    Route::get('rentals/{rental:rental_number}/documents/{document}', [RentalDocumentController::class, 'show']);
    Route::put('rentals/{rental:rental_number}/documents/{document}', [RentalDocumentController::class, 'update']);
    Route::delete('rentals/{rental:rental_number}/documents/{document}', [RentalDocumentController::class, 'destroy']);


    /**
     * Documents
     */
    Route::post('documents', [DocumentController::class, 'store']);
    Route::get('documents/{document}', [DocumentController::class, 'show']);
});

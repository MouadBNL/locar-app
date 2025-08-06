<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\CalendarController;
use App\Http\Controllers\Api\V1\CustomerController;
use App\Http\Controllers\Api\V1\CustomerRatingController;
use App\Http\Controllers\Api\V1\DocumentController;
use App\Http\Controllers\Api\V1\RentalAgreementGenerateController;
use App\Http\Controllers\Api\V1\RentalController;
use App\Http\Controllers\Api\V1\RentalDetailsUpdateController;
use App\Http\Controllers\Api\V1\RentalDocumentController;
use App\Http\Controllers\Api\V1\RentalInitializationController;
use App\Http\Controllers\Api\V1\RentalPaymentController;
use App\Http\Controllers\Api\V1\RentalReturnController;
use App\Http\Controllers\Api\V1\RentalStartController;
use App\Http\Controllers\Api\V1\ReservationController;
use App\Http\Controllers\Api\V1\StatisticsController;
use App\Http\Controllers\Api\V1\TrafficInfractionController;
use App\Http\Controllers\Api\V1\VehicleController;
use App\Http\Controllers\Api\V1\VehicleExpenseController;
use App\Http\Controllers\Api\V1\VehicleRepairController;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomain;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;

Route::prefix('/auth')->group(function () {
    Route::post('signup', [AuthController::class, 'signup']);
    Route::post('signin', [AuthController::class, 'signin']);
    Route::delete('signout', [AuthController::class, 'signout'])->middleware('auth:sanctum');
    Route::get('me', [AuthController::class, 'me'])->middleware('auth:sanctum');
});

Route::middleware([
    'api',
    InitializeTenancyByDomain::class,
    PreventAccessFromCentralDomains::class,
])->group(function () {
    Route::get('/', function () {
        return 'This is your multi-tenant application. The id of the current tenant is ' . tenant('id');
    });

    Route::get('/test', function () {
        return [
            'tenant' => tenant('id'),
            'database' => DB::connection()->getDatabaseName(),
            'users' => User::all(),
        ];
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('customers', CustomerController::class);

    Route::get('customers/{customer}/ratings', [CustomerRatingController::class, 'index']);
    Route::delete('customers/{customer}/ratings/{rating}', [CustomerRatingController::class, 'destroy']);

    Route::apiResource('vehicles', VehicleController::class);
    Route::apiResource('vehicles/{vehicle}/expenses', VehicleExpenseController::class);
    Route::apiResource('vehicles/{vehicle}/repairs', VehicleRepairController::class);

    Route::get('reservations', [ReservationController::class, 'index']);
    Route::get('reservations/{reservation:reservation_number}', [ReservationController::class, 'show']);
    Route::post('reservations', [ReservationController::class, 'store']);
    Route::put('reservations/{reservation:reservation_number}', [ReservationController::class, 'update']);
    Route::delete('reservations/{reservation:reservation_number}', [ReservationController::class, 'destroy']);

    /**
     * Rentals
     */
    Route::post('rentals', RentalInitializationController::class);
    Route::get('rentals', [RentalController::class, 'index']);
    Route::get('rentals/{rental:rental_number}', [RentalController::class, 'show']);
    Route::delete('rentals/{rental:rental_number}', [RentalController::class, 'destroy']);

    Route::put('rentals/{rental:rental_number}/vehicle', [RentalDetailsUpdateController::class, 'vehicle']);
    Route::put('rentals/{rental:rental_number}/renter', [RentalDetailsUpdateController::class, 'renter']);
    Route::put('rentals/{rental:rental_number}/timeframe', [RentalDetailsUpdateController::class, 'timeframe']);
    Route::put('rentals/{rental:rental_number}/rate', [RentalDetailsUpdateController::class, 'rate']);
    Route::put('rentals/{rental:rental_number}/notes', [RentalDetailsUpdateController::class, 'notes']);

    /**
     * Rental actions
     */
    Route::post('rentals/{rental:rental_number}/start', RentalStartController::class);
    Route::post('rentals/{rental:rental_number}/return', RentalReturnController::class);
    Route::post('rentals/{rental:rental_number}/agreement', RentalAgreementGenerateController::class);

    /**
     * Rental Documents
     */
    Route::get('rentals/{rental:rental_number}/documents', [RentalDocumentController::class, 'index']);
    Route::post('rentals/{rental:rental_number}/documents', [RentalDocumentController::class, 'store']);
    Route::get('rentals/{rental:rental_number}/documents/{document}', [RentalDocumentController::class, 'show']);
    Route::put('rentals/{rental:rental_number}/documents/{document}', [RentalDocumentController::class, 'update']);
    Route::delete('rentals/{rental:rental_number}/documents/{document}', [RentalDocumentController::class, 'destroy']);

    /**
     * Rental Payments
     */
    Route::get('rentals/{rental:rental_number}/payments', [RentalPaymentController::class, 'index']);
    Route::post('rentals/{rental:rental_number}/payments', [RentalPaymentController::class, 'store']);
    Route::get('rentals/{rental:rental_number}/payments/{payment}', [RentalPaymentController::class, 'show']);
    Route::put('rentals/{rental:rental_number}/payments/{payment}', [RentalPaymentController::class, 'update']);
    Route::delete('rentals/{rental:rental_number}/payments/{payment}', [RentalPaymentController::class, 'destroy']);

    /**
     * Documents
     */
    Route::post('documents', [DocumentController::class, 'store']);
    Route::get('documents/{document}', [DocumentController::class, 'show']);

    /**
     * Calendar
     */
    Route::get('calendar', [CalendarController::class, 'index']);

    /*
     * Traffic Infractions
     */
    Route::get('traffic-infractions', [TrafficInfractionController::class, 'index']);
    Route::post('traffic-infractions', [TrafficInfractionController::class, 'store']);
    Route::get('traffic-infractions/{trafficInfraction}', [TrafficInfractionController::class, 'show']);
    Route::put('traffic-infractions/{trafficInfraction}', [TrafficInfractionController::class, 'update']);
    Route::delete('traffic-infractions/{trafficInfraction}', [TrafficInfractionController::class, 'destroy']);

    /**
     * Statistics
     */
    Route::get('statistics/global', [StatisticsController::class, 'global']);
    Route::get('statistics/vehicles/{vehicle}', [StatisticsController::class, 'vehicle']);
});

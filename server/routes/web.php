<?php

use App\Data\RentalData;
use App\Models\Rental;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


Route::get('rentals/{rental:rental_number}/agreement', function (Rental $rental) {
    return view('agreement.template', ['rental' => RentalData::fromModel($rental)]);
});

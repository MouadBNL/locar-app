<?php

namespace App\Http\Controllers;

use App\Http\Resources\RentalSummaryResource;
use App\Models\Rental;
use Illuminate\Http\Request;

class RentalController extends Controller
{
    public function index()
    {
        $rentals = Rental::with(['rate', 'timeframe', 'renter', 'vehicle'])->get();

        return response()->json([
            'data' => RentalSummaryResource::collection($rentals),
        ]);
    }
}

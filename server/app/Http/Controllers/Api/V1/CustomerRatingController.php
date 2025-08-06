<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\CustomerRatingResource;
use App\Models\Customer;
use App\Models\CustomerRating;

class CustomerRatingController extends ApiController
{
    public function index($customer)
    {
        $customer = Customer::findOrFail($customer);
        return $this->success(CustomerRatingResource::collection($customer->ratings()->with('rental')->get()));
    }

    public function destroy($customer, $rating)
    {
        $customer = Customer::findOrFail($customer);
        $rating = CustomerRating::findOrFail($rating);
        $rating->delete();

        return $this->success(null, 'rating.deleted');
    }
}

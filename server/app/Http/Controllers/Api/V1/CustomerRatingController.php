<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\CustomerRatingResource;
use App\Models\Customer;
use App\Models\CustomerRating;

class CustomerRatingController extends ApiController
{
    public function index(Customer $customer)
    {
        return $this->success(CustomerRatingResource::collection($customer->ratings()->with('rental')->get()));
    }

    public function destroy(Customer $customer, CustomerRating $rating)
    {
        $rating->delete();

        return $this->success(null, 'rating.deleted');
    }
}

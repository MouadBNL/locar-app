<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\CustomerCreateRequest;
use App\Http\Requests\CustomerUpdateRequest;
use App\Http\Resources\CustomerResource;
use App\Models\Customer;

class CustomerController extends ApiController
{
    public function index()
    {
        $customers = Customer::with('ratings')->get();

        return $this->success(CustomerResource::collection($customers), 'customer.index.success');
    }

    public function show(Customer $customer)
    {
        $customer->load('activeRenter', 'activeReservation', 'ratings');

        return $this->success(new CustomerResource($customer), 'customer.show.success');
    }

    public function store(CustomerCreateRequest $request)
    {
        $customer = Customer::create($request->validated());

        return $this->success(new CustomerResource($customer), 'customer.create.success');
    }

    public function update(CustomerUpdateRequest $request, Customer $customer)
    {
        $customer->update($request->validated());

        return $this->success(new CustomerResource($customer), 'customer.update.success');
    }

    public function destroy(Customer $customer)
    {
        $customer->delete();

        return $this->success(null, 'customer.delete.success');
    }
}

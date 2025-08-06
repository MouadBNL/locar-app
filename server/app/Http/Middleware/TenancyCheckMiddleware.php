<?php

namespace App\Http\Middleware;

use App\Models\Tenant;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

class TenancyCheckMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Step 1: Authenticate user (assumes Sanctum auth has already run)
        $user = $request->user();
        if (! $user) {
            throw new HttpException(401, 'Unauthenticated.');
        }

        // Step 2: Resolve tenant from the 'X-Tenant' header
        $tenantId = $request->header('X-Tenant');

        if (! $tenantId) {
            throw new HttpException(400, 'X-Tenant header is required.');
        }

        /** @var Tenant|null $tenant */
        $tenant = tenancy()->find($tenantId); // Uses stancl/tenancy internal API

        if (! $tenant) {
            throw new HttpException(404, 'Tenant not found.');
        }

        // Step 3: Initialize tenancy manually
        tenancy()->initialize($tenant);

        // Step 4: Authorization check - ensure the user can access the tenant
        // For example, if your User model has a tenants() relationship:
        Log::debug('user', [
            'user_tenant_id' => $user->tenant_id,
            'tenant_id' => $tenant->id,
            'comparison' => str($user->tenant_id)->exactly($tenant->id),
        ]);
        if (! str($user->tenant_id)->exactly($tenant->id)) {
            throw new HttpException(
                statusCode: 403,
                message: 'Access denied.',
                code: 0,
            );
        }

        return $next($request);
    }
}

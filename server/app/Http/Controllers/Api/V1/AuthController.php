<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\SignInRequest;
use App\Http\Requests\SignUpRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function signup(SignUpRequest $request)
    {
        $data = $request->validated();
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
        ]);

        $token = $user->createToken('api');

        return response()->json([
            'data' => [
                'token' => $token->plainTextToken,
            ],
        ]);
    }

    public function signin(SignInRequest $request)
    {
        $data = $request->validated();

        $user = User::where('email', $data['email'])->first();

        if (! $user || ! Hash::check($data['password'], $user->password)) {
            return response()->json([
                'data' => null,
                'message' => 'auth.signin.invalid_credentials',
            ]);
        }

        $token = $user->createToken('api');

        return response()->json([
            'data' => [
                'tenant_id' => $user->tenant_id,
                'token' => $token->plainTextToken,
            ],
        ]);
    }

    public function signout(Request $request)
    {
        /** @var mixed $auth * */
        $auth = $request->user();
        $auth->currentAccessToken()->delete();

        return response()->json([
            'data' => null,
            'message' => 'auth.signout.success',
        ]);
    }

    public function me(Request $request)
    {
        $auth = $request->user();

        return response()->json([
            'data' => $auth,
        ]);
    }
}

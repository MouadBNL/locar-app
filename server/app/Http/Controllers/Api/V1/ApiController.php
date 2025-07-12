<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;

class ApiController extends Controller
{
    protected function success($data, $message = null, $code = 200)
    {
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $data,
        ], $code);
    }

    protected function error($message = null, $cause = null, $code = 400)
    {
        return response()->json([
            'status' => 'error',
            'cause' => $cause,
            'message' => $message,
        ], $code);
    }
}

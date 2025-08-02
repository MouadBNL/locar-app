<?php

namespace App\Http\Controllers\Api\V1;

use App\Services\CalendarService;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CalendarController extends ApiController
{
    public function index(Request $request, CalendarService $calendarService)
    {
        // $start = $request->input('start');
        // $end = $request->input('end');
        $start = Carbon::parse('2025-07-01');
        $end = Carbon::parse('2025-08-31');

        $events = $calendarService->get($start, $end);

        return $this->success($events);
    }
}

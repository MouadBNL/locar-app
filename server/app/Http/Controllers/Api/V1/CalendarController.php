<?php

namespace App\Http\Controllers\Api\V1;

use App\Services\CalendarService;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CalendarController extends ApiController
{
    public function index(Request $request, CalendarService $calendarService)
    {
        $start = Carbon::parse($request->input('start_date'));
        $end = Carbon::parse($request->input('end_date'));

        $events = $calendarService->get($start, $end);

        return $this->success($events);
    }
}

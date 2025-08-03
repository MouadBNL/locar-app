<?php

namespace App\Enums;

enum CalendarEventType: string
{
    case RESERVATION = 'reservation';
    case RENTAL_DEPARTURE = 'rental_departure';
    case RENTAL_RETURN = 'rental_return';
    case REPAIR = 'repair';
}

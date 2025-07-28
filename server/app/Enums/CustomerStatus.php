<?php

namespace App\Enums;

enum CustomerStatus: string
{
    case ACTIVE = 'active';
    case BOOKED = 'booked';
    case RENTING = 'renting';
    case INACTIVE = 'inactive';
    case BLACKLISTED = 'blacklisted';
}

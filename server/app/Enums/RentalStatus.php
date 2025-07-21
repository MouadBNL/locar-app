<?php


namespace App\Enums;

enum RentalStatus: string
{
    case DRAFT = 'draft';
    case STARTED = 'started';
    case FINISHED = 'finished';
    case CANCELLED = 'cancelled';
}

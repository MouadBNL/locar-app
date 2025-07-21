<?php

namespace App\Enums;

enum RentalPaymentType: string
{
    case NORMAL = 'normal';
    case DEPOSIT = 'deposit';
    case REFUND = 'refund';
    case OTHER = 'other';
}

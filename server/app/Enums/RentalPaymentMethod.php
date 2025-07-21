<?php

namespace App\Enums;

enum RentalPaymentMethod: string
{
    case CASH = 'cash';
    case CARD = 'card';
    case BANK_TRANSFER = 'bank_transfer';
    case CHEQUE = 'cheque';
    case OTHER = 'other';
}

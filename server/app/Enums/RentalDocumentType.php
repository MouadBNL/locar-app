<?php

namespace App\Enums;

enum RentalDocumentType: string
{
    case RENTAL_AGREEMENT = 'rental_agreement';
    case ID_CARD = 'id_card_scan';
    case DRIVER_LICENSE = 'driver_license_scan';
    case OTHER = 'other';
}

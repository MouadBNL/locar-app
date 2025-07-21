@php
// @var \App\Data\RentalData $rental
@endphp

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rental Agreement</title>
    <style>
        @page {
            size: A4;
            margin: 0;
        }

        .page-break {
            page-break-after: always;
        }

        body {
            border: 1px solid black;
            width: 21cm;
            min-height: 29.7cm;
            margin: 0 auto;
            padding: 0;
            background: white;
        }

        @media print {
            body {
                width: 21cm;
                height: 29.7cm;
                margin: 0;
                padding: 0;
            }
        }

        body {
            font-family: Arial, sans-serif;
        }

        header {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            border-bottom: 1px solid black;
        }


        main>div>div {
            padding: 10px;
        }

        .grid {
            width: 100%;
            border-spacing: 16px;
        }

        .grid-col {
            width: 50%;
            vertical-align: top;
        }

        .grid-cell {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            border-spacing: 30px;
        }

        .bordered {
            border-collapse: collapse;
            border-radius: 10px;
            border: 1px solid #666;
            box-shadow: 0 0 0 1px #666;
        }

    </style>
</head>
<body>
    <header>
        <h1>Rental Agreement</h1>
        <p>Rental Number: {{ $rental->rental_number }}</p>
    </header>

    <main>
        <table class="grid">
            <tr>
                <td class="grid-col" style="padding-right: 16px;">
                    <table class="grid-cell">
                        <tr>
                            <th colspan="2">Vehicle Information</th>
                        </tr>
                        <tr>
                            <td>Make:</td>
                            <td>{{ $rental->vehicle->make }} {{ $rental->vehicle->model }}</td>
                        </tr>
                        <tr>
                            <td>Year:</td>
                            <td>{{ $rental->vehicle->year }}</td>
                        </tr>
                        <tr>
                            <td>License Plate:</td>
                            <td>{{ $rental->vehicle->license_plate }}</td>
                        </tr>
                        <tr>
                            <td>Pickup Location:</td>
                            <td>....</td>
                        </tr>
                        <tr>
                            <td>Return Location:</td>
                            <td>...</td>
                        </tr>
                    </table>

                    <table class="grid-cell">
                        <tr>
                            <th colspan="2">Renter Information</th>
                        </tr>
                        <tr>
                            <td>Name:</td>
                            <td>{{ $rental->renter->full_name }}</td>
                        </tr>
                        <tr>
                            <td>CIN:</td>
                            <td>{{ $rental->renter->id_card_number }}</td>
                        </tr>
                        <tr>
                            <td>Birthday:</td>
                            <td>{{ $rental->renter->birth_date->format('d/m/Y') }}</td>
                        </tr>
                        <tr>
                            <td>Address:</td>
                            <td>{{ $rental->renter->address_primary }}</td>
                        </tr>
                        <tr>
                            <td>Driver's License:</td>
                            <td>{{ $rental->renter->driver_license_number }}</td>
                        </tr>
                        <tr>
                            <td>Issuing City:</td>
                            <td>{{ $rental->renter->driver_license_issuing_city }}</td>
                        </tr>
                        <tr>
                            <td>Issuing Date:</td>
                            <td>{{ $rental->renter->driver_license_issuing_date?->format('d/m/Y') }}</td>
                        </tr>
                        <tr>
                            <td>Expiration Date:</td>
                            <td>{{ $rental->renter->driver_license_expiration_date?->format('d/m/Y') }}</td>
                        </tr>
                        <tr>
                            <td>Passport:</td>
                            <td>{{ $rental->renter->passport_number }}</td>
                        </tr>
                        <tr>
                            <td>Country:</td>
                            <td>{{ $rental->renter->passport_country }}</td>
                        </tr>
                        <tr>
                            <td>Passport Issuing Date:</td>
                            <td>{{ $rental->renter->passport_issuing_date?->format('d/m/Y') }}</td>
                        </tr>
                        <tr>
                            <td>Passport Expiration Date:</td>
                            <td>{{ $rental->renter->passport_expiration_date?->format('d/m/Y') }}</td>
                        </tr>
                        <tr>
                            <td>Phone:</td>
                            <td>{{ $rental->renter->phone }}</td>
                        </tr>
                    </table>

                    <table class="grid-cell">
                        <tr>
                            <th colspan="2">Payments</th>
                        </tr>
                        <tr>
                            <td>Due:</td>
                            <td>{{ 0 }}</td>
                        </tr>
                        <tr>
                            <td>Deposit:</td>
                            <td>{{ 0 }}</td>
                        </tr>
                        <tr>
                            <td>Balance:</td>
                            <td>{{ 0 }}</td>
                        </tr>
                    </table>

                    <table class="grid-cell bordered">
                        <tr>
                            <th colspan="2">Signatures</th>
                        </tr>
                        <tr>
                            <td style="font-size: 12px;">I hereby agree to the terms and conditions of this rental agreement.</td>
                            <td style="font-size: 12px; text-align: right;">I hereby agree to the terms and conditions of this rental agreement.</td>
                        </tr>
                        <tr>
                            <td colspan="2" style="font-size: 10px; font-weight: 100; line-height: 8; text-align: center;">
                                Signature
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="font-size: 12px;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</td>
                        </tr>
                    </table>
                </td>

                <td class="grid-col" style="padding-left: 16px;">
                    <table class="grid-cell">
                        <tr>
                            <th colspan="2">Timeframe Information</th>
                        </tr>
                        <tr>
                            <td>Departure Date:</td>
                            <td>{{ $rental->timeframe->departure_date?->format('d/m/Y') }}</td>
                        </tr>
                        <tr>
                            <td>Return Date:</td>
                            <td>{{ $rental->timeframe->return_date?->format('d/m/Y') }}</td>
                        </tr>
                        <tr>
                            <td>Actual Departure Date:</td>
                            <td>{{ $rental->timeframe->actual_departure_date?->format('d/m/Y') }}</td>
                        </tr>
                        <tr>
                            <td>Actual Return Date:</td>
                            <td>{{ $rental->timeframe->actual_return_date?->format('d/m/Y') }}</td>
                        </tr>
                        <tr>
                            <td>Total Days:</td>
                            <td>{{ $rental->rate->day_quantity }}</td>
                        </tr>
                    </table>

                    <table class="grid-cell">
                        <tr>
                            <th colspan="2">Rate Information</th>
                        </tr>
                        <tr>
                            <td>Day Rate:</td>
                            <td>{{ $rental->rate->day_rate }}</td>
                        </tr>
                        <tr>
                            <td>Day Quantity:</td>
                            <td>{{ $rental->rate->day_quantity }}</td>
                        </tr>
                        <tr>
                            <td>Day Total:</td>
                            <td>{{ $rental->rate->day_total }}</td>
                        </tr>
                        <tr>
                            <td>Insurance Rate:</td>
                            <td>{{ $rental->rate->insurance_rate ?? 0}}</td>
                        </tr>
                        <tr>
                            <td>Insurance Quantity:</td>
                            <td>{{ $rental->rate->insurance_quantity ?? 0}}</td>
                        </tr>
                        <tr>
                            <td>Insurance Total:</td>
                            <td>{{ $rental->rate->insurance_total ?? 0}}</td>
                        </tr>
                        <tr>
                            <td>Extra Rate:</td>
                            <td>{{ $rental->rate->extra_rate ?? 0}}</td>
                        </tr>
                        <tr>
                            <td>Extra Quantity:</td>
                            <td>{{ $rental->rate->extra_quantity ?? 0}}</td>
                        </tr>
                        <tr>
                            <td>Extra Total:</td>
                            <td>{{ $rental->rate->extra_total ?? 0}}</td>
                        </tr>
                        <tr>
                            <td>Total Amount:</td>
                            <td>{{ $rental->rate->total }}</td>
                        </tr>
                    </table>


                    <table class="grid-cell">
                        <tr>
                            <td>Departure Mileage:</td>
                            <td>...............................</td>
                        </tr>
                        <tr>
                            <td>Return Mileage:</td>
                            <td>...............................</td>
                        </tr>
                    </table>

                    <table class="grid-cell">
                        <tr>
                            <th colspan="2">2nd Driver</th>
                        </tr>
                        <tr>
                            <td>Name:</td>
                            <td>...............................</td>
                        </tr>
                        <tr>
                            <td>CIN:</td>
                            <td>...............................</td>
                        </tr>
                        <tr>
                            <td>Driver's License:</td>
                            <td>...............................</td>
                        </tr>
                    </table>


                    <table class="grid-cell bordered">
                        <tr>
                            <th colspan="2">Return Signatures</th>
                        </tr>
                        <tr>
                            <td style="font-size: 12px;">Return signature with date and time</td>
                            <td style="font-size: 12px; text-align: right;">Return signature with date and time</td>
                        </tr>
                        <tr>
                            <td colspan="2" style="font-size: 10px; font-weight: 100; line-height: 8; text-align: center;">
                                Signature
                            </td>
                        </tr>
                    </table>

                    <table class="grid-cell">
                        <tr>
                            <td>Made in</td>
                            <td>...............................</td>
                        </tr>
                        <tr>
                            <td>On</td>
                            <td>{{ now()->format('d/m/Y') }}</td>
                        </tr>
                        <tr>
                            <td>By The Manager</td>
                            <td>...............................</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </main>


    <div class="page-break"></div>

    <main style="padding: 1.5cm; font-size: 13px;">
        <h2>1. Mutual Understanding</h2>

        <h3>1.1 Shared Intent</h3>
        <p>This agreement is entered into with a spirit of mutual respect and understanding. It reflects not only the legal obligations agreed upon by both parties but also a shared commitment to integrity, cooperation, and trust.</p>

        <h3>1.2 Good Faith Engagement</h3>
        <p>Both the Landlord and the Tenant acknowledge the importance of honest and transparent communication. Each party is expected to uphold their responsibilities in good faith and with sincerity throughout the term of this agreement.</p>

        <h2>2. Principles of Tenancy</h2>

        <h3>2.1 Foundation of Fairness</h3>
        <p>This rental relationship is grounded in fairness and mutual accountability. The agreement serves as a framework through which both parties may navigate their rights and responsibilities with clarity and purpose.</p>

        <h3>2.2 Respectful Occupancy</h3>
        <p>It is understood that the Tenant shall treat the premises with care and consideration, while the Landlord shall uphold their duties with consistency, responsiveness, and fairness.</p>

        <h2>3. The Home as a Space</h2>

        <h3>3.1 Meaning Beyond Property</h3>
        <p>A home represents more than a physical structure—it is a place of stability and comfort. This agreement acknowledges that emotional, cultural, and social value resides in the space being occupied.</p>

        <h3>3.2 Preservation of Dignity</h3>
        <p>Accordingly, both parties commit to maintaining the dignity of the space: the Tenant through responsible occupancy, and the Landlord through respectful oversight.</p>

        <h2>4. Conduct and Character</h2>

        <h3>4.1 Spirit of the Agreement</h3>
        <p>Though the clauses of this agreement offer structure, the character of the tenancy will ultimately be shaped by the conduct of the individuals involved. Patience, understanding, and empathy are encouraged in all interactions.</p>

        <h3>4.2 Peaceful Coexistence</h3>
        <p>This agreement supports a vision of peaceful, cooperative living, where differences are addressed with civility and responsibilities are met with reliability.</p>

        <h2>5. Final Reflection</h2>

        <h3>5.1 A Civil Accord</h3>
        <p>Let this agreement stand not only as a record of terms but as a reflection of a civil accord—one entered with intention, honored through action, and concluded with mutual respect.</p>

    </main>

</body>
</html>

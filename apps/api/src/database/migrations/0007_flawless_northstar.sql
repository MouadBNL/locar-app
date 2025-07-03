CREATE TABLE "rental_customers" (
	"id" uuid PRIMARY KEY NOT NULL,
	"rental_id" uuid NOT NULL,
	"customer_id" uuid,
	"full_name" text,
	"phone" text,
	"address1" text,
	"address2" text,
	"id_number" text NOT NULL,
	"id_issued_at" date,
	"id_expired_at" date,
	"id_document" text,
	"license_number" text NOT NULL,
	"license_issued_at" date,
	"license_expired_at" date,
	"license_document" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "rental_periods" (
	"id" uuid PRIMARY KEY NOT NULL,
	"rental_id" uuid NOT NULL,
	"pickup_date" date,
	"return_date" date,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "rental_rates" (
	"id" uuid PRIMARY KEY NOT NULL,
	"rental_id" uuid NOT NULL,
	"unit" text,
	"price_per_unit" integer,
	"number_of_units" integer,
	"total_price" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "rental_vehicles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"rental_id" uuid NOT NULL,
	"vehicle_id" uuid,
	"plate_number" text,
	"brand" text,
	"model" text,
	"year" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "rentals" DROP CONSTRAINT "rentals_vehicle_id_vehicles_id_fk";
--> statement-breakpoint
ALTER TABLE "rentals" DROP CONSTRAINT "rentals_customer_id_customers_id_fk";
--> statement-breakpoint
ALTER TABLE "rental_customers" ADD CONSTRAINT "rental_customers_rental_id_rentals_id_fk" FOREIGN KEY ("rental_id") REFERENCES "public"."rentals"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rental_customers" ADD CONSTRAINT "rental_customers_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rental_periods" ADD CONSTRAINT "rental_periods_rental_id_rentals_id_fk" FOREIGN KEY ("rental_id") REFERENCES "public"."rentals"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rental_rates" ADD CONSTRAINT "rental_rates_rental_id_rentals_id_fk" FOREIGN KEY ("rental_id") REFERENCES "public"."rentals"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rental_vehicles" ADD CONSTRAINT "rental_vehicles_rental_id_rentals_id_fk" FOREIGN KEY ("rental_id") REFERENCES "public"."rentals"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rental_vehicles" ADD CONSTRAINT "rental_vehicles_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rentals" DROP COLUMN "vehicle_id";--> statement-breakpoint
ALTER TABLE "rentals" DROP COLUMN "customer_id";--> statement-breakpoint
ALTER TABLE "rentals" DROP COLUMN "started_at";--> statement-breakpoint
ALTER TABLE "rentals" DROP COLUMN "finished_at";--> statement-breakpoint
ALTER TABLE "rentals" DROP COLUMN "daily_rate";--> statement-breakpoint
ALTER TABLE "rentals" DROP COLUMN "total_days";--> statement-breakpoint
ALTER TABLE "rentals" DROP COLUMN "total_price";
CREATE TABLE "reservations" (
	"id" uuid PRIMARY KEY NOT NULL,
	"vehicle_id" uuid,
	"customer_id" uuid,
	"checkin_date" timestamp,
	"checkout_date" timestamp,
	"daily_rate" integer,
	"total_days" integer,
	"total_price" integer,
	"notes" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;
CREATE TABLE "rentals" (
	"id" uuid PRIMARY KEY NOT NULL,
	"vehicle_id" uuid NOT NULL,
	"customer_id" uuid NOT NULL,
	"code" text NOT NULL,
	"started_at" date,
	"finished_at" date,
	"daily_rate" integer,
	"total_days" integer,
	"total_price" integer,
	"notes" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp,
	CONSTRAINT "rentals_code_unique" UNIQUE("code")
);
--> statement-breakpoint
ALTER TABLE "rentals" ADD CONSTRAINT "rentals_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rentals" ADD CONSTRAINT "rentals_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;
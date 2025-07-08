ALTER TABLE "rental_vehicles" ALTER COLUMN "vehicle_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "rental_vehicles" ADD COLUMN "color" text;--> statement-breakpoint
ALTER TABLE "rental_vehicles" ADD COLUMN "photo_url" text;--> statement-breakpoint
ALTER TABLE "rental_vehicles" ADD COLUMN "doors" integer;--> statement-breakpoint
ALTER TABLE "rental_vehicles" ADD COLUMN "seats" integer;--> statement-breakpoint
ALTER TABLE "rental_vehicles" ADD COLUMN "fuel_type" text;--> statement-breakpoint
ALTER TABLE "rental_vehicles" ADD COLUMN "transmission" text;--> statement-breakpoint
ALTER TABLE "rental_vehicles" ADD COLUMN "mileage" integer;
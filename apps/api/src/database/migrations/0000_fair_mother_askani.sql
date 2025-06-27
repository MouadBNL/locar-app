CREATE TABLE "vehicles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"make" text NOT NULL,
	"model" text NOT NULL,
	"year" integer NOT NULL,
	"license_plate" text NOT NULL,
	"mileage" integer DEFAULT 0 NOT NULL,
	"fuel_type" text NOT NULL,
	"transmission" text NOT NULL,
	"number_of_seats" integer NOT NULL,
	"number_of_doors" integer NOT NULL,
	"color" text,
	"photo_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "vehicles_license_plate_unique" UNIQUE("license_plate")
);

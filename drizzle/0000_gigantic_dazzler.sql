CREATE TYPE "public"."activity_type" AS ENUM('walk', 'play', 'sleep', 'eat', 'exercise', 'rest');--> statement-breakpoint
CREATE TYPE "public"."health_status" AS ENUM('excellent', 'good', 'normal', 'warning', 'critical');--> statement-breakpoint
CREATE TYPE "public"."notification_type" AS ENUM('meal', 'walk', 'medicine', 'checkup', 'grooming', 'reminder');--> statement-breakpoint
CREATE TYPE "public"."pet_type" AS ENUM('dog', 'cat', 'bird', 'rabbit', 'hamster', 'fish', 'reptile', 'other');--> statement-breakpoint
CREATE TABLE "activity_records" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pet_id" uuid NOT NULL,
	"date" timestamp NOT NULL,
	"steps" integer DEFAULT 0,
	"active_minutes" integer DEFAULT 0,
	"sleep_minutes" integer DEFAULT 0,
	"calories" integer DEFAULT 0,
	"distance" numeric(8, 2) DEFAULT '0',
	"activity_type" "activity_type",
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "health_records" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pet_id" uuid NOT NULL,
	"record_date" timestamp NOT NULL,
	"temperature" numeric(4, 1),
	"heart_rate" integer,
	"weight" numeric(5, 2),
	"blood_pressure" text,
	"status" "health_status" DEFAULT 'normal' NOT NULL,
	"symptoms" text,
	"medications" jsonb,
	"vet_notes" text,
	"next_checkup" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "location_records" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pet_id" uuid NOT NULL,
	"latitude" numeric(10, 8) NOT NULL,
	"longitude" numeric(11, 8) NOT NULL,
	"altitude" numeric(8, 2),
	"accuracy" numeric(6, 2),
	"address" text,
	"place_name" text,
	"recorded_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"pet_id" uuid,
	"type" "notification_type" NOT NULL,
	"title" text NOT NULL,
	"message" text NOT NULL,
	"scheduled_at" timestamp,
	"sent_at" timestamp,
	"is_read" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"type" "pet_type" NOT NULL,
	"breed" text,
	"gender" text,
	"birth_date" timestamp,
	"weight" numeric(5, 2),
	"color" text,
	"microchip_id" text,
	"profile_image" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_id" text NOT NULL,
	"email" text NOT NULL,
	"first_name" text,
	"last_name" text,
	"profile_image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_clerk_id_unique" UNIQUE("clerk_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "vaccinations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pet_id" uuid NOT NULL,
	"vaccine_name" text NOT NULL,
	"vaccination_date" timestamp NOT NULL,
	"next_due_date" timestamp,
	"veterinarian" text,
	"clinic" text,
	"batch_number" text,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "voice_commands" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pet_id" uuid NOT NULL,
	"command" text NOT NULL,
	"audio_url" text,
	"description" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "activity_records" ADD CONSTRAINT "activity_records_pet_id_pets_id_fk" FOREIGN KEY ("pet_id") REFERENCES "public"."pets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "health_records" ADD CONSTRAINT "health_records_pet_id_pets_id_fk" FOREIGN KEY ("pet_id") REFERENCES "public"."pets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "location_records" ADD CONSTRAINT "location_records_pet_id_pets_id_fk" FOREIGN KEY ("pet_id") REFERENCES "public"."pets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_pet_id_pets_id_fk" FOREIGN KEY ("pet_id") REFERENCES "public"."pets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pets" ADD CONSTRAINT "pets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vaccinations" ADD CONSTRAINT "vaccinations_pet_id_pets_id_fk" FOREIGN KEY ("pet_id") REFERENCES "public"."pets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "voice_commands" ADD CONSTRAINT "voice_commands_pet_id_pets_id_fk" FOREIGN KEY ("pet_id") REFERENCES "public"."pets"("id") ON DELETE cascade ON UPDATE no action;
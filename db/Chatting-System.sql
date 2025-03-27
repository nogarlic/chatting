CREATE SCHEMA "chat";

CREATE TYPE "chat"."message_type_enum" AS ENUM (
  'text',
  'image',
  'video',
  'pdf'
);

CREATE TABLE "chat"."users" (
  "email" varchar PRIMARY KEY,
  "full_name" varchar,
  "profile_picture" varchar,
  "role" int,
  "created_at" timestamp
);

CREATE TABLE "chat"."chat_rooms" (
  "id" int PRIMARY KEY,
  "room_name" varchar,
  "image_url" varchar,
  "type" varchar,
  "created_at" timestamp
);

CREATE TABLE "chat"."participants" (
  "user_email" varchar NOT NULL,
  "room_id" int NOT NULL,
  "joined_at" timestamp,
  PRIMARY KEY ("user_email", "room_id")
);

CREATE TABLE "chat"."messages" (
  "id" int PRIMARY KEY,
  "room_id" int NOT NULL,
  "user_email" varchar NOT NULL,
  "content" varchar,
  "message_type" varchar,
  "created_at" timestamp
);

CREATE TABLE "chat"."attachments" (
  "id" int PRIMARY KEY,
  "message_id" int NOT NULL,
  "file_url" varchar NOT NULL,
  "file_type" varchar,
  "file_size" int
);

CREATE TABLE "chat"."notifications" (
  "id" int PRIMARY KEY,
  "user_email" varchar NOT NULL,
  "message_id" int NOT NULL,
  "status" varchar,
  "created_at" timestamp
);

CREATE INDEX "message_sender_time" ON "chat"."messages" ("user_email", "created_at");

COMMENT ON COLUMN "chat"."users"."role" IS '0=admin, 1=agent, 2=customer';

COMMENT ON COLUMN "chat"."chat_rooms"."room_name" IS 'Only for group chats';

COMMENT ON COLUMN "chat"."chat_rooms"."image_url" IS 'Chat room image';

COMMENT ON COLUMN "chat"."chat_rooms"."type" IS 'single or group';

COMMENT ON COLUMN "chat"."messages"."message_type" IS 'text, image, video, pdf';

COMMENT ON COLUMN "chat"."attachments"."file_type" IS 'image, video, pdf';

COMMENT ON COLUMN "chat"."attachments"."file_size" IS 'Size in KB';

COMMENT ON COLUMN "chat"."notifications"."status" IS 'unread, read';

ALTER TABLE "chat"."participants" ADD FOREIGN KEY ("user_email") REFERENCES "chat"."users" ("email");

ALTER TABLE "chat"."participants" ADD FOREIGN KEY ("room_id") REFERENCES "chat"."chat_rooms" ("id");

ALTER TABLE "chat"."messages" ADD FOREIGN KEY ("room_id") REFERENCES "chat"."chat_rooms" ("id");

ALTER TABLE "chat"."messages" ADD FOREIGN KEY ("user_email") REFERENCES "chat"."users" ("email");

ALTER TABLE "chat"."attachments" ADD FOREIGN KEY ("message_id") REFERENCES "chat"."messages" ("id");

ALTER TABLE "chat"."notifications" ADD FOREIGN KEY ("user_email") REFERENCES "chat"."users" ("email");

ALTER TABLE "chat"."notifications" ADD FOREIGN KEY ("message_id") REFERENCES "chat"."messages" ("id");

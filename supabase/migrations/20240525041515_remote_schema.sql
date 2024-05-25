REVOKE DELETE ON TABLE "public"."todo" FROM "anon";

REVOKE INSERT ON TABLE "public"."todo" FROM "anon";

REVOKE REFERENCES ON TABLE "public"."todo" FROM "anon";

REVOKE SELECT ON TABLE "public"."todo" FROM "anon";

REVOKE TRIGGER ON TABLE "public"."todo" FROM "anon";

REVOKE TRUNCATE ON TABLE "public"."todo" FROM "anon";

REVOKE UPDATE ON TABLE "public"."todo" FROM "anon";

REVOKE DELETE ON TABLE "public"."todo" FROM "authenticated";

REVOKE INSERT ON TABLE "public"."todo" FROM "authenticated";

REVOKE REFERENCES ON TABLE "public"."todo" FROM "authenticated";

REVOKE SELECT ON TABLE "public"."todo" FROM "authenticated";

REVOKE TRIGGER ON TABLE "public"."todo" FROM "authenticated";

REVOKE TRUNCATE ON TABLE "public"."todo" FROM "authenticated";

REVOKE UPDATE ON TABLE "public"."todo" FROM "authenticated";

REVOKE DELETE ON TABLE "public"."todo" FROM "service_role";

REVOKE INSERT ON TABLE "public"."todo" FROM "service_role";

REVOKE REFERENCES ON TABLE "public"."todo" FROM "service_role";

REVOKE SELECT ON TABLE "public"."todo" FROM "service_role";

REVOKE TRIGGER ON TABLE "public"."todo" FROM "service_role";

REVOKE TRUNCATE ON TABLE "public"."todo" FROM "service_role";

REVOKE UPDATE ON TABLE "public"."todo" FROM "service_role";

ALTER TABLE "public"."todo" DROP CONSTRAINT "todo_user_id_fkey";

ALTER TABLE "public"."todo" DROP CONSTRAINT "todo_pkey";

DROP INDEX IF EXISTS "public"."todo_pkey";

DROP TABLE "public"."todo";

CREATE TABLE "public"."profiles" (
  "id" UUID NOT NULL,
  "updated_at" TIMESTAMP WITH TIME ZONE,
  "username" TEXT,
  "full_name" TEXT,
  "avatar_url" TEXT,
  "website" TEXT
);

ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

CREATE UNIQUE INDEX PROFILES_PKEY ON PUBLIC.PROFILES USING BTREE (ID);

CREATE UNIQUE INDEX PROFILES_USERNAME_KEY ON PUBLIC.PROFILES USING BTREE (USERNAME);

ALTER TABLE "public"."profiles" ADD CONSTRAINT "profiles_pkey" PRIMARY KEY USING INDEX "profiles_pkey";

ALTER TABLE "public"."profiles" ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY (ID) REFERENCES AUTH.USERS(ID) ON DELETE CASCADE NOT VALID;

ALTER TABLE "public"."profiles" VALIDATE CONSTRAINT "profiles_id_fkey";

ALTER TABLE "public"."profiles" ADD CONSTRAINT "profiles_username_key" UNIQUE USING INDEX "profiles_username_key";

ALTER TABLE "public"."profiles" ADD CONSTRAINT "username_length" CHECK ((CHAR_LENGTH(USERNAME) >= 3)) NOT VALID;

ALTER TABLE "public"."profiles" VALIDATE CONSTRAINT "username_length";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION PUBLIC.HANDLE_NEW_USER(
) RETURNS TRIGGER LANGUAGE PLPGSQL SECURITY DEFINER AS
  $FUNCTION$ BEGIN INSERT INTO PUBLIC.PROFILES (
    ID,
    FULL_NAME,
    AVATAR_URL
  ) VALUES (
    NEW.ID,
    NEW.RAW_USER_META_DATA->>'full_name',
    NEW.RAW_USER_META_DATA->>'avatar_url'
  );
  RETURN     NEW;
END;
$FUNCTION$;
GRANT      DELETE ON TABLE "public"."profiles" TO "anon";
GRANT      INSERT ON TABLE "public"."profiles" TO "anon";
GRANT      REFERENCES ON TABLE "public"."profiles" TO "anon";
GRANT     
SELECT
  ON TABLE "public"."profiles" TO "anon";
GRANT      TRIGGER ON TABLE "public"."profiles" TO "anon";
GRANT      TRUNCATE ON TABLE "public"."profiles" TO "anon";
GRANT      UPDATE ON TABLE "public"."profiles" TO "anon";
GRANT      DELETE ON TABLE "public"."profiles" TO "authenticated";
GRANT      INSERT ON TABLE "public"."profiles" TO "authenticated";
GRANT      REFERENCES ON TABLE "public"."profiles" TO "authenticated";
GRANT     
SELECT
  ON TABLE "public"."profiles" TO "authenticated";
GRANT      TRIGGER ON TABLE "public"."profiles" TO "authenticated";
GRANT      TRUNCATE ON TABLE "public"."profiles" TO "authenticated";
GRANT      UPDATE ON TABLE "public"."profiles" TO "authenticated";
GRANT      DELETE ON TABLE "public"."profiles" TO "service_role";
GRANT      INSERT ON TABLE "public"."profiles" TO "service_role";
GRANT      REFERENCES ON TABLE "public"."profiles" TO "service_role";
GRANT     
SELECT
  ON TABLE "public"."profiles" TO "service_role";
GRANT      TRIGGER ON TABLE "public"."profiles" TO "service_role";
GRANT      TRUNCATE ON TABLE "public"."profiles" TO "service_role";
GRANT      UPDATE ON TABLE "public"."profiles" TO "service_role";
CREATE     POLICY "Public profiles are viewable by everyone." ON "public"."profiles" AS PERMISSIVE FOR
SELECT
  TO PUBLIC
  USING (TRUE);
CREATE     POLICY "Users can insert their own profile." ON "public"."profiles" AS PERMISSIVE FOR INSERT TO PUBLIC WITH CHECK (
  (( SELECT AUTH.UID() AS UID) = ID)
);
CREATE     POLICY "Users can update own profile." ON "public"."profiles" AS PERMISSIVE FOR UPDATE TO PUBLIC USING (((
  SELECT
    AUTH.UID() AS UID
) = ID));
REVOKE DELETE ON TABLE "public"."todo_lists" FROM "anon";

REVOKE INSERT ON TABLE "public"."todo_lists" FROM "anon";

REVOKE REFERENCES ON TABLE "public"."todo_lists" FROM "anon";

REVOKE SELECT ON TABLE "public"."todo_lists" FROM "anon";

REVOKE TRIGGER ON TABLE "public"."todo_lists" FROM "anon";

REVOKE TRUNCATE ON TABLE "public"."todo_lists" FROM "anon";

REVOKE UPDATE ON TABLE "public"."todo_lists" FROM "anon";

REVOKE DELETE ON TABLE "public"."todo_lists" FROM "authenticated";

REVOKE INSERT ON TABLE "public"."todo_lists" FROM "authenticated";

REVOKE REFERENCES ON TABLE "public"."todo_lists" FROM "authenticated";

REVOKE SELECT ON TABLE "public"."todo_lists" FROM "authenticated";

REVOKE TRIGGER ON TABLE "public"."todo_lists" FROM "authenticated";

REVOKE TRUNCATE ON TABLE "public"."todo_lists" FROM "authenticated";

REVOKE UPDATE ON TABLE "public"."todo_lists" FROM "authenticated";

REVOKE DELETE ON TABLE "public"."todo_lists" FROM "service_role";

REVOKE INSERT ON TABLE "public"."todo_lists" FROM "service_role";

REVOKE REFERENCES ON TABLE "public"."todo_lists" FROM "service_role";

REVOKE SELECT ON TABLE "public"."todo_lists" FROM "service_role";

REVOKE TRIGGER ON TABLE "public"."todo_lists" FROM "service_role";

REVOKE TRUNCATE ON TABLE "public"."todo_lists" FROM "service_role";

REVOKE UPDATE ON TABLE "public"."todo_lists" FROM "service_role";

ALTER TABLE "public"."todo_lists" DROP CONSTRAINT "todo_lists_user_id_fkey";

ALTER TABLE "public"."todo_lists" DROP CONSTRAINT "todo_lists_pkey";

DROP INDEX IF EXISTS "public"."todo_lists_pkey";

DROP TABLE "public"."todo_lists";

CREATE TABLE "public"."todo" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "title" TEXT,
    "description" TEXT,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "user_id" UUID DEFAULT GEN_RANDOM_UUID()
);

ALTER TABLE "public"."todo" ENABLE ROW LEVEL SECURITY;

CREATE UNIQUE INDEX TODO_PKEY ON PUBLIC.TODO USING BTREE (ID);

ALTER TABLE "public"."todo" ADD CONSTRAINT "todo_pkey" PRIMARY KEY USING INDEX "todo_pkey";

ALTER TABLE "public"."todo" ADD CONSTRAINT "todo_user_id_fkey" FOREIGN KEY (USER_ID) REFERENCES AUTH.USERS(ID) NOT VALID;

ALTER TABLE "public"."todo" VALIDATE CONSTRAINT "todo_user_id_fkey";

GRANT DELETE ON TABLE "public"."todo" TO "anon";

GRANT INSERT ON TABLE "public"."todo" TO "anon";

GRANT REFERENCES ON TABLE "public"."todo" TO "anon";

GRANT SELECT ON TABLE "public"."todo" TO "anon";

GRANT TRIGGER ON TABLE "public"."todo" TO "anon";

GRANT TRUNCATE ON TABLE "public"."todo" TO "anon";

GRANT UPDATE ON TABLE "public"."todo" TO "anon";

GRANT DELETE ON TABLE "public"."todo" TO "authenticated";

GRANT INSERT ON TABLE "public"."todo" TO "authenticated";

GRANT REFERENCES ON TABLE "public"."todo" TO "authenticated";

GRANT SELECT ON TABLE "public"."todo" TO "authenticated";

GRANT TRIGGER ON TABLE "public"."todo" TO "authenticated";

GRANT TRUNCATE ON TABLE "public"."todo" TO "authenticated";

GRANT UPDATE ON TABLE "public"."todo" TO "authenticated";

GRANT DELETE ON TABLE "public"."todo" TO "service_role";

GRANT INSERT ON TABLE "public"."todo" TO "service_role";

GRANT REFERENCES ON TABLE "public"."todo" TO "service_role";

GRANT SELECT ON TABLE "public"."todo" TO "service_role";

GRANT TRIGGER ON TABLE "public"."todo" TO "service_role";

GRANT TRUNCATE ON TABLE "public"."todo" TO "service_role";

GRANT UPDATE ON TABLE "public"."todo" TO "service_role";
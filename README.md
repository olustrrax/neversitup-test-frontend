# Getting Started

### 1. Create a project Supabase
1.1) [Create a new project](https://supabase.com/dashboard) in the Supabase Dashboard.
1.2) Setup the database schema [click](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs?queryGroups=language&language=ts#set-up-the-database-schema)
1.3) Create `todo` schema on [SQL Editor](https://supabase.com/dashboard/project/_/sql/new)
```

CREATE TABLE "public"."todo" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "title" TEXT,
    "description" TEXT,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "user_id" UUID DEFAULT GEN_RANDOM_UUID()
);


-- Create a trigger function to replace user id with authenticated user's ID
CREATE OR REPLACE FUNCTION set_user_id()
RETURNS TRIGGER AS $$
BEGIN
    NEW.user_id := auth.uid(); -- Replace user_id with authenticated user's ID
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to execute the function before insert or update
CREATE TRIGGER replace_user_id_trigger
BEFORE INSERT OR UPDATE ON todo
FOR EACH ROW
EXECUTE FUNCTION set_user_id();

ALTER TABLE todo ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to insert their own rows
CREATE POLICY "Allow insert for authenticated users"
ON todo
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- Allow authenticated users to update their own rows
CREATE POLICY "Allow update for authenticated users"
ON todo
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Allow authenticated users to delete their own rows
create policy "Users can delete a todo."
on todo for delete
to authenticated                     -- the Postgres Role (recommended)
using ( (select auth.uid()) = user_id ); 

```

### 2. Set .env
```
cp .env.exmaple .env
```
Go to the [API Settings](https://supabase.com/dashboard/project/_/settings/api) page in the Dashboard.

```
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

### 3. Install packages

```bash
npm install
```

### 4. Run the project

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

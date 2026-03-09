-- All-in-one SQL setup for techhaven_user, techhaven database, and permissions
-- Run this script in pgAdmin Query Tool as a superuser (e.g., postgres)
-- It grants all necessary permissions to the existing user and database

-- Connect to techhaven database (in pgAdmin, switch connection or run \c techhaven postgres)
-- Then run the following commands:

-- Grant schema permissions
GRANT ALL ON SCHEMA public TO techhaven_user;

-- Grant privileges on existing tables and sequences
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO techhaven_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO techhaven_user;

-- Set ownership for existing tables and sequences
DO $$
DECLARE
    r RECORD;
BEGIN
    -- For tables
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public')
    LOOP
        EXECUTE 'ALTER TABLE public.' || quote_ident(r.tablename) || ' OWNER TO techhaven_user';
    END LOOP;
    -- For sequences
    FOR r IN (SELECT sequencename FROM pg_sequences WHERE schemaname = 'public')
    LOOP
        EXECUTE 'ALTER SEQUENCE public.' || quote_ident(r.sequencename) || ' OWNER TO techhaven_user';
    END LOOP;
END $$;

-- Set default privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO techhaven_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO techhaven_user;

-- Ensure schema ownership
ALTER SCHEMA public OWNER TO techhaven_user;

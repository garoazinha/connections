CREATE TABLE IF NOT EXISTS "schema_migrations" ("version" INTEGER PRIMARY KEY, "inserted_at" TEXT);
CREATE TABLE IF NOT EXISTS "games" ("id" INTEGER PRIMARY KEY AUTOINCREMENT, "extra" TEXT, "inserted_at" TEXT NOT NULL, "updated_at" TEXT NOT NULL);
CREATE TABLE sqlite_sequence(name,seq);
CREATE TABLE IF NOT EXISTS "groups" ("id" INTEGER PRIMARY KEY AUTOINCREMENT, "level" INTEGER, "members" TEXT, "title" TEXT, "game_id" INTEGER CONSTRAINT "groups_game_id_fkey" REFERENCES "games"("id") ON DELETE CASCADE, "inserted_at" TEXT NOT NULL, "updated_at" TEXT NOT NULL);
INSERT INTO schema_migrations VALUES(20240701191110,'2024-07-01T19:59:59');
INSERT INTO schema_migrations VALUES(20240701193226,'2024-07-01T19:59:59');

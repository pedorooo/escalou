-- Schema creation script for Escalou / Adivinhe a Copa

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tournaments
CREATE TABLE IF NOT EXISTS tournaments (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    icon_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Editions
CREATE TABLE IF NOT EXISTS editions (
    id VARCHAR(50) PRIMARY KEY,
    tournament_id VARCHAR(50) REFERENCES tournaments(id) ON DELETE CASCADE,
    year INTEGER NOT NULL,
    host_country VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Teams
CREATE TABLE IF NOT EXISTS teams (
    id VARCHAR(50) PRIMARY KEY,
    edition_id VARCHAR(50) REFERENCES editions(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    flag_code VARCHAR(10) NOT NULL,
    final_result VARCHAR(100)
);

CREATE INDEX IF NOT EXISTS idx_teams_edition_name ON teams(edition_id, name);

-- 4. Players
CREATE TABLE IF NOT EXISTS players (
    id VARCHAR(50) PRIMARY KEY,
    team_id VARCHAR(50) REFERENCES teams(id) ON DELETE CASCADE,
    official_name VARCHAR(150) NOT NULL,
    position VARCHAR(50) NOT NULL,
    shirt_number INTEGER,
    club_at_time VARCHAR(150),
    image_url VARCHAR(500),
    in_starting_eleven BOOLEAN DEFAULT TRUE
);

CREATE INDEX IF NOT EXISTS idx_players_team ON players(team_id);

-- 5. Player Aliases
CREATE TABLE IF NOT EXISTS player_aliases (
    id SERIAL PRIMARY KEY,
    player_id VARCHAR(50) REFERENCES players(id) ON DELETE CASCADE,
    alias VARCHAR(150) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_player_aliases_alias ON player_aliases(alias);
CREATE INDEX IF NOT EXISTS idx_player_aliases_player ON player_aliases(player_id);

-- 6. Users
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name VARCHAR(150),
    email VARCHAR(255) UNIQUE,
    email_verified TIMESTAMP,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Accounts (Social Login Support for NextAuth/OAuth)
CREATE TABLE IF NOT EXISTS accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(50) REFERENCES users(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL,
    provider_account_id VARCHAR(255) NOT NULL,
    type VARCHAR(50),
    refresh_token TEXT,
    access_token TEXT,
    expires_at BIGINT,
    token_type VARCHAR(50),
    scope TEXT,
    id_token TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_provider_account UNIQUE (provider, provider_account_id)
);

-- 8. Game Sessions
CREATE TABLE IF NOT EXISTS game_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    edition_id VARCHAR(50) REFERENCES editions(id),
    user_id VARCHAR(50) REFERENCES users(id) ON DELETE SET NULL,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    finished_at TIMESTAMP,
    time_seconds INTEGER,
    errors_made INTEGER DEFAULT 0,
    skips_used INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'in_progress'
);

-- 9. Game Session Progress
CREATE TABLE IF NOT EXISTS game_session_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES game_sessions(id) ON DELETE CASCADE,
    team_id VARCHAR(50) REFERENCES teams(id),
    status VARCHAR(50) DEFAULT 'pending',
    correct_guesses JSONB DEFAULT '[]'::jsonb
);

-- Schema creation script for Escalou / Adivinhe a Copa

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Editions
CREATE TABLE IF NOT EXISTS editions (
    id VARCHAR(50) PRIMARY KEY,
    ano INTEGER NOT NULL,
    pais_sede VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Teams
CREATE TABLE IF NOT EXISTS teams (
    id VARCHAR(50) PRIMARY KEY,
    edition_id VARCHAR(50) REFERENCES editions(id) ON DELETE CASCADE,
    nome VARCHAR(100) NOT NULL,
    bandeira_codigo VARCHAR(10) NOT NULL,
    resultado_final VARCHAR(100)
);

CREATE INDEX IF NOT EXISTS idx_teams_edition_nome ON teams(edition_id, nome);

-- 3. Players
CREATE TABLE IF NOT EXISTS players (
    id VARCHAR(50) PRIMARY KEY,
    team_id VARCHAR(50) REFERENCES teams(id) ON DELETE CASCADE,
    nome_oficial VARCHAR(150) NOT NULL,
    posicao VARCHAR(50) NOT NULL,
    numero_camisa INTEGER,
    clube_epoca VARCHAR(150),
    pos_x NUMERIC(5,2),
    pos_y NUMERIC(5,2),
    no_onze_medio BOOLEAN DEFAULT TRUE
);

CREATE INDEX IF NOT EXISTS idx_players_team ON players(team_id);

-- 4. Player Aliases
CREATE TABLE IF NOT EXISTS player_aliases (
    id SERIAL PRIMARY KEY,
    player_id VARCHAR(50) REFERENCES players(id) ON DELETE CASCADE,
    alias VARCHAR(150) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_player_aliases_alias ON player_aliases(alias);
CREATE INDEX IF NOT EXISTS idx_player_aliases_player ON player_aliases(player_id);

-- 5. Game Sessions
CREATE TABLE IF NOT EXISTS game_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    edition_id VARCHAR(50) REFERENCES editions(id),
    usuario_id VARCHAR(100),
    iniciado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    finalizado_em TIMESTAMP,
    tempo_segundos INTEGER,
    erros_cometidos INTEGER DEFAULT 0,
    pulos_usados INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'em_andamento'
);

-- 6. Game Session Progress
CREATE TABLE IF NOT EXISTS game_session_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES game_sessions(id) ON DELETE CASCADE,
    team_id VARCHAR(50) REFERENCES teams(id),
    status VARCHAR(50) DEFAULT 'pendente',
    acertos JSONB DEFAULT '[]'::jsonb
);

const fs = require('fs');
const path = require('path');

// Helper to normalize text into a slug
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_-]+/g, '-');
}

// Map position strings
function mapPosition(pos) {
  if (!pos) return 'Meia';
  const p = pos.toLowerCase();
  if (p.includes('goalkeeper')) return 'Goleiro';
  if (p.includes('defence') || p.includes('defender') || p.includes('back')) return 'Zagueiro';
  if (p.includes('midfield')) return 'Meia';
  if (p.includes('offence') || p.includes('forward') || p.includes('striker')) return 'Atacante';
  return 'Meia';
}

function generateSeed() {
  const jsonPath = path.join(__dirname, '../db/teams.json');
  const seedPath = path.join(__dirname, '../db/seeds/2026_seed.sql');

  if (!fs.existsSync(jsonPath)) {
    console.error('teams.json file not found at:', jsonPath);
    return;
  }

  const raw = fs.readFileSync(jsonPath, 'utf8');
  const data = JSON.parse(raw);

  let sql = `-- Auto-generated 2026 World Cup seed from db/teams.json\n\n`;

  // 1. Tournament
  sql += `-- 1. Insert Tournament\n`;
  sql += `INSERT INTO tournaments (id, title, slug, icon_url) VALUES\n`;
  sql += `('fifa-world-cup', 'FIFA World Cup', 'world-cup', 'https://crests.football-data.org/wm26.png')\n`;
  sql += `ON CONFLICT (id) DO NOTHING;\n\n`;

  // 2. Editions
  sql += `-- 2. Insert World Cup Editions\n`;
  sql += `INSERT INTO editions (id, tournament_id, year, host_country) VALUES\n`;
  sql += `('copa-2026', 'fifa-world-cup', 2026, 'Canadá, EUA e México'),\n`;
  sql += `('copa-2022', 'fifa-world-cup', 2022, 'Catar'),\n`;
  sql += `('copa-2018', 'fifa-world-cup', 2018, 'Rússia'),\n`;
  sql += `('copa-2014', 'fifa-world-cup', 2014, 'Brasil'),\n`;
  sql += `('copa-2010', 'fifa-world-cup', 2010, 'África do Sul'),\n`;
  sql += `('copa-2006', 'fifa-world-cup', 2006, 'Alemanha'),\n`;
  sql += `('copa-2002', 'fifa-world-cup', 2002, 'Coreia do Sul e Japão')\n`;
  sql += `ON CONFLICT (id) DO NOTHING;\n\n`;

  // 3. Teams sorted alphabetically
  const teamsList = data.teams || [];
  teamsList.sort((a, b) => a.name.localeCompare(b.name));

  sql += `-- 3. Insert Teams\n`;
  sql += `INSERT INTO teams (id, edition_id, name, flag_code, final_result) VALUES\n`;

  const teamRows = teamsList.map((team) => {
    const teamId = `${slugify(team.name)}-2026`;
    const flagCode = (team.tla || team.area?.code || 'UN').toLowerCase();
    const cleanName = team.name.replace(/'/g, "''");
    return `('${teamId}', 'copa-2026', '${cleanName}', '${flagCode}', 'Participante 2026')`;
  });

  sql += teamRows.join(',\n');
  sql += `\nON CONFLICT (id) DO NOTHING;\n\n`;

  // 4. Players & Aliases
  sql += `-- 4. Insert Players & Aliases\n`;

  teamsList.forEach((team) => {
    const teamId = `${slugify(team.name)}-2026`;
    const squad = team.squad || [];
    if (squad.length === 0) return;

    // Pick 1 GK, 4 DEF, 3 MID, 3 ATT to form balanced 11 starters
    const gks = squad.filter(p => (p.position || '').toLowerCase().includes('goalkeeper'));
    const defs = squad.filter(p => (p.position || '').toLowerCase().includes('defence'));
    const mids = squad.filter(p => (p.position || '').toLowerCase().includes('midfield'));
    const atts = squad.filter(p => (p.position || '').toLowerCase().includes('offence'));

    const starters = new Set([
      ...gks.slice(0, 1),
      ...defs.slice(0, 4),
      ...mids.slice(0, 3),
      ...atts.slice(0, 3),
    ]);

    // Fill to 11 if any category was missing players
    for (const p of squad) {
      if (starters.size >= 11) break;
      starters.add(p);
    }

    sql += `-- ==================== TEAM: ${team.name.toUpperCase()} ====================\n`;
    sql += `INSERT INTO players (id, team_id, official_name, position, shirt_number, club_at_time, image_url, in_starting_eleven) VALUES\n`;

    const playerRows = [];
    const aliasRows = [];

    squad.forEach((player, idx) => {
      const playerId = `p-${team.id}-${player.id}`;
      const officialName = player.name.replace(/'/g, "''");
      const position = mapPosition(player.position);
      const shirtNumber = idx + 1;
      const inStartingEleven = starters.has(player) ? 'TRUE' : 'FALSE';

      playerRows.push(
        `('${playerId}', '${teamId}', '${officialName}', '${position}', ${shirtNumber}, NULL, NULL, ${inStartingEleven})`
      );

      // Generate alias entries
      const cleanLowerName = player.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/'/g, "''");

      const parts = cleanLowerName.split(' ').filter(Boolean);

      aliasRows.push(`('${playerId}', '${cleanLowerName}')`);
      if (parts.length > 1) {
        const lastName = parts[parts.length - 1];
        if (lastName.length > 2) {
          aliasRows.push(`('${playerId}', '${lastName}')`);
        }
      }
    });

    sql += playerRows.join(',\n');
    sql += `\nON CONFLICT (id) DO NOTHING;\n\n`;

    if (aliasRows.length > 0) {
      sql += `INSERT INTO player_aliases (player_id, alias) VALUES\n`;
      sql += aliasRows.join(',\n');
      sql += `;\n\n`;
    }
  });

  fs.writeFileSync(seedPath, sql, 'utf8');
  console.log(`Successfully generated seed at ${seedPath} with ${teamsList.length} teams!`);
}

generateSeed();

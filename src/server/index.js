import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Fallback seed data in case database is still initializing or offline
const fallback2026Data = {
  id: 'copa-2026',
  tournament_id: 'fifa-world-cup',
  year: 2026,
  host_country: 'Canadá, Estados Unidos e México',
  teams: [
    {
      id: 'alemanha-2026',
      name: 'Alemanha',
      flag_code: 'de',
      final_result: 'Participante 2026',
      players: [
        { id: 'ger-1', official_name: 'Ter Stegen', position: 'Goleiro', shirt_number: 1, club_at_time: 'Barcelona', image_url: null, aliases: ['ter stegen', 'stegen', 'marc-andre ter stegen'] },
        { id: 'ger-2', official_name: 'Kimmich', position: 'Lateral-direito', shirt_number: 6, club_at_time: 'Bayern Munique', image_url: null, aliases: ['kimmich', 'joshua kimmich'] },
        { id: 'ger-3', official_name: 'Rüdiger', position: 'Zagueiro', shirt_number: 2, club_at_time: 'Real Madrid', image_url: null, aliases: ['rudiger', 'rüdiger', 'antonio rudiger', 'antonio rüdiger'] },
        { id: 'ger-4', official_name: 'Jonathan Tah', position: 'Zagueiro', shirt_number: 4, club_at_time: 'Bayer Leverkusen', image_url: null, aliases: ['tah', 'jonathan tah'] },
        { id: 'ger-5', official_name: 'Raum', position: 'Lateral-esquerdo', shirt_number: 3, club_at_time: 'RB Leipzig', image_url: null, aliases: ['raum', 'david raum'] },
        { id: 'ger-6', official_name: 'Toni Kroos', position: 'Meia', shirt_number: 8, club_at_time: 'Real Madrid', image_url: null, aliases: ['kroos', 'toni kroos'] },
        { id: 'ger-7', official_name: 'Goretzka', position: 'Meia', shirt_number: 14, club_at_time: 'Bayern Munique', image_url: null, aliases: ['goretzka', 'leon goretzka'] },
        { id: 'ger-8', official_name: 'Florian Wirtz', position: 'Meia-atacante', shirt_number: 10, club_at_time: 'Bayer Leverkusen', image_url: null, aliases: ['wirtz', 'florian wirtz'] },
        { id: 'ger-9', official_name: 'Jamal Musiala', position: 'Ponta-direita', shirt_number: 17, club_at_time: 'Bayern Munique', image_url: null, aliases: ['musiala', 'jamal musiala'] },
        { id: 'ger-10', official_name: 'Sané', position: 'Ponta-esquerda', shirt_number: 19, club_at_time: 'Bayern Munique', image_url: null, aliases: ['sane', 'sané', 'leroy sane', 'leroy sané'] },
        { id: 'ger-11', official_name: 'Kai Havertz', position: 'Atacante', shirt_number: 7, club_at_time: 'Arsenal', image_url: null, aliases: ['havertz', 'kai havertz'] },
      ]
    },
    {
      id: 'argentina-2026',
      name: 'Argentina',
      flag_code: 'ar',
      final_result: 'Participante 2026',
      players: [
        { id: 'arg-1', official_name: 'Dibu Martínez', position: 'Goleiro', shirt_number: 23, club_at_time: 'Aston Villa', image_url: null, aliases: ['dibu martinez', 'dibu martínez', 'dibu', 'emiliano martinez'] },
        { id: 'arg-2', official_name: 'Molina', position: 'Lateral-direito', shirt_number: 26, club_at_time: 'Atlético de Madrid', image_url: null, aliases: ['molina', 'nahuel molina'] },
        { id: 'arg-3', official_name: 'Cuti Romero', position: 'Zagueiro', shirt_number: 13, club_at_time: 'Tottenham', image_url: null, aliases: ['romero', 'cuti romero', 'cristian romero'] },
        { id: 'arg-4', official_name: 'Otamendi', position: 'Zagueiro', shirt_number: 19, club_at_time: 'Benfica', image_url: null, aliases: ['otamendi', 'nicolas otamendi', 'nicolás otamendi'] },
        { id: 'arg-5', official_name: 'Tagliafico', position: 'Lateral-esquerdo', shirt_number: 3, club_at_time: 'Lyon', image_url: null, aliases: ['tagliafico', 'nicolas tagliafico'] },
        { id: 'arg-6', official_name: 'De Paul', position: 'Meia', shirt_number: 7, club_at_time: 'Atlético de Madrid', image_url: null, aliases: ['de paul', 'rodrigo de paul'] },
        { id: 'arg-7', official_name: 'Enzo Fernández', position: 'Meia', shirt_number: 24, club_at_time: 'Chelsea', image_url: null, aliases: ['enzo fernandez', 'enzo fernández', 'enzo'] },
        { id: 'arg-8', official_name: 'Alexis Mac Allister', position: 'Meia', shirt_number: 20, club_at_time: 'Liverpool', image_url: null, aliases: ['mac allister', 'alexis mac allister'] },
        { id: 'arg-9', official_name: 'Lionel Messi', position: 'Ponta-direita', shirt_number: 10, club_at_time: 'Inter Miami', image_url: null, aliases: ['messi', 'lionel messi', 'leo messi'] },
        { id: 'arg-10', official_name: 'Di María', position: 'Ponta-esquerda', shirt_number: 11, club_at_time: 'Benfica', image_url: null, aliases: ['di maria', 'di maría', 'angel di maria'] },
        { id: 'arg-11', official_name: 'Julián Álvarez', position: 'Atacante', shirt_number: 9, club_at_time: 'Manchester City', image_url: null, aliases: ['julian alvarez', 'julian álvarez', 'alvarez'] }
      ]
    },
    {
      id: 'brasil-2026',
      name: 'Brasil',
      flag_code: 'br',
      final_result: 'Participante 2026',
      players: [
        { id: 'bra-1', official_name: 'Alisson', position: 'Goleiro', shirt_number: 1, club_at_time: 'Liverpool', image_url: null, aliases: ['alisson', 'alisson becker'] },
        { id: 'bra-2', official_name: 'Danilo', position: 'Lateral-direito', shirt_number: 2, club_at_time: 'Juventus', image_url: null, aliases: ['danilo'] },
        { id: 'bra-3', official_name: 'Marquinhos', position: 'Zagueiro', shirt_number: 4, club_at_time: 'PSG', image_url: null, aliases: ['marquinhos'] },
        { id: 'bra-4', official_name: 'Gabriel Magalhães', position: 'Zagueiro', shirt_number: 14, club_at_time: 'Arsenal', image_url: null, aliases: ['gabriel magalhaes', 'gabriel magalhães', 'gabriel'] },
        { id: 'bra-5', official_name: 'Wendell', position: 'Lateral-esquerdo', shirt_number: 6, club_at_time: 'Porto', image_url: null, aliases: ['wendell'] },
        { id: 'bra-6', official_name: 'Bruno Guimarães', position: 'Volante', shirt_number: 5, club_at_time: 'Newcastle', image_url: null, aliases: ['bruno guimaraes', 'bruno guimarães', 'bruno'] },
        { id: 'bra-7', official_name: 'Lucas Paquetá', position: 'Meia', shirt_number: 8, club_at_time: 'West Ham', image_url: null, aliases: ['paqueta', 'paquetá', 'lucas paqueta', 'lucas paquetá'] },
        { id: 'bra-8', official_name: 'Rodrygo', position: 'Meia-atacante', shirt_number: 10, club_at_time: 'Real Madrid', image_url: null, aliases: ['rodrygo', 'rodrygo goes'] },
        { id: 'bra-9', official_name: 'Raphinha', position: 'Ponta-direita', shirt_number: 11, club_at_time: 'Barcelona', image_url: null, aliases: ['raphinha'] },
        { id: 'bra-10', official_name: 'Vinícius Júnior', position: 'Ponta-esquerda', shirt_number: 7, club_at_time: 'Real Madrid', image_url: null, aliases: ['vinicius junior', 'vinícius júnior', 'vinicius jr', 'vini jr', 'vini', 'vinicius'] },
        { id: 'bra-11', official_name: 'Endrick', position: 'Atacante', shirt_number: 9, club_at_time: 'Real Madrid', image_url: null, aliases: ['endrick'] }
      ]
    },
    {
      id: 'espanha-2026',
      name: 'Espanha',
      flag_code: 'es',
      final_result: 'Participante 2026',
      players: [
        { id: 'esp-1', official_name: 'Unai Simón', position: 'Goleiro', shirt_number: 23, club_at_time: 'Athletic Bilbao', image_url: null, aliases: ['unai simon', 'unai simón', 'simon', 'simón'] },
        { id: 'esp-2', official_name: 'Carvajal', position: 'Lateral-direito', shirt_number: 2, club_at_time: 'Real Madrid', image_url: null, aliases: ['carvajal', 'dani carvajal'] },
        { id: 'esp-3', official_name: 'Le Normand', position: 'Zagueiro', shirt_number: 3, club_at_time: 'Atlético de Madrid', image_url: null, aliases: ['le normand', 'robin le normand'] },
        { id: 'esp-4', official_name: 'Laporte', position: 'Zagueiro', shirt_number: 14, club_at_time: 'Al-Nassr', image_url: null, aliases: ['laporte', 'aymeric laporte'] },
        { id: 'esp-5', official_name: 'Cucurella', position: 'Lateral-esquerdo', shirt_number: 24, club_at_time: 'Chelsea', image_url: null, aliases: ['cucurella', 'marc cucurella'] },
        { id: 'esp-6', official_name: 'Rodri', position: 'Volante', shirt_number: 16, club_at_time: 'Manchester City', image_url: null, aliases: ['rodri', 'rodrigo'] },
        { id: 'esp-7', official_name: 'Pedri', position: 'Meia', shirt_number: 8, club_at_time: 'Barcelona', image_url: null, aliases: ['pedri'] },
        { id: 'esp-8', official_name: 'Dani Olmo', position: 'Meia', shirt_number: 10, club_at_time: 'Barcelona', image_url: null, aliases: ['olmo', 'dani olmo'] },
        { id: 'esp-9', official_name: 'Lamine Yamal', position: 'Ponta-direita', shirt_number: 19, club_at_time: 'Barcelona', image_url: null, aliases: ['lamine yamal', 'yamal', 'lamine'] },
        { id: 'esp-10', official_name: 'Nico Williams', position: 'Ponta-esquerda', shirt_number: 17, club_at_time: 'Athletic Bilbao', image_url: null, aliases: ['nico williams', 'williams'] },
        { id: 'esp-11', official_name: 'Morata', position: 'Atacante', shirt_number: 7, club_at_time: 'AC Milan', image_url: null, aliases: ['morata', 'alvaro morata', 'álvaro morata'] }
      ]
    },
    {
      id: 'franca-2026',
      name: 'França',
      flag_code: 'fr',
      final_result: 'Participante 2026',
      players: [
        { id: 'fra-1', official_name: 'Maignan', position: 'Goleiro', shirt_number: 16, club_at_time: 'AC Milan', image_url: null, aliases: ['maignan', 'mike maignan'] },
        { id: 'fra-2', official_name: 'Koundé', position: 'Lateral-direito', shirt_number: 5, club_at_time: 'Barcelona', image_url: null, aliases: ['kounde', 'koundé', 'jules kounde'] },
        { id: 'fra-3', official_name: 'Saliba', position: 'Zagueiro', shirt_number: 4, club_at_time: 'Arsenal', image_url: null, aliases: ['saliba', 'william saliba'] },
        { id: 'fra-4', official_name: 'Upamecano', position: 'Zagueiro', shirt_number: 15, club_at_time: 'Bayern Munique', image_url: null, aliases: ['upamecano', 'dayot upamecano'] },
        { id: 'fra-5', official_name: 'Theo Hernández', position: 'Lateral-esquerdo', shirt_number: 22, club_at_time: 'AC Milan', image_url: null, aliases: ['theo hernandez', 'theo hernández', 'theo'] },
        { id: 'fra-6', official_name: 'Tchouaméni', position: 'Volante', shirt_number: 8, club_at_time: 'Real Madrid', image_url: null, aliases: ['tchouameni', 'tchouaméni'] },
        { id: 'fra-7', official_name: 'Rabiot', position: 'Meia', shirt_number: 14, club_at_time: 'Juventus', image_url: null, aliases: ['rabiot', 'adrien rabiot'] },
        { id: 'fra-8', official_name: 'Griezmann', position: 'Meia-atacante', shirt_number: 7, club_at_time: 'Atlético de Madrid', image_url: null, aliases: ['griezmann', 'antoine griezmann'] },
        { id: 'fra-9', official_name: 'Dembélé', position: 'Ponta-direita', shirt_number: 11, club_at_time: 'PSG', image_url: null, aliases: ['dembele', 'dembélé'] },
        { id: 'fra-10', official_name: 'Mbappé', position: 'Ponta-esquerda', shirt_number: 10, club_at_time: 'Real Madrid', image_url: null, aliases: ['mbappe', 'mbappé', 'kylian mbappe', 'kylian mbappé'] },
        { id: 'fra-11', official_name: 'Giroud', position: 'Atacante', shirt_number: 9, club_at_time: 'LAFC', image_url: null, aliases: ['giroud', 'olivier giroud'] }
      ]
    },
    {
      id: 'inglaterra-2026',
      name: 'Inglaterra',
      flag_code: 'gb-eng',
      final_result: 'Participante 2026',
      players: [
        { id: 'eng-1', official_name: 'Pickford', position: 'Goleiro', shirt_number: 1, club_at_time: 'Everton', image_url: null, aliases: ['pickford', 'jordan pickford'] },
        { id: 'eng-2', official_name: 'Walker', position: 'Lateral-direito', shirt_number: 2, club_at_time: 'Manchester City', image_url: null, aliases: ['walker', 'kyle walker'] },
        { id: 'eng-3', official_name: 'Stones', position: 'Zagueiro', shirt_number: 5, club_at_time: 'Manchester City', image_url: null, aliases: ['stones', 'john stones'] },
        { id: 'eng-4', official_name: 'Guéhi', position: 'Zagueiro', shirt_number: 6, club_at_time: 'Crystal Palace', image_url: null, aliases: ['guehi', 'guéhi', 'marc guehi'] },
        { id: 'eng-5', official_name: 'Trippier', position: 'Lateral-esquerdo', shirt_number: 12, club_at_time: 'Newcastle', image_url: null, aliases: ['trippier', 'kieran trippier'] },
        { id: 'eng-6', official_name: 'Declan Rice', position: 'Volante', shirt_number: 4, club_at_time: 'Arsenal', image_url: null, aliases: ['rice', 'declan rice'] },
        { id: 'eng-7', official_name: 'Jude Bellingham', position: 'Meia', shirt_number: 10, club_at_time: 'Real Madrid', image_url: null, aliases: ['bellingham', 'jude bellingham'] },
        { id: 'eng-8', official_name: 'Phil Foden', position: 'Meia', shirt_number: 11, club_at_time: 'Manchester City', image_url: null, aliases: ['foden', 'phil foden'] },
        { id: 'eng-9', official_name: 'Bukayo Saka', position: 'Ponta-direita', shirt_number: 7, club_at_time: 'Arsenal', image_url: null, aliases: ['saka', 'bukayo saka'] },
        { id: 'eng-10', official_name: 'Cole Palmer', position: 'Ponta-esquerda', shirt_number: 24, club_at_time: 'Chelsea', image_url: null, aliases: ['palmer', 'cole palmer'] },
        { id: 'eng-11', official_name: 'Harry Kane', position: 'Atacante', shirt_number: 9, club_at_time: 'Bayern Munique', image_url: null, aliases: ['kane', 'harry kane'] }
      ]
    }
  ]
};

// GET list of editions
app.get('/api/editions', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM editions ORDER BY year DESC');
    if (result.rows.length > 0) {
      const editions = result.rows.map((row, index) => ({
        id: row.id,
        tournament_id: row.tournament_id,
        year: row.year,
        name: `Copa do Mundo ${row.year}`,
        host_country: row.host_country,
        description:
          row.year === 2026
            ? 'Edição Atual • Seleções em Ordem Alfabética • 11 Jogadores'
            : '32 Seleções Convocadas',
        status: row.year === 2026 ? 'active' : 'coming_soon',
        featured: index === 0,
      }));
      return res.json(editions);
    }
  } catch (err) {
    console.warn('DB query failed, using fallback list:', err.message);
  }

  return res.json([
    {
      id: 'copa-2026',
      tournament_id: 'fifa-world-cup',
      year: 2026,
      name: 'Copa do Mundo 2026',
      host_country: 'Canadá, EUA e México',
      description: 'Edição Atual • 6 Seleções Principais em Ordem Alfabética',
      status: 'active',
      featured: true,
    },
    {
      id: 'copa-2022',
      tournament_id: 'fifa-world-cup',
      year: 2022,
      name: 'Copa do Mundo 2022',
      host_country: 'Catar',
      description: '32 Seleções Convocadas • Campeão Argentina',
      status: 'coming_soon',
      featured: false,
    },
    {
      id: 'copa-2018',
      tournament_id: 'fifa-world-cup',
      year: 2018,
      name: 'Copa do Mundo 2018',
      host_country: 'Rússia',
      description: '32 Seleções Convocadas • Campeão França',
      status: 'coming_soon',
      featured: false,
    },
    {
      id: 'copa-2014',
      tournament_id: 'fifa-world-cup',
      year: 2014,
      name: 'Copa do Mundo 2014',
      host_country: 'Brasil',
      description: '32 Seleções Convocadas • Campeão Alemanha',
      status: 'coming_soon',
      featured: false,
    },
    {
      id: 'copa-2010',
      tournament_id: 'fifa-world-cup',
      year: 2010,
      name: 'Copa do Mundo 2010',
      host_country: 'África do Sul',
      description: '32 Seleções Convocadas • Campeão Espanha',
      status: 'coming_soon',
      featured: false,
    },
    {
      id: 'copa-2006',
      tournament_id: 'fifa-world-cup',
      year: 2006,
      name: 'Copa do Mundo 2006',
      host_country: 'Alemanha',
      description: '32 Seleções Convocadas • Campeão Itália',
      status: 'coming_soon',
      featured: false,
    },
    {
      id: 'copa-2002',
      tournament_id: 'fifa-world-cup',
      year: 2002,
      name: 'Copa do Mundo 2002',
      host_country: 'Coreia do Sul e Japão',
      description: 'Pentacampeonato Brasileiro • 32 Seleções',
      status: 'coming_soon',
      featured: false,
    },
  ]);
});

// GET specific edition with teams in ALPHABETICAL ORDER and curated players
app.get('/api/editions/:editionId', async (req, res) => {
  const { editionId } = req.params;

  try {
    const editionRes = await pool.query('SELECT * FROM editions WHERE id = $1', [editionId]);
    if (editionRes.rows.length > 0) {
      const edition = editionRes.rows[0];

      // Order teams ALPHABETICALLY by name
      const teamsRes = await pool.query(
        'SELECT * FROM teams WHERE edition_id = $1 ORDER BY name ASC',
        [editionId]
      );

      const teams = [];
      for (const team of teamsRes.rows) {
        const playersRes = await pool.query(
          'SELECT * FROM players WHERE team_id = $1 AND in_starting_eleven = TRUE',
          [team.id]
        );

        const players = [];
        for (const player of playersRes.rows) {
          const aliasesRes = await pool.query(
            'SELECT alias FROM player_aliases WHERE player_id = $1',
            [player.id]
          );
          players.push({
            id: player.id,
            official_name: player.official_name,
            position: player.position,
            shirt_number: player.shirt_number,
            club_at_time: player.club_at_time,
            image_url: player.image_url || null,
            aliases: aliasesRes.rows.map((r) => r.alias),
          });
        }

        teams.push({
          id: team.id,
          name: team.name,
          flag_code: team.flag_code,
          final_result: team.final_result,
          players,
        });
      }

      return res.json({
        id: edition.id,
        tournament_id: edition.tournament_id,
        year: edition.year,
        host_country: edition.host_country,
        teams,
      });
    }
  } catch (err) {
    console.warn('DB query failed, delivering static seed for edition:', err.message);
  }

  // Fallback if DB is not reachable
  return res.json(fallback2026Data);
});

// POST save session
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', serverTime: new Date() });
});

app.listen(PORT, () => {
  console.log(`[Escalou API] Running on http://localhost:${PORT}`);
});

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
  ano: 2026,
  pais_sede: 'Canadá, Estados Unidos e México',
  selecoes: [
    {
      id: 'alemanha-2026',
      nome: 'Alemanha',
      bandeira: 'de',
      resultado_final: 'Participante 2026',
      convocados: [
        { id: 'ger-1', nome_oficial: 'Ter Stegen', posicao: 'Goleiro', numero: 1, clube_epoca: 'Barcelona', pos_x: 50, pos_y: 88, aliases: ['ter stegen', 'stegen', 'marc-andre ter stegen'] },
        { id: 'ger-2', nome_oficial: 'Kimmich', posicao: 'Lateral-direito', numero: 6, clube_epoca: 'Bayern Munique', pos_x: 82, pos_y: 70, aliases: ['kimmich', 'joshua kimmich'] },
        { id: 'ger-3', nome_oficial: 'Rüdiger', posicao: 'Zagueiro', numero: 2, clube_epoca: 'Real Madrid', pos_x: 62, pos_y: 72, aliases: ['rudiger', 'rüdiger', 'antonio rudiger', 'antonio rüdiger'] },
        { id: 'ger-4', nome_oficial: 'Jonathan Tah', posicao: 'Zagueiro', numero: 4, clube_epoca: 'Bayer Leverkusen', pos_x: 38, pos_y: 72, aliases: ['tah', 'jonathan tah'] },
        { id: 'ger-5', nome_oficial: 'Raum', posicao: 'Lateral-esquerdo', numero: 3, clube_epoca: 'RB Leipzig', pos_x: 18, pos_y: 70, aliases: ['raum', 'david raum'] },
        { id: 'ger-6', nome_oficial: 'Toni Kroos', posicao: 'Meia', numero: 8, clube_epoca: 'Real Madrid', pos_x: 35, pos_y: 52, aliases: ['kroos', 'toni kroos'] },
        { id: 'ger-7', nome_oficial: 'Goretzka', posicao: 'Meia', numero: 14, clube_epoca: 'Bayern Munique', pos_x: 65, pos_y: 52, aliases: ['goretzka', 'leon goretzka'] },
        { id: 'ger-8', nome_oficial: 'Florian Wirtz', posicao: 'Meia-atacante', numero: 10, clube_epoca: 'Bayer Leverkusen', pos_x: 50, pos_y: 38, aliases: ['wirtz', 'florian wirtz'] },
        { id: 'ger-9', nome_oficial: 'Jamal Musiala', posicao: 'Ponta-direita', numero: 17, clube_epoca: 'Bayern Munique', pos_x: 80, pos_y: 24, aliases: ['musiala', 'jamal musiala'] },
        { id: 'ger-10', nome_oficial: 'Sané', posicao: 'Ponta-esquerda', numero: 19, clube_epoca: 'Bayern Munique', pos_x: 20, pos_y: 24, aliases: ['sane', 'sané', 'leroy sane', 'leroy sané'] },
        { id: 'ger-11', nome_oficial: 'Kai Havertz', posicao: 'Atacante', numero: 7, clube_epoca: 'Arsenal', pos_x: 50, pos_y: 16, aliases: ['havertz', 'kai havertz'] },
      ]
    },
    {
      id: 'argentina-2026',
      nome: 'Argentina',
      bandeira: 'ar',
      resultado_final: 'Participante 2026',
      convocados: [
        { id: 'arg-1', nome_oficial: 'Dibu Martínez', posicao: 'Goleiro', numero: 23, clube_epoca: 'Aston Villa', pos_x: 50, pos_y: 88, aliases: ['dibu martinez', 'dibu martínez', 'dibu', 'emiliano martinez'] },
        { id: 'arg-2', nome_oficial: 'Molina', posicao: 'Lateral-direito', numero: 26, clube_epoca: 'Atlético de Madrid', pos_x: 82, pos_y: 70, aliases: ['molina', 'nahuel molina'] },
        { id: 'arg-3', nome_oficial: 'Cuti Romero', posicao: 'Zagueiro', numero: 13, clube_epoca: 'Tottenham', pos_x: 62, pos_y: 72, aliases: ['romero', 'cuti romero', 'cristian romero'] },
        { id: 'arg-4', nome_oficial: 'Otamendi', posicao: 'Zagueiro', numero: 19, clube_epoca: 'Benfica', pos_x: 38, pos_y: 72, aliases: ['otamendi', 'nicolas otamendi', 'nicolás otamendi'] },
        { id: 'arg-5', nome_oficial: 'Tagliafico', posicao: 'Lateral-esquerdo', numero: 3, clube_epoca: 'Lyon', pos_x: 18, pos_y: 70, aliases: ['tagliafico', 'nicolas tagliafico'] },
        { id: 'arg-6', nome_oficial: 'De Paul', posicao: 'Meia', numero: 7, clube_epoca: 'Atlético de Madrid', pos_x: 70, pos_y: 52, aliases: ['de paul', 'rodrigo de paul'] },
        { id: 'arg-7', nome_oficial: 'Enzo Fernández', posicao: 'Meia', numero: 24, clube_epoca: 'Chelsea', pos_x: 50, pos_y: 56, aliases: ['enzo fernandez', 'enzo fernández', 'enzo'] },
        { id: 'arg-8', nome_oficial: 'Alexis Mac Allister', posicao: 'Meia', numero: 20, clube_epoca: 'Liverpool', pos_x: 30, pos_y: 52, aliases: ['mac allister', 'alexis mac allister'] },
        { id: 'arg-9', nome_oficial: 'Lionel Messi', posicao: 'Ponta-direita', numero: 10, clube_epoca: 'Inter Miami', pos_x: 80, pos_y: 24, aliases: ['messi', 'lionel messi', 'leo messi'] },
        { id: 'arg-10', nome_oficial: 'Di María', posicao: 'Ponta-esquerda', numero: 11, clube_epoca: 'Benfica', pos_x: 20, pos_y: 24, aliases: ['di maria', 'di maría', 'angel di maria'] },
        { id: 'arg-11', nome_oficial: 'Julián Álvarez', posicao: 'Atacante', numero: 9, clube_epoca: 'Manchester City', pos_x: 50, pos_y: 16, aliases: ['julian alvarez', 'julian álvarez', 'alvarez'] }
      ]
    },
    {
      id: 'brasil-2026',
      nome: 'Brasil',
      bandeira: 'br',
      resultado_final: 'Participante 2026',
      convocados: [
        { id: 'bra-1', nome_oficial: 'Alisson', posicao: 'Goleiro', numero: 1, clube_epoca: 'Liverpool', pos_x: 50, pos_y: 88, aliases: ['alisson', 'alisson becker'] },
        { id: 'bra-2', nome_oficial: 'Danilo', posicao: 'Lateral-direito', numero: 2, clube_epoca: 'Juventus', pos_x: 82, pos_y: 70, aliases: ['danilo'] },
        { id: 'bra-3', nome_oficial: 'Marquinhos', posicao: 'Zagueiro', numero: 4, clube_epoca: 'PSG', pos_x: 62, pos_y: 72, aliases: ['marquinhos'] },
        { id: 'bra-4', nome_oficial: 'Gabriel Magalhães', posicao: 'Zagueiro', numero: 14, clube_epoca: 'Arsenal', pos_x: 38, pos_y: 72, aliases: ['gabriel magalhaes', 'gabriel magalhães', 'gabriel'] },
        { id: 'bra-5', nome_oficial: 'Wendell', posicao: 'Lateral-esquerdo', numero: 6, clube_epoca: 'Porto', pos_x: 18, pos_y: 70, aliases: ['wendell'] },
        { id: 'bra-6', nome_oficial: 'Bruno Guimarães', posicao: 'Volante', numero: 5, clube_epoca: 'Newcastle', pos_x: 35, pos_y: 52, aliases: ['bruno guimaraes', 'bruno guimarães', 'bruno'] },
        { id: 'bra-7', nome_oficial: 'Lucas Paquetá', posicao: 'Meia', numero: 8, clube_epoca: 'West Ham', pos_x: 65, pos_y: 52, aliases: ['paqueta', 'paquetá', 'lucas paqueta', 'lucas paquetá'] },
        { id: 'bra-8', nome_oficial: 'Rodrygo', posicao: 'Meia-atacante', numero: 10, clube_epoca: 'Real Madrid', pos_x: 50, pos_y: 38, aliases: ['rodrygo', 'rodrygo goes'] },
        { id: 'bra-9', nome_oficial: 'Raphinha', posicao: 'Ponta-direita', numero: 11, clube_epoca: 'Barcelona', pos_x: 80, pos_y: 24, aliases: ['raphinha'] },
        { id: 'bra-10', nome_oficial: 'Vinícius Júnior', posicao: 'Ponta-esquerda', numero: 7, clube_epoca: 'Real Madrid', pos_x: 20, pos_y: 24, aliases: ['vinicius junior', 'vinícius júnior', 'vinicius jr', 'vini jr', 'vini', 'vinicius'] },
        { id: 'bra-11', nome_oficial: 'Endrick', posicao: 'Atacante', numero: 9, clube_epoca: 'Real Madrid', pos_x: 50, pos_y: 16, aliases: ['endrick'] }
      ]
    },
    {
      id: 'espanha-2026',
      nome: 'Espanha',
      bandeira: 'es',
      resultado_final: 'Participante 2026',
      convocados: [
        { id: 'esp-1', nome_oficial: 'Unai Simón', posicao: 'Goleiro', numero: 23, clube_epoca: 'Athletic Bilbao', pos_x: 50, pos_y: 88, aliases: ['unai simon', 'unai simón', 'simon', 'simón'] },
        { id: 'esp-2', nome_oficial: 'Carvajal', posicao: 'Lateral-direito', numero: 2, clube_epoca: 'Real Madrid', pos_x: 82, pos_y: 70, aliases: ['carvajal', 'dani carvajal'] },
        { id: 'esp-3', nome_oficial: 'Le Normand', posicao: 'Zagueiro', numero: 3, clube_epoca: 'Atlético de Madrid', pos_x: 62, pos_y: 72, aliases: ['le normand', 'robin le normand'] },
        { id: 'esp-4', nome_oficial: 'Laporte', posicao: 'Zagueiro', numero: 14, clube_epoca: 'Al-Nassr', pos_x: 38, pos_y: 72, aliases: ['laporte', 'aymeric laporte'] },
        { id: 'esp-5', nome_oficial: 'Cucurella', posicao: 'Lateral-esquerdo', numero: 24, clube_epoca: 'Chelsea', pos_x: 18, pos_y: 70, aliases: ['cucurella', 'marc cucurella'] },
        { id: 'esp-6', nome_oficial: 'Rodri', posicao: 'Volante', numero: 16, clube_epoca: 'Manchester City', pos_x: 50, pos_y: 58, aliases: ['rodri', 'rodrigo'] },
        { id: 'esp-7', nome_oficial: 'Pedri', posicao: 'Meia', numero: 8, clube_epoca: 'Barcelona', pos_x: 32, pos_y: 44, aliases: ['pedri'] },
        { id: 'esp-8', nome_oficial: 'Dani Olmo', posicao: 'Meia', numero: 10, clube_epoca: 'Barcelona', pos_x: 68, pos_y: 44, aliases: ['olmo', 'dani olmo'] },
        { id: 'esp-9', nome_oficial: 'Lamine Yamal', posicao: 'Ponta-direita', numero: 19, clube_epoca: 'Barcelona', pos_x: 80, pos_y: 24, aliases: ['lamine yamal', 'yamal', 'lamine'] },
        { id: 'esp-10', nome_oficial: 'Nico Williams', posicao: 'Ponta-esquerda', numero: 17, clube_epoca: 'Athletic Bilbao', pos_x: 20, pos_y: 24, aliases: ['nico williams', 'williams'] },
        { id: 'esp-11', nome_oficial: 'Morata', posicao: 'Atacante', numero: 7, clube_epoca: 'AC Milan', pos_x: 50, pos_y: 16, aliases: ['morata', 'alvaro morata', 'álvaro morata'] }
      ]
    },
    {
      id: 'franca-2026',
      nome: 'França',
      bandeira: 'fr',
      resultado_final: 'Participante 2026',
      convocados: [
        { id: 'fra-1', nome_oficial: 'Maignan', posicao: 'Goleiro', numero: 16, clube_epoca: 'AC Milan', pos_x: 50, pos_y: 88, aliases: ['maignan', 'mike maignan'] },
        { id: 'fra-2', nome_oficial: 'Koundé', posicao: 'Lateral-direito', numero: 5, clube_epoca: 'Barcelona', pos_x: 82, pos_y: 70, aliases: ['kounde', 'koundé', 'jules kounde'] },
        { id: 'fra-3', nome_oficial: 'Saliba', posicao: 'Zagueiro', numero: 4, clube_epoca: 'Arsenal', pos_x: 62, pos_y: 72, aliases: ['saliba', 'william saliba'] },
        { id: 'fra-4', nome_oficial: 'Upamecano', posicao: 'Zagueiro', numero: 15, clube_epoca: 'Bayern Munique', pos_x: 38, pos_y: 72, aliases: ['upamecano', 'dayot upamecano'] },
        { id: 'fra-5', nome_oficial: 'Theo Hernández', posicao: 'Lateral-esquerdo', numero: 22, clube_epoca: 'AC Milan', pos_x: 18, pos_y: 70, aliases: ['theo hernandez', 'theo hernández', 'theo'] },
        { id: 'fra-6', nome_oficial: 'Tchouaméni', posicao: 'Volante', numero: 8, clube_epoca: 'Real Madrid', pos_x: 35, pos_y: 52, aliases: ['tchouameni', 'tchouaméni'] },
        { id: 'fra-7', nome_oficial: 'Rabiot', posicao: 'Meia', numero: 14, clube_epoca: 'Juventus', pos_x: 65, pos_y: 52, aliases: ['rabiot', 'adrien rabiot'] },
        { id: 'fra-8', nome_oficial: 'Griezmann', posicao: 'Meia-atacante', numero: 7, clube_epoca: 'Atlético de Madrid', pos_x: 50, pos_y: 38, aliases: ['griezmann', 'antoine griezmann'] },
        { id: 'fra-9', nome_oficial: 'Dembélé', posicao: 'Ponta-direita', numero: 11, clube_epoca: 'PSG', pos_x: 80, pos_y: 24, aliases: ['dembele', 'dembélé'] },
        { id: 'fra-10', nome_oficial: 'Mbappé', posicao: 'Ponta-esquerda', numero: 10, clube_epoca: 'Real Madrid', pos_x: 20, pos_y: 24, aliases: ['mbappe', 'mbappé', 'kylian mbappe', 'kylian mbappé'] },
        { id: 'fra-11', nome_oficial: 'Giroud', posicao: 'Atacante', numero: 9, clube_epoca: 'LAFC', pos_x: 50, pos_y: 16, aliases: ['giroud', 'olivier giroud'] }
      ]
    },
    {
      id: 'inglaterra-2026',
      nome: 'Inglaterra',
      bandeira: 'gb-eng',
      resultado_final: 'Participante 2026',
      convocados: [
        { id: 'eng-1', nome_oficial: 'Pickford', posicao: 'Goleiro', numero: 1, clube_epoca: 'Everton', pos_x: 50, pos_y: 88, aliases: ['pickford', 'jordan pickford'] },
        { id: 'eng-2', nome_oficial: 'Walker', posicao: 'Lateral-direito', numero: 2, clube_epoca: 'Manchester City', pos_x: 82, pos_y: 70, aliases: ['walker', 'kyle walker'] },
        { id: 'eng-3', nome_oficial: 'Stones', posicao: 'Zagueiro', numero: 5, clube_epoca: 'Manchester City', pos_x: 62, pos_y: 72, aliases: ['stones', 'john stones'] },
        { id: 'eng-4', nome_oficial: 'Guéhi', posicao: 'Zagueiro', numero: 6, clube_epoca: 'Crystal Palace', pos_x: 38, pos_y: 72, aliases: ['guehi', 'guéhi', 'marc guehi'] },
        { id: 'eng-5', nome_oficial: 'Trippier', posicao: 'Lateral-esquerdo', numero: 12, clube_epoca: 'Newcastle', pos_x: 18, pos_y: 70, aliases: ['trippier', 'kieran trippier'] },
        { id: 'eng-6', nome_oficial: 'Declan Rice', posicao: 'Volante', numero: 4, clube_epoca: 'Arsenal', pos_x: 50, pos_y: 58, aliases: ['rice', 'declan rice'] },
        { id: 'eng-7', nome_oficial: 'Jude Bellingham', posicao: 'Meia', numero: 10, clube_epoca: 'Real Madrid', pos_x: 32, pos_y: 44, aliases: ['bellingham', 'jude bellingham'] },
        { id: 'eng-8', nome_oficial: 'Phil Foden', posicao: 'Meia', numero: 11, clube_epoca: 'Manchester City', pos_x: 68, pos_y: 44, aliases: ['foden', 'phil foden'] },
        { id: 'eng-9', nome_oficial: 'Bukayo Saka', posicao: 'Ponta-direita', numero: 7, clube_epoca: 'Arsenal', pos_x: 80, pos_y: 24, aliases: ['saka', 'bukayo saka'] },
        { id: 'eng-10', nome_oficial: 'Cole Palmer', posicao: 'Ponta-esquerda', numero: 24, clube_epoca: 'Chelsea', pos_x: 20, pos_y: 24, aliases: ['palmer', 'cole palmer'] },
        { id: 'eng-11', nome_oficial: 'Harry Kane', posicao: 'Atacante', numero: 9, clube_epoca: 'Bayern Munique', pos_x: 50, pos_y: 16, aliases: ['kane', 'harry kane'] }
      ]
    }
  ]
};

// GET list of editions
app.get('/api/editions', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM editions ORDER BY ano DESC');
    if (result.rows.length > 0) {
      const editions = result.rows.map((row, index) => ({
        id: row.id,
        ano: row.ano,
        nome: row.nome || `Copa do Mundo ${row.ano}`,
        pais_sede: row.pais_sede,
        descricao:
          row.ano === 2026
            ? 'Edição Atual • Seleções em Ordem Alfabética • 11 Jogadores'
            : '32 Seleções Convocadas',
        status: row.ano === 2026 ? 'ativo' : 'em_breve',
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
      ano: 2026,
      nome: 'Copa do Mundo 2026',
      pais_sede: 'Canadá, EUA e México',
      descricao: 'Edição Atual • 6 Seleções Principais em Ordem Alfabética',
      status: 'ativo',
      featured: true,
    },
    {
      id: 'copa-2022',
      ano: 2022,
      nome: 'Copa do Mundo 2022',
      pais_sede: 'Catar',
      descricao: '32 Seleções Convocadas • Campeão Argentina',
      status: 'em_breve',
      featured: false,
    },
    {
      id: 'copa-2018',
      ano: 2018,
      nome: 'Copa do Mundo 2018',
      pais_sede: 'Rússia',
      descricao: '32 Seleções Convocadas • Campeão França',
      status: 'em_breve',
      featured: false,
    },
    {
      id: 'copa-2014',
      ano: 2014,
      nome: 'Copa do Mundo 2014',
      pais_sede: 'Brasil',
      descricao: '32 Seleções Convocadas • Campeão Alemanha',
      status: 'em_breve',
      featured: false,
    },
    {
      id: 'copa-2010',
      ano: 2010,
      nome: 'Copa do Mundo 2010',
      pais_sede: 'África do Sul',
      descricao: '32 Seleções Convocadas • Campeão Espanha',
      status: 'em_breve',
      featured: false,
    },
    {
      id: 'copa-2006',
      ano: 2006,
      nome: 'Copa do Mundo 2006',
      pais_sede: 'Alemanha',
      descricao: '32 Seleções Convocadas • Campeão Itália',
      status: 'em_breve',
      featured: false,
    },
    {
      id: 'copa-2002',
      ano: 2002,
      nome: 'Copa do Mundo 2002',
      pais_sede: 'Coreia do Sul e Japão',
      descricao: 'Pentacampeonato Brasileiro • 32 Seleções',
      status: 'em_breve',
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

      // Order teams ALPHABETICALLY by nome
      const teamsRes = await pool.query(
        'SELECT * FROM teams WHERE edition_id = $1 ORDER BY nome ASC',
        [editionId]
      );

      const selecoes = [];
      for (const team of teamsRes.rows) {
        const playersRes = await pool.query(
          'SELECT * FROM players WHERE team_id = $1 AND no_onze_medio = TRUE',
          [team.id]
        );

        const convocados = [];
        for (const player of playersRes.rows) {
          const aliasesRes = await pool.query(
            'SELECT alias FROM player_aliases WHERE player_id = $1',
            [player.id]
          );
          convocados.push({
            id: player.id,
            nome_oficial: player.nome_oficial,
            posicao: player.posicao,
            numero: player.numero_camisa,
            clube_epoca: player.clube_epoca,
            pos_x: parseFloat(player.pos_x),
            pos_y: parseFloat(player.pos_y),
            aliases: aliasesRes.rows.map((r) => r.alias),
          });
        }

        selecoes.push({
          id: team.id,
          nome: team.nome,
          bandeira: team.bandeira_codigo,
          resultado_final: team.resultado_final,
          convocados,
        });
      }

      return res.json({
        id: edition.id,
        ano: edition.ano,
        pais_sede: edition.pais_sede,
        selecoes,
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

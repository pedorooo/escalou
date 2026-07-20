-- 1. Insert 7 World Cup Editions
INSERT INTO editions (id, ano, pais_sede) VALUES
('copa-2026', 2026, 'Canadá, EUA e México'),
('copa-2022', 2022, 'Catar'),
('copa-2018', 2018, 'Rússia'),
('copa-2014', 2014, 'Brasil'),
('copa-2010', 2010, 'África do Sul'),
('copa-2006', 2006, 'Alemanha'),
('copa-2002', 2002, 'Coreia do Sul e Japão')
ON CONFLICT (id) DO NOTHING;

-- Teams in alphabetical order
INSERT INTO teams (id, edition_id, nome, bandeira_codigo, resultado_final) VALUES
('alemanha-2026', 'copa-2026', 'Alemanha', 'de', 'Participante 2026'),
('argentina-2026', 'copa-2026', 'Argentina', 'ar', 'Participante 2026'),
('brasil-2026', 'copa-2026', 'Brasil', 'br', 'Participante 2026'),
('espanha-2026', 'copa-2026', 'Espanha', 'es', 'Participante 2026'),
('franca-2026', 'copa-2026', 'França', 'fr', 'Participante 2026'),
('inglaterra-2026', 'copa-2026', 'Inglaterra', 'gb-eng', 'Participante 2026')
ON CONFLICT (id) DO NOTHING;

-- ==================== 1. ALEMANHA ====================
INSERT INTO players (id, team_id, nome_oficial, posicao, numero_camisa, clube_epoca, pos_x, pos_y, no_onze_medio) VALUES
('ger-1', 'alemanha-2026', 'Ter Stegen', 'Goleiro', 1, 'Barcelona', 50.00, 88.00, TRUE),
('ger-2', 'alemanha-2026', 'Kimmich', 'Lateral-direito', 6, 'Bayern Munique', 82.00, 70.00, TRUE),
('ger-3', 'alemanha-2026', 'Rüdiger', 'Zagueiro', 2, 'Real Madrid', 62.00, 72.00, TRUE),
('ger-4', 'alemanha-2026', 'Jonathan Tah', 'Zagueiro', 4, 'Bayer Leverkusen', 38.00, 72.00, TRUE),
('ger-5', 'alemanha-2026', 'Raum', 'Lateral-esquerdo', 3, 'RB Leipzig', 18.00, 70.00, TRUE),
('ger-6', 'alemanha-2026', 'Toni Kroos', 'Meia', 8, 'Real Madrid', 35.00, 52.00, TRUE),
('ger-7', 'alemanha-2026', 'Goretzka', 'Meia', 14, 'Bayern Munique', 65.00, 52.00, TRUE),
('ger-8', 'alemanha-2026', 'Florian Wirtz', 'Meia-atacante', 10, 'Bayer Leverkusen', 50.00, 38.00, TRUE),
('ger-9', 'alemanha-2026', 'Jamal Musiala', 'Ponta-direita', 17, 'Bayern Munique', 80.00, 24.00, TRUE),
('ger-10', 'alemanha-2026', 'Sané', 'Ponta-esquerda', 19, 'Bayern Munique', 20.00, 24.00, TRUE),
('ger-11', 'alemanha-2026', 'Kai Havertz', 'Atacante', 7, 'Arsenal', 50.00, 16.00, TRUE)
ON CONFLICT (id) DO NOTHING;

INSERT INTO player_aliases (player_id, alias) VALUES
('ger-1', 'ter stegen'), ('ger-1', 'stegen'), ('ger-1', 'marc-andre ter stegen'), ('ger-1', 'marc andre ter stegen'),
('ger-2', 'kimmich'), ('ger-2', 'joshua kimmich'),
('ger-3', 'rudiger'), ('ger-3', 'rüdiger'), ('ger-3', 'antonio rudiger'), ('ger-3', 'antonio rüdiger'),
('ger-4', 'tah'), ('ger-4', 'jonathan tah'),
('ger-5', 'raum'), ('ger-5', 'david raum'),
('ger-6', 'kroos'), ('ger-6', 'toni kroos'),
('ger-7', 'goretzka'), ('ger-7', 'leon goretzka'),
('ger-8', 'wirtz'), ('ger-8', 'florian wirtz'),
('ger-9', 'musiala'), ('ger-9', 'jamal musiala'),
('ger-10', 'sane'), ('ger-10', 'sané'), ('ger-10', 'leroy sane'), ('ger-10', 'leroy sané'),
('ger-11', 'havertz'), ('ger-11', 'kai havertz');

-- ==================== 2. ARGENTINA ====================
INSERT INTO players (id, team_id, nome_oficial, posicao, numero_camisa, clube_epoca, pos_x, pos_y, no_onze_medio) VALUES
('arg-1', 'argentina-2026', 'Dibu Martínez', 'Goleiro', 23, 'Aston Villa', 50.00, 88.00, TRUE),
('arg-2', 'argentina-2026', 'Molina', 'Lateral-direito', 26, 'Atlético de Madrid', 82.00, 70.00, TRUE),
('arg-3', 'argentina-2026', 'Cuti Romero', 'Zagueiro', 13, 'Tottenham', 62.00, 72.00, TRUE),
('arg-4', 'argentina-2026', 'Otamendi', 'Zagueiro', 19, 'Benfica', 38.00, 72.00, TRUE),
('arg-5', 'argentina-2026', 'Tagliafico', 'Lateral-esquerdo', 3, 'Lyon', 18.00, 70.00, TRUE),
('arg-6', 'argentina-2026', 'De Paul', 'Meia', 7, 'Atlético de Madrid', 70.00, 52.00, TRUE),
('arg-7', 'argentina-2026', 'Enzo Fernández', 'Meia', 24, 'Chelsea', 50.00, 56.00, TRUE),
('arg-8', 'argentina-2026', 'Alexis Mac Allister', 'Meia', 20, 'Liverpool', 30.00, 52.00, TRUE),
('arg-9', 'argentina-2026', 'Lionel Messi', 'Ponta-direita', 10, 'Inter Miami', 80.00, 24.00, TRUE),
('arg-10', 'argentina-2026', 'Di María', 'Ponta-esquerda', 11, 'Benfica', 20.00, 24.00, TRUE),
('arg-11', 'argentina-2026', 'Julián Álvarez', 'Atacante', 9, 'Manchester City', 50.00, 16.00, TRUE)
ON CONFLICT (id) DO NOTHING;

INSERT INTO player_aliases (player_id, alias) VALUES
('arg-1', 'dibu martinez'), ('arg-1', 'dibu martínez'), ('arg-1', 'dibu'), ('arg-1', 'emiliano martinez'), ('arg-1', 'emiliano martínez'),
('arg-2', 'molina'), ('arg-2', 'nahuel molina'),
('arg-3', 'romero'), ('arg-3', 'cuti romero'), ('arg-3', 'cristian romero'),
('arg-4', 'otamendi'), ('arg-4', 'nicolas otamendi'), ('arg-4', 'nicolás otamendi'),
('arg-5', 'tagliafico'), ('arg-5', 'nicolas tagliafico'), ('arg-5', 'nicolás tagliafico'),
('arg-6', 'de paul'), ('arg-6', 'rodrigo de paul'),
('arg-7', 'enzo fernandez'), ('arg-7', 'enzo fernández'), ('arg-7', 'enzo'),
('arg-8', 'mac allister'), ('arg-8', 'alexis mac allister'),
('arg-9', 'messi'), ('arg-9', 'lionel messi'), ('arg-9', 'leo messi'),
('arg-10', 'di maria'), ('arg-10', 'di maría'), ('arg-10', 'angel di maria'), ('arg-10', 'ángel di maría'),
('arg-11', 'julian alvarez'), ('arg-11', 'julian álvarez'), ('arg-11', 'alvarez'), ('arg-11', 'álvarez');

-- ==================== 3. BRASIL ====================
INSERT INTO players (id, team_id, nome_oficial, posicao, numero_camisa, clube_epoca, pos_x, pos_y, no_onze_medio) VALUES
('bra-1', 'brasil-2026', 'Alisson', 'Goleiro', 1, 'Liverpool', 50.00, 88.00, TRUE),
('bra-2', 'brasil-2026', 'Danilo', 'Lateral-direito', 2, 'Juventus', 82.00, 70.00, TRUE),
('bra-3', 'brasil-2026', 'Marquinhos', 'Zagueiro', 4, 'PSG', 62.00, 72.00, TRUE),
('bra-4', 'brasil-2026', 'Gabriel Magalhães', 'Zagueiro', 14, 'Arsenal', 38.00, 72.00, TRUE),
('bra-5', 'brasil-2026', 'Wendell', 'Lateral-esquerdo', 6, 'Porto', 18.00, 70.00, TRUE),
('bra-6', 'brasil-2026', 'Bruno Guimarães', 'Volante', 5, 'Newcastle', 35.00, 52.00, TRUE),
('bra-7', 'brasil-2026', 'Lucas Paquetá', 'Meia', 8, 'West Ham', 65.00, 52.00, TRUE),
('bra-8', 'brasil-2026', 'Rodrygo', 'Meia-atacante', 10, 'Real Madrid', 50.00, 38.00, TRUE),
('bra-9', 'brasil-2026', 'Raphinha', 'Ponta-direita', 11, 'Barcelona', 80.00, 24.00, TRUE),
('bra-10', 'brasil-2026', 'Vinícius Júnior', 'Ponta-esquerda', 7, 'Real Madrid', 20.00, 24.00, TRUE),
('bra-11', 'brasil-2026', 'Endrick', 'Atacante', 9, 'Real Madrid', 50.00, 16.00, TRUE)
ON CONFLICT (id) DO NOTHING;

INSERT INTO player_aliases (player_id, alias) VALUES
('bra-1', 'alisson'), ('bra-1', 'alisson becker'),
('bra-2', 'danilo'),
('bra-3', 'marquinhos'),
('bra-4', 'gabriel magalhaes'), ('bra-4', 'gabriel magalhães'), ('bra-4', 'gabriel'),
('bra-5', 'wendell'),
('bra-6', 'bruno guimaraes'), ('bra-6', 'bruno guimarães'), ('bra-6', 'bruno'),
('bra-7', 'paqueta'), ('bra-7', 'paquetá'), ('bra-7', 'lucas paqueta'), ('bra-7', 'lucas paquetá'),
('bra-8', 'rodrygo'), ('bra-8', 'rodrygo goes'),
('bra-9', 'raphinha'),
('bra-10', 'vinicius junior'), ('bra-10', 'vinícius júnior'), ('bra-10', 'vinicius jr'), ('bra-10', 'vini jr'), ('bra-10', 'vinicius'), ('bra-10', 'vini'),
('bra-11', 'endrick');

-- ==================== 4. ESPANHA ====================
INSERT INTO players (id, team_id, nome_oficial, posicao, numero_camisa, clube_epoca, pos_x, pos_y, no_onze_medio) VALUES
('esp-1', 'espanha-2026', 'Unai Simón', 'Goleiro', 23, 'Athletic Bilbao', 50.00, 88.00, TRUE),
('esp-2', 'espanha-2026', 'Carvajal', 'Lateral-direito', 2, 'Real Madrid', 82.00, 70.00, TRUE),
('esp-3', 'espanha-2026', 'Le Normand', 'Zagueiro', 3, 'Atlético de Madrid', 62.00, 72.00, TRUE),
('esp-4', 'espanha-2026', 'Laporte', 'Zagueiro', 14, 'Al-Nassr', 38.00, 72.00, TRUE),
('esp-5', 'espanha-2026', 'Cucurella', 'Lateral-esquerdo', 24, 'Chelsea', 18.00, 70.00, TRUE),
('esp-6', 'espanha-2026', 'Rodri', 'Volante', 16, 'Manchester City', 50.00, 58.00, TRUE),
('esp-7', 'espanha-2026', 'Pedri', 'Meia', 8, 'Barcelona', 32.00, 44.00, TRUE),
('esp-8', 'espanha-2026', 'Dani Olmo', 'Meia', 10, 'Barcelona', 68.00, 44.00, TRUE),
('esp-9', 'espanha-2026', 'Lamine Yamal', 'Ponta-direita', 19, 'Barcelona', 80.00, 24.00, TRUE),
('esp-10', 'espanha-2026', 'Nico Williams', 'Ponta-esquerda', 17, 'Athletic Bilbao', 20.00, 24.00, TRUE),
('esp-11', 'espanha-2026', 'Morata', 'Atacante', 7, 'AC Milan', 50.00, 16.00, TRUE)
ON CONFLICT (id) DO NOTHING;

INSERT INTO player_aliases (player_id, alias) VALUES
('esp-1', 'unai simon'), ('esp-1', 'unai simón'), ('esp-1', 'simon'), ('esp-1', 'simón'),
('esp-2', 'carvajal'), ('esp-2', 'dani carvajal'),
('esp-3', 'le normand'), ('esp-3', 'robin le normand'),
('esp-4', 'laporte'), ('esp-4', 'aymeric laporte'),
('esp-5', 'cucurella'), ('esp-5', 'marc cucurella'),
('esp-6', 'rodri'), ('esp-6', 'rodrigo'),
('esp-7', 'pedri'),
('esp-8', 'olmo'), ('esp-8', 'dani olmo'),
('esp-9', 'lamine yamal'), ('esp-9', 'yamal'), ('esp-9', 'lamine'),
('esp-10', 'nico williams'), ('esp-10', 'williams'),
('esp-11', 'morata'), ('esp-11', 'alvaro morata'), ('esp-11', 'álvaro morata');

-- ==================== 5. FRANÇA ====================
INSERT INTO players (id, team_id, nome_oficial, posicao, numero_camisa, clube_epoca, pos_x, pos_y, no_onze_medio) VALUES
('fra-1', 'franca-2026', 'Maignan', 'Goleiro', 16, 'AC Milan', 50.00, 88.00, TRUE),
('fra-2', 'franca-2026', 'Koundé', 'Lateral-direito', 5, 'Barcelona', 82.00, 70.00, TRUE),
('fra-3', 'franca-2026', 'Saliba', 'Zagueiro', 4, 'Arsenal', 62.00, 72.00, TRUE),
('fra-4', 'franca-2026', 'Upamecano', 'Zagueiro', 15, 'Bayern Munique', 38.00, 72.00, TRUE),
('fra-5', 'franca-2026', 'Theo Hernández', 'Lateral-esquerdo', 22, 'AC Milan', 18.00, 70.00, TRUE),
('fra-6', 'franca-2026', 'Tchouaméni', 'Volante', 8, 'Real Madrid', 35.00, 52.00, TRUE),
('fra-7', 'franca-2026', 'Rabiot', 'Meia', 14, 'Juventus', 65.00, 52.00, TRUE),
('fra-8', 'franca-2026', 'Griezmann', 'Meia-atacante', 7, 'Atlético de Madrid', 50.00, 38.00, TRUE),
('fra-9', 'franca-2026', 'Dembélé', 'Ponta-direita', 11, 'PSG', 80.00, 24.00, TRUE),
('fra-10', 'franca-2026', 'Mbappé', 'Ponta-esquerda', 10, 'Real Madrid', 20.00, 24.00, TRUE),
('fra-11', 'franca-2026', 'Giroud', 'Atacante', 9, 'LAFC', 50.00, 16.00, TRUE)
ON CONFLICT (id) DO NOTHING;

INSERT INTO player_aliases (player_id, alias) VALUES
('fra-1', 'maignan'), ('fra-1', 'mike maignan'),
('fra-2', 'kounde'), ('fra-2', 'koundé'), ('fra-2', 'jules kounde'),
('fra-3', 'saliba'), ('fra-3', 'william saliba'),
('fra-4', 'upamecano'), ('fra-4', 'dayot upamecano'),
('fra-5', 'theo hernandez'), ('fra-5', 'theo hernández'), ('fra-5', 'theo'),
('fra-6', 'tchouameni'), ('fra-6', 'tchouaméni'), ('fra-6', 'aurelien tchouameni'),
('fra-7', 'rabiot'), ('fra-7', 'adrien rabiot'),
('fra-8', 'griezmann'), ('fra-8', 'antoine griezmann'),
('fra-9', 'dembele'), ('fra-9', 'dembélé'), ('fra-9', 'ousmane dembele'),
('fra-10', 'mbappe'), ('fra-10', 'mbappé'), ('fra-10', 'kylian mbappe'), ('fra-10', 'kylian mbappé'),
('fra-11', 'giroud'), ('fra-11', 'olivier giroud');

-- ==================== 6. INGLATERRA ====================
INSERT INTO players (id, team_id, nome_oficial, posicao, numero_camisa, clube_epoca, pos_x, pos_y, no_onze_medio) VALUES
('eng-1', 'inglaterra-2026', 'Pickford', 'Goleiro', 1, 'Everton', 50.00, 88.00, TRUE),
('eng-2', 'inglaterra-2026', 'Walker', 'Lateral-direito', 2, 'Manchester City', 82.00, 70.00, TRUE),
('eng-3', 'inglaterra-2026', 'Stones', 'Zagueiro', 5, 'Manchester City', 62.00, 72.00, TRUE),
('eng-4', 'inglaterra-2026', 'Guéhi', 'Zagueiro', 6, 'Crystal Palace', 38.00, 72.00, TRUE),
('eng-5', 'inglaterra-2026', 'Trippier', 'Lateral-esquerdo', 12, 'Newcastle', 18.00, 70.00, TRUE),
('eng-6', 'inglaterra-2026', 'Declan Rice', 'Volante', 4, 'Arsenal', 50.00, 58.00, TRUE),
('eng-7', 'inglaterra-2026', 'Jude Bellingham', 'Meia', 10, 'Real Madrid', 32.00, 44.00, TRUE),
('eng-8', 'inglaterra-2026', 'Phil Foden', 'Meia', 11, 'Manchester City', 68.00, 44.00, TRUE),
('eng-9', 'inglaterra-2026', 'Bukayo Saka', 'Ponta-direita', 7, 'Arsenal', 80.00, 24.00, TRUE),
('eng-10', 'inglaterra-2026', 'Cole Palmer', 'Ponta-esquerda', 24, 'Chelsea', 20.00, 24.00, TRUE),
('eng-11', 'inglaterra-2026', 'Harry Kane', 'Atacante', 9, 'Bayern Munique', 50.00, 16.00, TRUE)
ON CONFLICT (id) DO NOTHING;

INSERT INTO player_aliases (player_id, alias) VALUES
('eng-1', 'pickford'), ('eng-1', 'jordan pickford'),
('eng-2', 'walker'), ('eng-2', 'kyle walker'),
('eng-3', 'stones'), ('eng-3', 'john stones'),
('eng-4', 'guehi'), ('eng-4', 'guéhi'), ('eng-4', 'marc guehi'),
('eng-5', 'trippier'), ('eng-5', 'kieran trippier'),
('eng-6', 'rice'), ('eng-6', 'declan rice'),
('eng-7', 'bellingham'), ('eng-7', 'jude bellingham'),
('eng-8', 'foden'), ('eng-8', 'phil foden'),
('eng-9', 'saka'), ('eng-9', 'bukayo saka'),
('eng-10', 'palmer'), ('eng-10', 'cole palmer'),
('eng-11', 'kane'), ('eng-11', 'harry kane');

# Documentação Técnica — Banco de Dados e Infraestrutura
## Aplicação "Adivinhe a Copa"

**Versão:** 1.0
**Complementa:** especificacao-jogo-copa.md

---

## 1. Objetivo deste documento

Descrever a modelagem do banco de dados PostgreSQL e a infraestrutura local via
Docker necessárias para o desenvolvimento da aplicação. Este documento serve como
referência para a IDE/assistente de código gerar os arquivos reais do projeto
(docker-compose, migrations, seeds), não substituindo-os.

---

## 2. Infraestrutura Local (Docker)

### 2.1 Visão geral
O ambiente de desenvolvimento deve subir um banco PostgreSQL local via Docker, sem
depender de instalação nativa do Postgres na máquina do desenvolvedor.

### 2.2 Serviços esperados

| Serviço | Imagem sugerida | Porta local | Função |
|---|---|---|---|
| `db` | `postgres:16-alpine` | 5432 | Banco de dados principal |
| `adminer` (opcional) | `adminer:latest` | 8080 | Interface visual para inspecionar o banco no navegador |

### 2.3 Variáveis de ambiente esperadas

| Variável | Exemplo | Descrição |
|---|---|---|
| `POSTGRES_USER` | `copa_user` | Usuário do banco |
| `POSTGRES_PASSWORD` | `copa_pass` | Senha do banco |
| `POSTGRES_DB` | `adivinhe_copa` | Nome do banco de dados |
| `POSTGRES_PORT` | `5432` | Porta exposta localmente |
| `DATABASE_URL` | `postgresql://copa_user:copa_pass@localhost:5432/adivinhe_copa` | String de conexão para o backend |

### 2.4 Persistência
Os dados do banco devem ser persistidos em um **volume Docker nomeado**, para que o
conteúdo não se perca ao reiniciar os containers (`docker compose down` sem `-v`).

### 2.5 Inicialização automática
Scripts de schema e seed devem ser executados automaticamente na primeira subida do
container (padrão de pastas `/docker-entrypoint-initdb.d` da imagem oficial do
Postgres), para que o desenvolvedor não precise rodar comandos manuais na primeira
vez.

---

## 3. Modelagem do Banco de Dados

### 3.1 Entidades principais

```
editions (edições da copa)
   └── teams (seleções participantes de uma edição)
          └── players (jogadores convocados de uma seleção)
                 └── player_aliases (variações de nome aceitas por jogador)

game_sessions (partidas jogadas — opcional/futuro, para recordes)
   └── game_session_progress (progresso por seleção dentro de uma partida)
```

### 3.2 Tabela `editions`

| Coluna | Tipo | Descrição |
|---|---|---|
| id | uuid / serial (PK) | Identificador |
| ano | integer | Ano da Copa (ex: 2002) |
| pais_sede | text | País(es) sede |
| criado_em | timestamp | Data de criação do registro |

### 3.3 Tabela `teams`

| Coluna | Tipo | Descrição |
|---|---|---|
| id | uuid / serial (PK) | Identificador |
| edition_id | FK → editions.id | Edição a que pertence |
| nome | text | Nome da seleção (ex: "Brasil") |
| bandeira_codigo | text | Código do país para exibir bandeira (ex: "br") |
| resultado_final | text (opcional) | Ex: "Campeão", "Vice-campeão", "Fase de grupos" |

> **Índice recomendado**: em `(edition_id, nome)` para permitir ordenação alfabética
> eficiente das seleções de uma edição.

### 3.4 Tabela `players`

| Coluna | Tipo | Descrição |
|---|---|---|
| id | uuid / serial (PK) | Identificador |
| team_id | FK → teams.id | Seleção a que pertence |
| nome_oficial | text | Nome de exibição do jogador |
| posicao | text | Ex: "Goleiro", "Zagueiro", "Meio-campo", "Atacante" |
| numero_camisa | integer (opcional) | Número da camisa na época |
| clube_epoca | text (opcional) | Clube do jogador na época da Copa |
| pos_x | numeric (opcional) | Coordenada X (%) para desenho no campo tático |
| pos_y | numeric (opcional) | Coordenada Y (%) para desenho no campo tático |
| no_onze_medio | boolean | Se este jogador faz parte dos 11 exigidos no nível Médio |

> **Nota sobre `no_onze_medio`**: essa é uma decisão de curadoria do jogo (quais 11
> jogadores compõem o desafio daquela seleção), não uma escalação real de partida —
> conforme definido na especificação principal.

### 3.5 Tabela `player_aliases`

| Coluna | Tipo | Descrição |
|---|---|---|
| id | uuid / serial (PK) | Identificador |
| player_id | FK → players.id | Jogador a que pertence |
| alias | text | Variação de nome aceita (normalizada: minúsculo, sem acento) |

> **Índice recomendado**: em `alias` para busca rápida na validação de respostas do
> usuário.

### 3.6 Tabela `game_sessions` (opcional — recordes/persistência)

| Coluna | Tipo | Descrição |
|---|---|---|
| id | uuid (PK) | Identificador da partida |
| edition_id | FK → editions.id | Edição jogada |
| usuario_id | text/uuid (opcional) | Identificador do usuário, se houver login |
| iniciado_em | timestamp | Início da partida |
| finalizado_em | timestamp (nullable) | Fim da partida |
| tempo_segundos | integer (nullable) | Tempo total, calculado ao final |
| erros_cometidos | integer | Total de erros (máx. 3) |
| pulos_usados | integer | Total de pulos usados (máx. 2) |
| status | text | `em_andamento`, `vitoria`, `derrota` |

### 3.7 Tabela `game_session_progress` (opcional)

| Coluna | Tipo | Descrição |
|---|---|---|
| id | uuid (PK) | Identificador |
| session_id | FK → game_sessions.id | Partida a que pertence |
| team_id | FK → teams.id | Seleção referente a este progresso |
| status | text | `pendente`, `em_andamento`, `concluida`, `pulada` |
| acertos | jsonb / array | IDs dos jogadores já acertados nesta seleção |

---

## 4. Regras de Integridade Sugeridas

- Um `player` sempre pertence a exatamente um `team`
- Um `team` sempre pertence a exatamente uma `edition`
- Não deve haver dois `players` com o mesmo `nome_oficial` dentro do mesmo `team`
  (evitar ambiguidade na validação)
- `alias` deve ser único **dentro do mesmo `team`** (evitar que um alias aponte para
  mais de um jogador da mesma seleção)
- Exatamente 11 jogadores por `team` devem estar marcados com `no_onze_medio = true`
  (regra de validação de dados, não de banco — pode virar um script de checagem)

---

## 5. Dados Iniciais (Seed) — Escopo Esperado

Para o MVP, a base inicial (seed) deve conter:

- 1 edição: Copa do Mundo de 2026
- De 4 a 6 seleções reais dessa edição (ex: Alemanha, Argentina, Brasil, Inglaterra,
  França, Turquia)
- Para cada seleção: 11 jogadores marcados como `no_onze_medio = true`, com aliases
  cadastrados para os nomes mais populares/apelidos
- Coordenadas `pos_x`/`pos_y` definidas de forma a montar uma formação tática
  coerente (ex: 4-4-2) ao desenhar o campo

---

## 6. Estrutura de Pastas Sugerida no Projeto

```
escalou/
├── docker-compose.yml          # sobe o Postgres local (+ Adminer opcional)
├── .env                        # variáveis de ambiente (não versionado)
├── .env.example                # modelo de variáveis de ambiente
├── db/
│   ├── migrations/             # scripts de criação/alteração de schema, versionados
│   └── seeds/                  # scripts de dados iniciais (edição + seleções + jogadores)
├── src/
│   ├── data/                   # camada de acesso ao banco (queries, ORM)
│   ├── game/                   # lógica do jogo (validação, avanço de seleção, erros, pulos)
│   └── components/             # componentes visuais (campo, trilha, contadores)
└── README.md
```

---

## 7. Próximos Passos Técnicos

1. Definir ferramenta de acesso ao banco (ORM como Prisma/Drizzle, ou SQL puro com
   `pg`)
2. Criar as migrations a partir das tabelas descritas na seção 3
3. Criar o seed com os dados reais da Copa de 2026 (seção 5)
4. Implementar a camada de validação de nomes consultando `player_aliases`
5. Decidir se a persistência de `game_sessions` entra já no MVP ou fica para uma
   fase futura (a especificação principal sugere começar apenas com LocalStorage no
   frontend, deixando o banco só para o catálogo de edições/seleções/jogadores)
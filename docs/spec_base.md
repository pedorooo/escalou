# Especificação de Aplicação
## Jogo de Adivinhação de Jogadores de Seleções em Copas do Mundo

**Versão:** 1.0
**Data:** Julho de 2026
**Status:** Rascunho para desenvolvimento

---

## 1. Visão Geral

### 1.1 Descrição
Aplicação web (jogo) em que o usuário escolhe uma **edição da Copa do Mundo** (ex: Brasil 2002, Argentina 1986, Catar 2022) e precisa adivinhar jogadores de **todas as seleções participantes daquela edição**, percorrendo-as **em ordem alfabética** (ex: Alemanha → Argentina → Brasil → ... → Uruguai). A quantidade de jogadores exigida por seleção varia conforme o **nível de dificuldade** escolhido. O jogo cronometra o tempo total até a conclusão e limita o número de erros permitidos (3 no total, para a partida inteira).

### 1.2 Objetivo do Jogador
Completar corretamente a exigência de jogadores de **cada uma das seleções** da edição escolhida, na ordem alfabética, no menor tempo possível e cometendo o mínimo de erros, respeitando o limite máximo de 3 erros para a partida inteira (não por seleção).

### 1.3 Níveis de Dificuldade

| Nível | Exigência por seleção | Escopo |
|---|---|---|
| **Fácil** | Acertar **1 jogador** de cada seleção | Futuro |
| **Médio** | Acertar **11 jogadores** de cada seleção (lista fixa e pré-definida por seleção/edição) | **MVP (padrão)** |
| **Difícil** | Acertar **todos os convocados** de cada seleção (22 a 26, dependendo da edição/regra da época) | Futuro |

> **Observação sobre o nível Médio**: em vez de marcar jogadores como "titular" (o que seria subjetivo e mudaria conforme a partida), cada seleção terá uma **lista fixa de 11 jogadores** definida manualmente na base de dados (curadoria editorial), sem necessidade de refletir a escalação real de um jogo específico. Essa lista é simplesmente "os 11 jogadores exigidos naquela seleção/edição para o nível Médio" — um dado próprio do jogo, não um fato histórico a ser validado.

### 1.4 Pulos (Skip)

O jogador pode **pular a seleção atual** e avançar para a próxima sem precisar completá-la.

| Regra | Descrição |
|---|---|
| Quantidade máxima | **2 pulos** por partida |
| Efeito do pulo | Seleção atual é marcada como "pulada" (não conta como concluída, mas o jogo segue) e avança para a próxima seleção |
| Custo | O pulo **não conta como erro** (é uma mecânica separada, com seu próprio limite) |
| Esgotamento | Ao usar os 2 pulos, a opção de pular fica indisponível pelo restante da partida |
| Resultado final | O relatório final deve indicar quais seleções foram puladas, separando-as das que tiveram erro ou não foram alcançadas |

### 1.5 Público-alvo
Fãs de futebol, torcedores nostálgicos, jogadores casuais de jogos de trivia/quiz esportivo.

---

## 2. Regras do Jogo

| Regra | Descrição |
|---|---|
| Seleção do desafio | Usuário escolhe uma **edição da Copa** (ex: "Copa de 2002") e um **nível de dificuldade** |
| Ordem das seleções | As seleções participantes são apresentadas **em ordem alfabética** (ex: Alemanha, Arábia Saudita, Argentina, Bélgica...) |
| Objetivo por seleção | Acertar a quantidade de jogadores exigida pelo nível de dificuldade (1 / 11 / 22-26) antes de avançar para a próxima seleção |
| Avanço de seleção | Ao completar a exigência da seleção atual, o jogo avança automaticamente para a próxima (em ordem alfabética) |
| Pulo de seleção | Jogador pode pular a seleção atual, no máximo **2 vezes** por partida (ver seção 1.4); não conta como erro |
| Tentativas erradas | Máximo de **3 erros no total**, válidos para a partida inteira (não reinicia por seleção) |
| Fim de jogo (derrota) | Ao atingir o 4º erro, o jogo termina e mostra o que faltava, incluindo seleções não iniciadas |
| Fim de jogo (vitória) | Ao completar a exigência de todas as seleções da edição |
| Cronômetro | Inicia ao começar a partida, para ao concluir (vitória ou derrota); conta o tempo total do desafio (todas as seleções) |
| Progresso visual | Indicador de "seleção atual" + lista/trilha das seleções (concluídas, atual, pendentes) |
| Contagem de erros | Exibida visualmente (ex: 3 "vidas" ou ícones que somem a cada erro), compartilhada entre todas as seleções |
| Dicas (opcional) | Posição do jogador, número da camisa, ou clube da época, liberados após X erros ou por escolha do usuário |
| Duplicidade | Um nome já acertado não pode ser digitado novamente (não conta como erro, apenas ignora); nomes de uma seleção não valem para outra |
| Case/acentos | Sistema deve ser tolerante a maiúsculas/minúsculas e acentuação (ex: "pele" = "Pelé") |

---

## 3. Fluxo do Usuário (User Flow)

1. **Tela inicial**: usuário escolhe a **edição da Copa** (ex: grid de anos/bandeiras da sede)
2. **Tela de dificuldade**: usuário escolhe Fácil / Médio / Difícil, com **Médio pré-selecionado como padrão** (único nível ativo no MVP; os demais podem aparecer como "em breve")
3. **Tela do jogo**:
   - Indicador da **seleção atual** (bandeira + nome), em destaque
   - Trilha/lista horizontal ou lateral com todas as seleções da edição em ordem alfabética, sinalizando: concluída (✔), pulada (⏭), atual (▶), pendente (○)
   - Campo de texto para digitar nome do jogador da seleção atual
   - Grid/lista de placeholders para os jogadores exigidos **da seleção atual** (11 espaços no nível Médio, do MVP)
   - Botão "Pular seleção" com indicador de pulos restantes (ex: "2/2 disponíveis"); some ou desabilita quando os 2 pulos acabam
   - Contador de erros (ex: 3 corações/bolas, perde 1 a cada erro, válido para o jogo todo)
   - Cronômetro rodando em tempo real (contando desde o início da 1ª seleção)
   - Ao completar a seleção atual: pequena transição/feedback ("Seleção completa!") e avanço automático para a próxima
4. **Fim de jogo**:
   - Tela de resultado: tempo total, número de erros, quantas seleções foram concluídas
   - Detalhamento por seleção (opcional): quais jogadores foram acertados/perdidos em cada uma
   - Opção de compartilhar resultado (opcional, estilo Wordle)
   - Botão "Jogar novamente" ou "Escolher outra edição/dificuldade"

---

## 4. Requisitos Funcionais

| ID | Requisito |
|---|---|
| RF01 | O sistema deve permitir a seleção de uma edição de Copa do Mundo específica |
| RF02 | O sistema deve permitir a seleção de um nível de dificuldade; **no MVP, apenas o nível Médio estará disponível e será o padrão** |
| RF03 | O sistema deve carregar todas as seleções participantes daquela edição, ordenadas alfabeticamente |
| RF04 | O sistema deve carregar, para cada seleção, a lista fixa de 11 jogadores exigida no nível Médio (definida por curadoria, sem relação com escalação real de partida) |
| RF05 | O sistema deve validar a entrada do usuário contra a lista de jogadores da seleção **atual** (com tolerância a variações de escrita) |
| RF06 | O sistema deve avançar automaticamente para a próxima seleção (em ordem alfabética) ao completar a exigência da seleção atual |
| RF07 | O sistema deve permitir pular a seleção atual, no máximo **2 vezes** por partida, sem penalizar como erro |
| RF08 | O sistema deve contabilizar erros de forma acumulada (para a partida inteira, não por seleção) e interromper o jogo ao atingir o limite (3) |
| RF09 | O sistema deve cronometrar o tempo desde o início da 1ª seleção até a conclusão de todas (ou até a derrota) |
| RF10 | O sistema deve exibir progresso em tempo real: seleção atual, seleções concluídas/puladas/pendentes, acertos na seleção atual, erros totais, pulos restantes, tempo |
| RF11 | O sistema deve exibir uma tela de resultados ao final (vitória ou derrota), indicando até onde o usuário chegou e quais seleções foram puladas |
| RF12 | O sistema deve permitir reiniciar o jogo ou trocar de edição |
| RF13 (opcional) | O sistema deve armazenar recordes (melhor tempo, menos erros, menos pulos) por edição, localmente ou em servidor |
| RF14 (opcional) | O sistema deve permitir compartilhamento do resultado (texto/imagem) |

---

## 5. Requisitos Não Funcionais

| ID | Requisito |
|---|---|
| RNF01 | Aplicação deve ser responsiva (mobile e desktop) |
| RNF02 | Tempo de resposta da validação de nome deve ser instantâneo (< 100ms) |
| RNF03 | Deve funcionar offline após carregamento inicial (opcional, PWA) |
| RNF04 | Dados dos jogadores devem ser de fácil manutenção/atualização (JSON separado da lógica) |
| RNF05 | Interface deve seguir identidade visual de futebol (cores, tipografia esportiva) |

---

## 6. Modelo de Dados

### 6.1 Estrutura de uma "Edição" (JSON exemplo)

Uma edição contém **várias seleções**. Cada seleção tem sua lista completa de convocados (para uso futuro no nível Difícil) e uma lista separada e **fixa**, `onze_medio`, com os 11 nomes exigidos no nível Médio — definida por curadoria manual, sem relação com escalação real de nenhuma partida específica.

```json
{
  "id": "copa-2002",
  "ano": 2002,
  "pais_sede": "Coreia do Sul e Japão",
  "selecoes": [
    {
      "id": "brasil-2002",
      "nome": "Brasil",
      "bandeira": "br",
      "resultado_final": "Campeão",
      "convocados": [
        {
          "id": 1,
          "nome_oficial": "Marcos",
          "aliases": ["marcos"],
          "posicao": "Goleiro",
          "numero": 1,
          "clube_epoca": "Palmeiras"
        },
        {
          "id": 2,
          "nome_oficial": "Cafu",
          "aliases": ["cafu"],
          "posicao": "Lateral-direito",
          "numero": 2,
          "clube_epoca": "AS Roma"
        }
      ],
      "onze_medio": [1, 2, 5, 8, 9, 10, 11, 13, 14, 17, 20]
    },
    {
      "id": "alemanha-2002",
      "nome": "Alemanha",
      "bandeira": "de",
      "resultado_final": "Vice-campeão",
      "convocados": [],
      "onze_medio": []
    }
  ]
}
```

> **Nota**: `onze_medio` é apenas uma **lista de IDs de jogadores** (referenciando `convocados`), escolhida editorialmente para compor o desafio do nível Médio. Não representa necessariamente a escalação titular de nenhum jogo real — é um dado de curadoria do próprio jogo, o que evita o problema de subjetividade/volatilidade de definir "quem foi titular".

### 6.2 Ordenação das seleções
As seleções de cada edição devem ser ordenadas alfabeticamente pelo campo `nome` (considerando acentuação, ex: convenção pt-BR) antes de serem apresentadas ao jogador.

### 6.3 Estrutura de sessão de jogo (estado em memória/local)

```json
{
  "edicao_id": "copa-2002",
  "dificuldade": "medio",
  "inicio_timestamp": 1721395200,
  "fim_timestamp": null,
  "selecao_atual_index": 2,
  "selecoes_ordem": ["alemanha-2002", "argentina-2002", "brasil-2002", "..."],
  "progresso_por_selecao": {
    "alemanha-2002": { "status": "concluida", "acertos": ["kahn", "..."] },
    "argentina-2002": { "status": "pulada", "acertos": [] },
    "brasil-2002": { "status": "em_andamento", "acertos": ["cafu", "marcos"] }
  },
  "erros_cometidos": 1,
  "erros_max": 3,
  "pulos_usados": 1,
  "pulos_max": 2,
  "status": "em_andamento"
}
```

> Valores possíveis para `status` de cada seleção: `pendente`, `em_andamento`, `concluida`, `pulada`.

### 6.4 Estrutura de resultado/recorde (se houver persistência)

```json
{
  "edicao_id": "copa-2002",
  "dificuldade": "medio",
  "usuario": "convidado_ou_id",
  "tempo_segundos": 845,
  "erros": 2,
  "pulos_usados": 1,
  "selecoes_concluidas": 31,
  "selecoes_puladas": 1,
  "selecoes_total": 32,
  "vitoria": true,
  "data": "2026-07-19T14:30:00Z"
}
```

---

## 7. Lógica de Validação de Nomes

Para evitar frustração do usuário com pequenas variações de digitação, recomenda-se:

- Normalizar entrada: remover acentos, colocar em minúsculas, remover espaços extras
- Comparar contra uma lista de **aliases** por jogador (apelidos, nomes populares, sobrenomes)
  - Exemplo: "Ronaldo" deve aceitar "Ronaldo", "Ronaldo Fenômeno", "R9"
  - Exemplo: "Ronaldinho Gaúcho" deve aceitar "Ronaldinho"
- Definir se aceita apenas sobrenome, apenas primeiro nome, ou nome completo (recomenda-se aceitar qualquer alias cadastrado)

---

## 8. Interface (Telas Principais)

1. **Home / Seleção de edição**
   - Grid ou lista de seleções e anos disponíveis
   - Filtro por país ou por ano
2. **Tela de jogo**
   - Campo de input com autocomplete opcional
   - Grid de "cards" representando cada jogador (vazio até acerto)
   - Barra/contador de erros (ex: 3 ícones de bola, ficam cinzas ao errar)
   - Timer no canto superior
3. **Tela de resultado**
   - Resumo: tempo final, erros, taxa de acerto
   - Lista completa revelada com destaque visual (verde = acertado, vermelho = não descoberto)
   - Botões: jogar novamente, compartilhar, escolher outra edição

---

## 9. Sugestão de Stack Técnica

| Camada | Sugestão |
|---|---|
| Frontend | React (ou HTML/CSS/JS puro para versão simples) |
| Estilização | Tailwind CSS |
| Dados dos jogadores | Arquivos JSON estáticos por edição (fácil de expandir) |
| Persistência de recordes | LocalStorage (versão simples) ou backend com banco de dados (versão com ranking global) |
| Backend (opcional, para ranking global) | Node.js + Express, ou Firebase |
| Hospedagem | Vercel, Netlify ou GitHub Pages (para versão sem backend) |

> Observação: para uma primeira versão (MVP), recomenda-se **sem backend**, usando JSON estático e LocalStorage para recordes pessoais. Backend só se justifica se houver ranking global entre jogadores.

---

## 10. Regras de Pontuação (opcional, para gamificação futura)

Caso deseje adicionar um sistema de pontuação além de tempo/erros:

- Pontuação base por acerto
- Bônus por velocidade (menos tempo = mais pontos)
- Penalidade por erro
- Fórmula sugerida: `pontos = (acertos * 100) - (erros * 50) - (tempo_segundos)`

---

## 11. Roadmap Sugerido (MVP → Evolução)

| Fase | Escopo |
|---|---|
| **MVP** | Uma edição por vez, **nível Médio fixo** (11 jogadores por seleção), todas as seleções em ordem alfabética, cronômetro, 3 erros, **2 pulos**, tela de resultado |
| V2 | Múltiplas edições selecionáveis, persistência local de recordes |
| V3 | Níveis Fácil e Difícil habilitados, com telas de seleção de dificuldade |
| V4 | Dicas (posição, clube, número da camisa) |
| V5 | Ranking global (backend), compartilhamento de resultado estilo Wordle |
| V6 | Modo multiplayer (dois jogadores competindo pela mesma edição em tempo real) |

---

## 12. Riscos e Pontos de Atenção

- **Qualidade dos dados**: convocações de Copas antigas podem ter divergência entre fontes; recomenda-se validar com fonte oficial (FIFA) ou fontes consolidadas (ex: RSSSF)
- **Variações de nome**: jogadores com nomes populares/apelidos exigem lista de aliases bem construída para não frustrar o usuário
- **Curadoria do `onze_medio`**: como a lista de 11 jogadores por seleção é definida manualmente (e não extraída de uma escalação real), é preciso montar esse dado com cuidado para cada seleção de cada edição — recomenda-se documentar o critério usado (ex: "jogadores mais conhecidos/relevantes da seleção naquela Copa") para manter consistência entre edições
- **Volume de dados no MVP**: uma Copa tem até 32 seleções x 11 jogadores (nível Médio) = até ~350 jogadores por edição; volume gerenciável, mas ainda exige curadoria cuidadosa de cada seleção
- **Uso dos pulos**: definir se pular uma seleção conta negativamente em algum ranking/recorde futuro (recomenda-se que sim, para diferenciar quem completou tudo sem pular)
- **Direitos de imagem**: caso deseje usar fotos dos jogadores, atenção a direitos autorais/imagem

---

## 13. Próximos Passos

1. Definir a primeira edição/seleção para o MVP (Copa de 2026)
2. Montar o JSON de dados dessa edição (lista oficial + aliases)
3. Definir stack final (recomendação: HTML/CSS/JS ou React + Tailwind, sem backend)
4. Prototipar tela de jogo com lógica de erros/acertos/cronômetro
5. Testar validação de nomes com usuários reais para ajustar aliases
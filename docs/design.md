# Documentação de Estilização
## Aplicação "Adivinhe a Copa"

**Versão:** 1.0
**Complementa:** especificacao-jogo-copa.md

---

## 1. Princípios da Direção Visual

- **Sóbrio, não decorado.** A cor e a forma servem para comunicar estado do jogo
  (acertou, errou, concluiu), não para chamar atenção por si.
- **Verde como cor de identidade**, mas dessaturado — remete a campo de futebol sem
  parecer "gramado de videogame" nem neon.
- **Sem efeitos de profundidade artificial.** Nada de `blur`, `glow`/brilho ou
  `box-shadow`. Separação visual entre elementos deve vir de cor, contraste e
  espaçamento — não de sombra.
- **Bordas levemente arredondadas**, nunca circulares nem retas/quadradas.
- **Paleta enxuta.** Poucas cores, usadas com consistência e propósito claro, sem
  dourado/prata/bronze (evitar qualquer leitura de "pódio"/"medalha").

---

## 2. Paleta de Cores

| Papel | Cor | Hex | Uso |
|---|---|---|---|
| **Primary (Verde)** | Verde musgo dessaturado | `#4A6B5A` | Elementos de identidade: campo, botão principal, estados de sucesso |
| **Primary Dark** | Verde musgo escuro | `#324A3D` | Hover/pressed do primary, texto sobre fundo claro quando precisar de mais contraste |
| **Primary Light** | Verde musgo claro | `#DCE6DF` | Fundos suaves, preenchimento leve de cards/estados neutros |
| **Texto principal** | Preto suave | `#1B1F1D` | Textos, ícones de alto contraste (evitar preto puro `#000000`, que é mais duro) |
| **Fundo** | Branco | `#FFFFFF` | Fundo padrão das telas |
| **Fundo secundário** | Cinza muito claro | `#F4F5F3` | Cards, inputs, divisão sutil de seções (leve tom esverdeado, não cinza puro) |
| **Accent (cor de variação)** | Azul petróleo dessaturado | `#3E5C66` | Segundo ponto de cor: estados informativos, seleção "atual" na trilha, links, elementos que precisam se diferenciar do verde sem virar um alerta |
| **Erro** | Terracota apagado | `#A6503F` | Exclusivamente para erros/derrota — não usar em nenhum outro contexto |

### 2.1 O que evitar explicitamente
- Dourado, prateado ou bronze (ou qualquer tom que remeta a medalhas/pódio)
- Verde saturado/vibrante (tipo `#00C853` ou similares "verde grama de FIFA em
  videogame")
- Gradientes
- Mais de uma cor de accent ativa na mesma tela

---

## 3. Bordas e Formas

| Elemento | border-radius |
|---|---|
| Botões | `8px` |
| Inputs | `8px` |
| Cards / containers | `12px` |
| Bolinhas de jogador (campo) | `999px` (circular — exceção, pois representa o jogador) |
| Badges / pills pequenos (ex: estado na trilha de seleções) | `6px` |

Nada deve usar `border-radius: 0` (quinas totalmente retas) nem valores acima de
`12px` fora das bolinhas de jogador — o objetivo é suavidade discreta, não um
visual "arredondado/fofo".

---

## 4. Efeitos Proibidos (reforço)

Explicitamente **não usar** em nenhum componente:

- `box-shadow` (inclusive sombras sutis para "elevar" cards ou botões)
- `filter: blur()` ou `backdrop-filter: blur()`
- `glow`/brilho (ex: `box-shadow` colorido simulando luz, `text-shadow` luminoso)
- Gradientes de qualquer tipo

**Alternativas permitidas para separar elementos visualmente:**
- Borda sólida de 1px em cor neutra (ex: `#E2E5E2`)
- Diferença de cor de fundo (ex: card em `#F4F5F3` sobre fundo `#FFFFFF`)
- Espaçamento (padding/margin) generoso entre blocos

---

## 5. Tipografia

- **Impacto (display, títulos, cronômetro e contadores):** **Space Grotesk**
  Geométrica, com personalidade sem ser gritante. Excelente legibilidade de números (cronômetro, estatísticas e contadores), trazendo um caráter técnico/moderno alinhado ao visual de campo tático.
- **Texto (corpo, interface e nomes de jogadores):** **Manrope**
  Sans-serif limpa e bem legível em tamanhos pequenos, com peso levemente mais suave que a Space Grotesk — cria um contraste refinado sem destoar. Ideal para rótulos, nomes de jogadores e textos gerais de interface.
- **Hierarquia sugerida:**
  - Título de tela: 24–28px, semibold (Space Grotesk)
  - Nome da seleção atual: 20px, semibold (Space Grotesk)
  - Corpo/texto padrão: 16px, regular (Manrope)
  - Legendas/labels pequenos (ex: nome do jogador na bolinha): 12–13px, medium (Manrope)

---

## 6. Estados Visuais (aplicação das cores)

| Estado | Cor aplicada |
|---|---|
| Jogador acertado (bolinha preenchida) | Fundo `Primary (#4A6B5A)`, texto branco |
| Jogador não preenchido (bolinha vazia) | Fundo `Fundo secundário (#F4F5F3)`, borda 1px neutra, ícone/texto em tom acinzentado |
| Seleção concluída (trilha) | Ícone/badge em `Primary (#4A6B5A)` |
| Seleção atual (trilha) | Badge em `Accent (#3E5C66)`, sem animação de pulso — usar contorno mais forte ou leve aumento de escala estático |
| Seleção pulada (trilha) | Ícone/badge em cinza neutro, com traço leve indicando "pulada" |
| Seleção pendente (trilha) | Ícone/badge esmaecido (opacidade reduzida do texto principal, ex: `#1B1F1D` a 40%) |
| Erro cometido (input) | Borda do input em `Erro (#A6503F)` por instantes, sem shake exagerado nem sombra |
| Indicador de erro "gasto" (ícone de vida) | Ícone em cinza neutro (indicando que foi consumido) vs. `Primary` quando ainda disponível |
| Indicador de pulo "gasto" | Mesmo padrão do erro: cinza neutro quando usado, `Accent` quando disponível |

---

## 7. Espaçamento

Usar uma escala consistente de espaçamento (múltiplos de 4px), por exemplo:

`4px · 8px · 12px · 16px · 24px · 32px · 48px`

Evitar valores soltos fora dessa escala, para manter o ritmo visual entre
componentes.

---

## 8. Resumo de Tokens (referência rápida)

```
--color-primary: #4A6B5A;
--color-primary-dark: #324A3D;
--color-primary-light: #DCE6DF;
--color-accent: #3E5C66;
--color-error: #A6503F;
--color-text: #1B1F1D;
--color-bg: #FFFFFF;
--color-bg-secondary: #F4F5F3;
--color-border: #E2E5E2;

--radius-sm: 6px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-full: 999px;

--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 24px;
--space-6: 32px;
--space-7: 48px;
```

Nenhum token de `shadow` ou `blur` deve existir no sistema — reforça a decisão de
não utilizá-los em nenhum componente.
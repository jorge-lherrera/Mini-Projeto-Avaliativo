# Pokédex TypeScript Lite

## Sobre o projeto

O **Pokédex TypeScript Lite** é uma aplicação de linha de comando feita em Node.js com TypeScript que consulta dados de Pokémon na [PokeAPI](https://pokeapi.co/), transforma a resposta em um objeto simplificado e organiza os Pokémon em um catálogo local persistido em arquivo (`pc_box.json`).

A aplicação roda inteiramente pelo terminal, sem interface gráfica, e é controlada por um menu interativo.

## Objetivo

Praticar os principais conceitos do Módulo 01:

- Node.js e JavaScript no back-end
- TypeScript: tipos, interfaces, classes e tipagem de parâmetros/retornos
- arrays, objetos e métodos de array
- JSON e tipagem de respostas de API
- `fetch`, Promises e `async/await`
- tratamento de erros com `try/catch` e classes de erro customizadas
- arquitetura em camadas e injeção de dependências
- GitHub, GitFlow e Kanban

## Tecnologias utilizadas

- Node.js
- TypeScript
- tsx
- PokeAPI
- Git / GitHub

## Pré-requisitos

- Node.js 18+ (o projeto foi testado em Node 25)
- npm
- Git

## Como instalar

Clone o repositório:

```bash
git clone https://github.com/jorge-lherrera/Mini-Projeto-Avaliativo.git
```

Acesse a pasta do projeto:

```bash
cd Mini-Projeto-Avaliativo
```

Instale as dependências de desenvolvimento:

```bash
npm install
```

## Como executar

Em ambiente de desenvolvimento:

```bash
npm run dev
```

ou

```bash
npm run start
```

Para compilar o TypeScript para JavaScript (gera a pasta `dist/`):

```bash
npm run build
```

Ao iniciar, a aplicação exibe um menu:

```
=== Pokédex TypeScript Lite ===
1 - Buscar e adicionar Pokémon
2 - Listar catálogo
3 - Remover Pokémon por ID
0 - Sair
```

## Estrutura do projeto

```
.
├── src/
│   ├── main.ts                      # Ponto de entrada: instancia os serviços, injeta dependências e inicia o menu
│   ├── controllers/
│   │   └── TerminalController.ts    # Camada de UI: lê o terminal (readline) e orquestra os serviços
│   ├── services/
│   │   ├── PokeApiService.ts        # Integração externa: busca na PokeAPI com fetch e mapeia a resposta
│   │   └── BoxService.ts            # Persistência local: lê e grava o pc_box.json (fs/promises)
│   ├── models/
│   │   ├── Pokemon.ts               # Interfaces (PokemonApiResponse, PokemonResumo) e a classe CatalogoPokemon
│   │   └── CustomErrors.ts          # Classes de erro customizadas (APIError, LocalBoxError)
│   └── utils/
│       └── textFormatters.ts        # Funções puras de formatação de texto e mensagens
├── pc_box.json                      # Banco de dados local (array JSON)
├── tsconfig.json                    # Configuração do compilador TypeScript (strict mode)
└── package.json                     # Scripts e dependências
```

## Funcionalidades

- Buscar Pokémon por nome ou ID na PokeAPI
- Tratar erro de Pokémon inexistente sem quebrar a aplicação
- Transformar a resposta da API em um objeto simplificado
- Adicionar Pokémon ao catálogo local
- Impedir Pokémon duplicado (pelo mesmo `id`)
- Listar o catálogo
- Remover Pokémon por ID
- Persistir o catálogo em `pc_box.json`
- Exibir mensagens claras no terminal

## Exemplos de execução

### Busca válida

Entrada testada: `pikachu`

```
[OK] Pokémon encontrado: pikachu
[OK] pikachu adicionado ao catálogo.
```

Ao listar:

```
Catálogo atual:
#25 - pikachu | Tipos: electric | Altura: 4 | Peso: 60
#4 - charmander | Tipos: fire | Altura: 6 | Peso: 85
```

### Busca inválida

Entrada testada: `pokemon-inexistente`

```
[ERRO] Pokémon não encontrado: pokemon-inexistente
```

### Duplicidade

Entrada testada: adicionar `pikachu` duas vezes

```
[AVISO] pikachu já está no catálogo.
```

### Remoção

Entrada testada: remover ID `25`

```
[OK] Pokémon removido do catálogo.
```

Caso o ID não exista:

```
[AVISO] Nenhum Pokémon encontrado com esse ID.
```

## Conceitos aplicados

- **TypeScript / tipagem:** todas as funções, parâmetros e retornos são tipados (ex.: `buscar(nomeOuId: string): Promise<PokemonResumo | null>`).
- **Interfaces:** `PokemonApiResponse` descreve o JSON da PokeAPI e `PokemonResumo` representa o objeto simplificado usado na aplicação.
- **fetch e async/await:** o `PokeApiService` consulta a PokeAPI de forma assíncrona e trata a resposta JSON.
- **Tratamento de erros:** uso de `try/catch`, retorno de `null` para Pokémon inexistente e classes de erro customizadas (`APIError`, `LocalBoxError`).
- **Métodos de array:** `map` (mapear tipos), `some` (checar duplicidade), `filter` (remover por ID) e `forEach` (listar).
- **Classe `CatalogoPokemon`:** atributo privado `pokemons: PokemonResumo[]`, construtor que recebe a lista inicial e métodos `adicionar`, `remover` e `obterTodos`.
- **Arquitetura em camadas:** controllers, services, models e utils, com injeção de dependências no `main.ts`.

## Kanban

Link do quadro Kanban:

https://github.com/users/jorge-lherrera/projects/1/views/1

## Branches utilizadas

- `main`
- `develop`
- `feat/pokedex`
- `docs/readme`

## Melhorias futuras

- Exibir HP, ataque e defesa na listagem (já são mapeados no objeto)
- Filtrar o catálogo por tipo de Pokémon
- Adicionar testes automatizados
- Criar uma API própria com Express expondo o catálogo

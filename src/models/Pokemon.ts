export interface PokemonApiResponse {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: { type: { name: string } }[];
    stats: { base_stat: number; stat: { name: string } }[];
}

export interface PokemonResumo {
    id: number;
    nome: string;
    tipos: string[];
    altura: number;
    peso: number;
    hp: number;
    ataque: number;
    defesa: number;
}

export class CatalogoPokemon {
    private pokemons: PokemonResumo[];

    constructor(pokemons: PokemonResumo[] = []) {
        this.pokemons = pokemons;
    }

    adicionar(pokemon: PokemonResumo): boolean {
        const jaExiste = this.pokemons.some((p) => p.id === pokemon.id);
        if (jaExiste) {
            return false;
        }
        this.pokemons.push(pokemon);
        return true;
    }

    remover(id: number): boolean {
        const existe = this.pokemons.some((p) => p.id === id);
        if (!existe) {
            return false;
        }
        this.pokemons = this.pokemons.filter((p) => p.id !== id);
        return true;
    }

    obterTodos(): PokemonResumo[] {
        return [...this.pokemons];
    }
}

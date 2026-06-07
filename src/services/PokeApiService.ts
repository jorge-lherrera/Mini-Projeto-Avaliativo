import { PokemonApiResponse, PokemonResumo } from "../models/Pokemon";

export class PokeApiService {
    private readonly baseUrl = "https://pokeapi.co/api/v2/pokemon";

    async buscar(nomeOuId: string): Promise<PokemonResumo | null> {
        try {
            const resposta = await fetch(`${this.baseUrl}/${nomeOuId.toLowerCase()}`);

            if (!resposta.ok) {
                return null;
            }

            const data = (await resposta.json()) as PokemonApiResponse;
            return this.mapear(data);
        } catch (erro) {
            return null;
        }
    }

    private mapear(data: PokemonApiResponse): PokemonResumo {
        const tipos = data.types.map((t) => t.type.name);

        const buscarStat = (nome: string): number =>
            data.stats.find((s) => s.stat.name === nome)?.base_stat ?? 0;

        return {
            id: data.id,
            nome: data.name,
            tipos,
            altura: data.height,
            peso: data.weight,
            hp: buscarStat("hp"),
            ataque: buscarStat("attack"),
            defesa: buscarStat("defense"),
        };
    }
}

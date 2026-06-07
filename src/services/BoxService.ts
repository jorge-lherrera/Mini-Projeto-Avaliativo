import { readFile, writeFile } from "node:fs/promises";
import { PokemonResumo } from "../models/Pokemon";
import { LocalBoxError } from "../models/CustomErrors";

export class BoxService {
    private readonly caminho: string;

    constructor(caminho: string = "pc_box.json") {
        this.caminho = caminho;
    }

    async carregar(): Promise<PokemonResumo[]> {
        try {
            const conteudo = await readFile(this.caminho, "utf-8");
            const dados = JSON.parse(conteudo);
            return Array.isArray(dados) ? (dados as PokemonResumo[]) : [];
        } catch (erro) {
            throw new LocalBoxError("Não foi possível ler o arquivo pc_box.json.");
        }
    }

    async salvar(pokemons: PokemonResumo[]): Promise<void> {
        try {
            await writeFile(this.caminho, JSON.stringify(pokemons, null, 2), "utf-8");
        } catch (erro) {
            throw new LocalBoxError("Não foi possível gravar no arquivo pc_box.json.");
        }
    }
}

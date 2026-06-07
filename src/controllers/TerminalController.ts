import { createInterface, Interface } from "node:readline/promises";
import { PokeApiService } from "../services/PokeApiService";
import { BoxService } from "../services/BoxService";
import { CatalogoPokemon } from "../models/Pokemon";
import { ok, aviso, erro, formatarPokemon } from "../utils/textFormatters";

export class TerminalController {
    private readonly api: PokeApiService;
    private readonly catalogo: CatalogoPokemon;
    private readonly box: BoxService;
    private readonly rl: Interface;

    constructor(api: PokeApiService, catalogo: CatalogoPokemon, box: BoxService) {
        this.api = api;
        this.catalogo = catalogo;
        this.box = box;
        this.rl = createInterface({ input: process.stdin, output: process.stdout });
    }

    async iniciar(): Promise<void> {
        let executando = true;

        while (executando) {
            this.mostrarMenu();
            const opcao = await this.rl.question("Escolha uma opção: ");

            switch (opcao.trim()) {
                case "1":
                    await this.buscarEAdicionar();
                    break;
                case "2":
                    this.listar();
                    break;
                case "3":
                    await this.remover();
                    break;
                case "0":
                    executando = false;
                    break;
                default:
                    console.log(aviso("Opção inválida."));
            }
        }

        this.rl.close();
        console.log("Até logo!");
    }

    private mostrarMenu(): void {
        console.log("\n=== Pokédex TypeScript Lite ===");
        console.log("1 - Buscar e adicionar Pokémon");
        console.log("2 - Listar catálogo");
        console.log("3 - Remover Pokémon por ID");
        console.log("0 - Sair");
    }

    private async buscarEAdicionar(): Promise<void> {
        const entrada = (await this.rl.question("Nome ou ID do Pokémon: ")).trim();
        const pokemon = await this.api.buscar(entrada);

        if (pokemon === null) {
            console.log(erro(`Pokémon não encontrado: ${entrada}`));
            return;
        }

        console.log(ok(`Pokémon encontrado: ${pokemon.nome}`));

        const adicionado = this.catalogo.adicionar(pokemon);
        if (adicionado) {
            await this.box.salvar(this.catalogo.obterTodos());
            console.log(ok(`${pokemon.nome} adicionado ao catálogo.`));
        } else {
            console.log(aviso(`${pokemon.nome} já está no catálogo.`));
        }
    }

    private listar(): void {
        const pokemons = this.catalogo.obterTodos();

        if (pokemons.length === 0) {
            console.log(aviso("Catálogo vazio."));
            return;
        }

        console.log("\nCatálogo atual:");
        pokemons.forEach((p) => console.log(formatarPokemon(p)));
    }

    private async remover(): Promise<void> {
        const entrada = (await this.rl.question("ID do Pokémon a remover: ")).trim();
        const id = Number(entrada);

        if (Number.isNaN(id)) {
            console.log(aviso("ID inválido."));
            return;
        }

        const removido = this.catalogo.remover(id);
        if (removido) {
            await this.box.salvar(this.catalogo.obterTodos());
            console.log(ok("Pokémon removido do catálogo."));
        } else {
            console.log(aviso("Nenhum Pokémon encontrado com esse ID."));
        }
    }
}

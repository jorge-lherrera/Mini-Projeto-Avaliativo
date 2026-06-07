import { PokeApiService } from "./services/PokeApiService";
import { BoxService } from "./services/BoxService";
import { CatalogoPokemon, PokemonResumo } from "./models/Pokemon";
import { TerminalController } from "./controllers/TerminalController";
import { LocalBoxError } from "./models/CustomErrors";
import { erro } from "./utils/textFormatters";

async function main() {
    const api = new PokeApiService();
    const box = new BoxService();

    let dadosIniciais: PokemonResumo[] = [];
    try {
        dadosIniciais = await box.carregar();
    } catch (e) {
        if (e instanceof LocalBoxError) {
            console.log(erro(e.message));
        }
    }

    const catalogo = new CatalogoPokemon(dadosIniciais);
    const controller = new TerminalController(api, catalogo, box);

    await controller.iniciar();
}

main();

import { PokeApiService } from "./services/PokeApiService";

async function main() {
    const api = new PokeApiService();

    const pikachu = await api.buscar("pikachu");

    if (pikachu) {
        console.log(`[OK] Pokémon encontrado: ${pikachu.nome}`);
        console.log(
            `#${pikachu.id} - ${pikachu.nome} | Tipos: ${pikachu.tipos.join(", ")} | Altura: ${pikachu.altura} | Peso: ${pikachu.peso}`
        );
    } else {
        console.log("[ERRO] Pokémon não encontrado.");
    }
}

main();

import { PokemonResumo } from "../models/Pokemon";

export function ok(mensagem: string): string {
    return `[OK] ${mensagem}`;
}

export function aviso(mensagem: string): string {
    return `[AVISO] ${mensagem}`;
}

export function erro(mensagem: string): string {
    return `[ERRO] ${mensagem}`;
}

export function formatarPokemon(p: PokemonResumo): string {
    return `#${p.id} - ${p.nome} | Tipos: ${p.tipos.join(", ")} | Altura: ${p.altura} | Peso: ${p.peso}`;
}

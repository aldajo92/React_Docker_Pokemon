// Type definitions for Pokemon API responses
export interface Pokemon {
    id: number;
    name: string;
    sprites: {
        front_default: string;
        back_default?: string;
    };
    types: Array<{
        slot: number;
        type: {
            name: string;
            url: string;
        };
    }>;
    order: number;
    height: number;
    weight: number;
}

export interface PokemonListItem {
    name: string;
    url: string;
}

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListItem[];
}

export function getPokemon({ url }: { url: string }): Promise<Pokemon> {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(res => res.json())
            .then((data: Pokemon) => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export async function getAllPokemon(url: string): Promise<PokemonListResponse> {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(res => res.json())
            .then((data: PokemonListResponse) => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
} 
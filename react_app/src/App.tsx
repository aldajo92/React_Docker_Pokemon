import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getPokemon, getAllPokemon, Pokemon, PokemonListItem } from './Services/PokeService';
import PokemonList from './Pages/PokemonList';
import './App.css';

const App = () => {
    const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const apiURL: string = 'https://pokeapi.co/api/v2/pokemon';

    useEffect(() => {
        async function fetchData(): Promise<void> {
            try {
                const response = await getAllPokemon(apiURL);
                await loadPokemon(response.results);
                setLoading(false);
                console.log(response);
            } catch (error) {
                console.error('Error fetching Pokemon data:', error);
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const loadPokemon = async (data: PokemonListItem[]): Promise<void> => {
        try {
            const _pokemonData: Pokemon[] = await Promise.all(
                data.map(async (pokemon: PokemonListItem) => {
                    const pokemonGet = await getPokemon(pokemon);
                    return pokemonGet;
                })
            );
            setPokemonData(_pokemonData);
        } catch (error) {
            console.error('Error loading Pokemon details:', error);
        }
    };

    return (
        <>
            <Router>
                <div className='gridContainer'>
                    {loading ? <h1>Loading...</h1> : (
                        <Routes>
                            <Route path='/' element={
                                <>
                                    {pokemonData.map((pokemon: Pokemon, i: number) => {
                                        return <PokemonList key={i} pokemon={pokemon} />;
                                    })}
                                </>
                            } />
                        </Routes>
                    )}
                </div>
            </Router>
        </>
    );
};

export default App; 
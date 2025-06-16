import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getPokemon, getAllPokemon, Pokemon, PokemonListItem } from './Services/PokeService';
import PokemonList from './Pages/PokemonList';
import './App.css';

const App = () => {
    const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
    const [allPokemonList, setAllPokemonList] = useState<PokemonListItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const BATCH_SIZE = 20;
    const TOTAL_POKEMON = 150;

    // Fetch the initial list of 150 Pokemon
    useEffect(() => {
        async function fetchInitialData(): Promise<void> {
            try {
                const apiURL = `https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMON}`;
                const response = await getAllPokemon(apiURL);
                setAllPokemonList(response.results);

                // Load first batch
                await loadPokemonBatch(response.results, 0, BATCH_SIZE);
                setCurrentIndex(BATCH_SIZE);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Pokemon data:', error);
                setLoading(false);
            }
        }
        fetchInitialData();
    }, []);

    // Load Pokemon in batches
    const loadPokemonBatch = async (pokemonList: PokemonListItem[], startIndex: number, batchSize: number): Promise<void> => {
        try {
            const batch = pokemonList.slice(startIndex, startIndex + batchSize);
            const batchData: Pokemon[] = await Promise.all(
                batch.map(async (pokemon: PokemonListItem) => {
                    const pokemonGet = await getPokemon(pokemon);
                    return pokemonGet;
                })
            );

            setPokemonData(prevData => [...prevData, ...batchData]);
        } catch (error) {
            console.error('Error loading Pokemon batch:', error);
        }
    };

    // Load more Pokemon when scrolling
    const loadMorePokemon = useCallback(async () => {
        if (loadingMore || currentIndex >= allPokemonList.length) return;

        setLoadingMore(true);
        const remainingCount = Math.min(BATCH_SIZE, allPokemonList.length - currentIndex);
        await loadPokemonBatch(allPokemonList, currentIndex, remainingCount);
        setCurrentIndex(prev => prev + remainingCount);
        setLoadingMore(false);
    }, [allPokemonList, currentIndex, loadingMore]);

    // Scroll event handler
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
                loadMorePokemon();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadMorePokemon]);

    return (
        <>
            <Router>
                <div className='app-container'>
                    {loading ? (
                        <div className='loading-container'>
                            <h1>Loading Pokemon...</h1>
                        </div>
                    ) : (
                        <Routes>
                            <Route path='/' element={
                                <>
                                    <div className='pokemon-grid'>
                                        {pokemonData.map((pokemon: Pokemon, i: number) => {
                                            return <PokemonList key={pokemon.id} pokemon={pokemon} />;
                                        })}
                                    </div>
                                    {loadingMore && (
                                        <div className='loading-more'>
                                            <h3>Loading more Pokemon...</h3>
                                        </div>
                                    )}
                                    {currentIndex >= TOTAL_POKEMON && (
                                        <div className='end-message'>
                                            <h3>You've seen all {TOTAL_POKEMON} Pokemon!</h3>
                                        </div>
                                    )}
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
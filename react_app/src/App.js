import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { getPokemon, getAllPokemon } from './Services/PokeService'
import PokemonList from './Pages/PokemonList'
import './App.css';

function App() {
  const [pokemonData, setPokemonData] = useState([])
  const [loading, isLoading] = useState(true)
  const apiURL = 'https://pokeapi.co/api/v2/pokemon'

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(apiURL)
      await loadPokemon(response.results)
      isLoading(false)
      console.log(response)
    }
    fetchData()
  }, [])

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(data.map(async pokemon => {
      let pokemonGet = await getPokemon(pokemon)
      return pokemonGet
    }))
    setPokemonData(_pokemonData)
  }

  return (
    <>
      <Router>
        <div className='gridContainer'>
          {loading ? <h1>Loading...</h1> : (
            <Routes>
              <Route path='/' element={
                <>
                  {pokemonData.map((pokemon, i) => {
                    return <PokemonList key={i} pokemon={pokemon} />
                  })}
                </>
              } />
            </Routes>
          )}
        </div>
      </Router>
    </>
  );
}

export default App;

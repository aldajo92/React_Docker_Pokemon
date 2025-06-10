import React from 'react'
import Grid from '@mui/material/Grid'
import pokeColor from '../Pages/pokeColor'
import '../Assets/style.css'

function PokemonList({ pokemon }) {
    const gridStyle = {
        flexGrow: 1,
        padding: 16,
    };

    return (
        <>
            <div className='gridContainer'>
                <div style={gridStyle}>
                    <div className='pokeType' style={{ backgroundColor: pokeColor[pokemon.name] }}>

                        <img className='pokeImage' src={pokemon.sprites.front_default} alt='pokemon' />

                        <Grid container>
                            <Grid item xs={6}>
                                <div className='pokeName'>
                                    {pokemon.name}
                                </div>

                            </Grid>
                            <Grid item xs={6}>
                                <div className='pokeOwned'>
                                    <div># <span>{pokemon.order}</span></div>
                                </div>
                            </Grid>
                        </Grid>

                        <div className='pokeTypes'>
                            {
                                pokemon.types.map((type, i) => {
                                    return (
                                        <div className='pokeSkill' key={i}>
                                            {type.type.name}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PokemonList
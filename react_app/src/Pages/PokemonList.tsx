import React from 'react';
import { Pokemon } from '../Services/PokeService';
import pokeColor from '../Pages/pokeColor';
import '../Assets/style.css';

interface PokemonListProps {
    pokemon: Pokemon;
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemon }) => {
    const gridStyle: React.CSSProperties = {
        flexGrow: 1,
        padding: 16,
    };

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
    };

    const itemStyle: React.CSSProperties = {
        flex: 1,
    };

    return (
        <>
            <div className='gridContainer'>
                <div style={gridStyle}>
                    <div className='pokeType' style={{ backgroundColor: pokeColor[pokemon.name] }}>

                        <img className='pokeImage' src={pokemon.sprites.front_default} alt='pokemon' />

                        <div style={containerStyle}>
                            <div style={itemStyle}>
                                <div className='pokeName'>
                                    {pokemon.name}
                                </div>
                            </div>
                            <div style={itemStyle}>
                                <div className='pokeOwned'>
                                    <div># <span>{pokemon.order}</span></div>
                                </div>
                            </div>
                        </div>

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
    );
};

export default PokemonList; 
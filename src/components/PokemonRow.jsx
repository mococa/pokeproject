import React from 'react';

function PokemonRow({pokemonName, onClick}) {
    return (
        <div onClick={onClick} className="pokemon-row clickable">{pokemonName}</div>
    );
}

export default PokemonRow;
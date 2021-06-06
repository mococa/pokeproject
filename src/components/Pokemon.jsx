import React from 'react';

function Pokemon(props) {
    return (
        <div className="pokemon">
            <div className="poke-picture">
                <img src={props.pokedata.sprites.other['official-artwork'].front_default} alt=""/>
                <span>{props.pokedata.name}</span>
            </div>
            <div className="poke-info">
                <span>Weight: {props.pokedata.weight}</span>
                <span>Height: {props.pokedata.height}</span>
                <span>ID: {props.pokedata.id}</span>
                <span>Base XP: {props.pokedata.base_experience}</span>
            </div>

        </div>
    );
}

export default Pokemon;
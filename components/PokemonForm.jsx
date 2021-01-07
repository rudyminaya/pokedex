import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";

function PokemonForm(props) {
    const [pokemon, setPokemon] = useState('');

    const handleSubmit = event => {
        event.preventDefault()
        var pokemonLimpio = pokemon
        pokemonLimpio = pokemonLimpio.toLowerCase()
        pokemonLimpio = pokemonLimpio.trim()
        props.buscar(pokemonLimpio)
    }

    return (
        <form className="pokemon-form" onSubmit={handleSubmit}>
            <input
                className="pokemon-input"
                type="text"
                name="pokemon"
                placeholder="Enter Pokemon Name"
                onChange={e => setPokemon(e.target.value)}
                autoComplete="off" />
            {/* <span><FaSearch className="text-white text-xl" /></span> */}

            <input type="submit" className="pokemon-btn" value="" />

        </form>
    )

}

export default PokemonForm;
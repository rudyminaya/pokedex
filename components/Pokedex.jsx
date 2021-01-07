import estilos from '../styles/Pokedex.module.css';
import React, { useState, useEffect } from 'react';
import PokemonForm from './PokemonForm';

const Pokedex = () => {

    const [pokemon, setPokemon] = useState({
        nombre: "",
        peso: "",
        hp: "",
        tipo: "",
        habilidades: [],
        altura: "",
        imagen: "",
    })
    const [cargando, setCargando] = useState(false)
    const [busqueda, setBusqueda] = useState(null)

    useEffect(() => {
        if (!busqueda) {
            return
        }
        setCargando(true)
        fetch(`https://pokeapi.co/api/v2/pokemon/${busqueda}`)

            .then(respuesta => respuesta.json())
            .then(pokejson => {
                let puntosBase = pokejson.stats
                let hp = puntosBase.find((puntoBase) => puntoBase.stat.name === "hp")
                let habilidades = pokejson.abilities.map((habilidad) => habilidad.ability.name)

                let imagen = pokejson.sprites.other['official-artwork'].front_default || pokejson.sprites.other.dream_world.front_default || pokejson.sprites.front_default

                setPokemon({
                    imagen: imagen,
                    nombre: pokejson.name,
                    peso: pokejson.weight / 10,
                    altura: pokejson.height,
                    hp: hp.base_stat,
                    tipo: pokejson.types[0].type.name,
                    habilidades: habilidades
                })
                setCargando(false)
            })
            .catch(error => {
                console.log('no encontré el pokemon', error)
                setCargando(false)
            })
        //2do parametro del useEffect,[valor reactivo]
    }, [busqueda])

    return (
        <div className={estilos.fondo}>
            <PokemonForm buscar={setBusqueda} />
            {cargando ? <div className="flex justify-center text-9xl text-white my-5"><img src="/pokeball.png" className="animate-spin w-56 mt-10" /></div> :
                <div>
                    <div className={estilos.imagenPokemon}>
                        <img className="mx-auto mt-10 -mb-14" src={pokemon.imagen} alt="" />
                    </div>

                    <main className={estilos.cajaInfoPokemon}>
                        <section className={estilos.resumenPokemon}>
                            <h1 className=" font-bold text-2xl my-1 capitalize">{pokemon.nombre}</h1>
                            <div className="h-2 bg-gradient-to-l from-green-400 to-blue-400 w-40 rounded-3xl"></div>
                            <h6 className="font-medium">{`${pokemon.hp} / ${pokemon.hp} HP`}</h6>
                        </section>
                        <hr></hr>
                        <section className={estilos.medidasPokemon}>
                            <div>
                                <h1>{`${pokemon.peso} KG`}</h1>
                                <h3 className="text-gray-400 font-medium">weight</h3>
                            </div>

                            <div className="flex items-center justify-center">
                                <h1>{pokemon.tipo}</h1>
                            </div>

                            <div>
                                <h1 className="font-bold">{pokemon.altura}</h1>
                                <h3 className="text-gray-400 font-medium">HEIGHT</h3>
                            </div>
                        </section>
                        <hr></hr>
                        <h3 className="mb-3 uppercase font-bold text-center mt-5">Habilidades:</h3>

                        <section className={estilos.habilidadesPokemon}>
                            {pokemon.habilidades.map((poder, indice) => { return <h1 className={estilos.habilidad} key={indice}>{poder}</h1> })}

                        </section>
                    </main>
                </div>
            }

        </div>
    )

}

export default Pokedex;

/* export default class Pokedex extends Component { */
/*
    constructor(props) {
        super(props)

        this.state = {
            pokemon: {
                nombre: "",
                hp: "",
                peso: "",
                altura: "",
                tipo: "",
                habilidades: []
            },

            cargando: true,
        }
    }

    componentDidMount() {
        let pokemonName = "charizard"
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then(respuesta => respuesta.json())
            .then(pokejson => {
                let puntosBase = pokejson.stats
                let hp = puntosBase.find((puntoBase) => puntoBase.stat.name === "hp")
                let habilidades = pokejson.abilities.map((habilidad) => habilidad.ability.name)

                let imagen = pokejson.sprites.other['official-artwork'].front_default || pokejson.sprites.other.dream_world.front_default || pokejson.sprites.front_default

                this.setState({
                    pokemon: {
                        imagen: imagen,
                        nombre: pokejson.name,
                        peso: pokejson.weight,
                        altura: pokejson.height / 10,
                        hp: hp.base_stat,
                        tipo: pokejson.types[0].type.name,
                        habilidades: habilidades
                    },
                })
            })
    }

    render() {

    }
} */
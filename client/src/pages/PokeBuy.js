import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function PokeBuy() {

    const [query, setQuery] = useState('')
    const [pokemons, setPokemons] = useState([])

    const storedToken = localStorage.getItem('authToken')

    const handleSearch = event => {
        setQuery(event.target.value)
    }

    useEffect(() => {

        axios.get('/pokecards/pokemon', { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(response =>
                setPokemons(response.data.pokemons))

            .catch(err => console.log(err))
             // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let pokemonsList = pokemons.filter(pokemon =>
        `${pokemon.title}`.toLowerCase().includes(query)
    );

    return (
        <div>
            <h1>Hi PokeBuy</h1>
            <form>
                <label hmtlfor="search" placeholder='Search by Name'> Search Your Pokecard : </label>
                <input className='search-form' id="search"
                    type="text"
                    value={query}
                    onChange={handleSearch}
                />
            </form>
            {
                pokemonsList.map(pokemon => {
                    return <div className='pokecards' key={pokemon._id}>
                        <img className='box' src={pokemon.imageUrl} alt='' />
                        <h1 className='title-form'>{pokemon.title}</h1>
                        <p className='price'> {pokemon.price} $</p>
                        <p className='description'>{pokemon.description}</p>
                        <p className='pokecard-owner'>By:{pokemon.userId.name}
                            <button>click to chat</button></p>
                    </div>
                })
            }
        </div>
    )
}

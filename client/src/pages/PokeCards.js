import React from 'react'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/auth'
import { Link } from 'react-router-dom'


export default function PokeCards() {

    const { user } = useContext(AuthContext)

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [imageUrl, setImageUrl] = useState('')
    const [description, setDescription] = useState('')
    const [pokemons, setPokemons] = useState([])

    const storedToken = localStorage.getItem('authToken')

    const uploadImage = (file) => {
        return axios
            .post("/pokecards/upload", file, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(res => res.data)
    };


    const handleFileUpload = e => {
        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);

        uploadImage(uploadData)
            .then(response => {
                setImageUrl(response.secure_url);
            })
            .catch(err => console.log("Error while uploading the file: ", err));
    };

    const handleSubmit = e => {
        e.preventDefault()
        const requestBody = { title: title, description: description, price: price, imageUrl: imageUrl, userId: user._id }
        if (imageUrl === "") return
        axios.post('/pokecards/pokemon', requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })

            .then(() => {
                setTitle('')
                setPrice('')
                setImageUrl('')
                setDescription('')
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get('/pokecards/pokemon', { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(response =>
                setPokemons(response.data.pokemons))
            .catch(err => console.log(err))
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <h1> Add a Pokemon Card</h1>
            <form className='pokemon-form' onSubmit={handleSubmit}>
                <label hmtlfor="title"> Title : </label>
                <input id="title"
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}>
                </input>
                <label hmtlfor="price"> Price : </label>
                <input id="price"
                    type="Number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}>
                </input>
                <label hmtlfor="description"> Description : </label>
                <input className='input-description' id="description" placeholder=' write informations here'
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}>
                </input>

                <input className='file' id="file"
                    type="file"
                    name="imageUrl"
                    onChange={handleFileUpload}>

                </input>

                <button type='submit'>Add this Card</button>
            </form>
            {
                pokemons.map(pokemon => {
                    if (user && user._id === pokemon.userId._id) {
                        return <div className='pokecards' key={pokemon._id}>
                            <img className='box' src={pokemon.imageUrl} alt='' />
                            <h1 className='title-form'> {pokemon.title}</h1>
                            <p className='price'> {pokemon.price} $</p>
                            <p className='description'>{pokemon.description}</p>
                            <Link className='edit-btn' to={`/pokecards/edit/${pokemon._id}`}>
                                <button>Edit this PokeCard</button>
                            </Link>
                        </div>
                    } else return null
                })
            }

        </div>
    )
}

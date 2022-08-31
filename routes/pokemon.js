const router = require('express').Router()
const Pokemon = require('../models/Pokemon.model')
const { fileUploader, cloudinary } = require('../config/cloudinary.js');
const { isAuthenticated } = require('./../middleware/jwt.js')

router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  console.log(req.file.path)
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  res.json({ secure_url: req.file.path });
});

router.post('/pokemon', (req, res, next) => {
  const { title, price, imageUrl, userId, description  } = req.body
  console.log(req.body)
  Pokemon.create({
    title,
    price,
    imageUrl,
    userId,
    description,

  })
    .then((createdPokemon) => {
      console.log(createdPokemon)
      res.status(201).json({ createdPokemon });
    })
    .catch((err) => next(err))
})

router.get('/pokemon', (req, res, next) => {
  const {userId} = req.body
  
  console.log(req.body)
  
  Pokemon.find()
  .populate('userId')
    .then((pokemons) => {
      res.status(200).json({ pokemons })
    })
    
    .catch(err => res.status(400).json(err))
})

router.get('/:id', (req, res, next) => {
  Pokemon.findById(req.params.id)
    .then(pokemon => {
      if (!pokemon) {
        res.status(404).json(pokemon)
      } else {
        res.status(200).json(pokemon)
      }
    })
    .catch(err => next(err))
})

router.put('/:id', (req, res, next) => {
  const { title, price, imageUrl, userId, description } = req.body
  console.log('testing')
  Pokemon.findByIdAndUpdate(req.params.id, {
    title,
    price,
    imageUrl,
    description,
    userId
  }, { new: true })
    .then(updatedPokemon => {
      res.status(200).json(updatedPokemon)
    })
    .catch(err => next(err))
})


router.delete('/:id', (req, res, next) => {
  Pokemon.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ message: 'pokemon deleted' })
    })
})

module.exports = router;
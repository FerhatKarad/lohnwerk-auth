const { Schema, model, SchemaTypes } = require('mongoose')
const pokemonSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },

    description: String,

    imageUrl: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const Pokemon = model('Pokemon', pokemonSchema)
module.exports = Pokemon

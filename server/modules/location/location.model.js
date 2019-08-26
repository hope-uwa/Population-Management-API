import mongoose from 'mongoose'
const { Schema } = mongoose

const locationSchema = new Schema(
  {
    region: {
      type: String,
      ref: 'Location'
    },
    name: {
      type: String

    },
    male: {
      type: Number

    },
    female: {
      type: Number

    },
    total: {
      type: Number

    },
    subLocations: [{
      type: String,
      ref: 'Location'
    }],
    territories: [{
      type: String,
      ref: 'Location'
    }]
  },
  { timestamps: false }
)

const locationModel = mongoose.model('Location', locationSchema)

export { locationModel }

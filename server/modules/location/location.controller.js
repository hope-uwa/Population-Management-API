/* eslint-disable new-cap */
import { locationModel } from './location.model'
import { httpStatus } from '../../utils/httpStatus'
import { normalize, schema } from 'normalizr'

/**
 *
 *
 * @class Location
 */
class Location {
  /**
 *
 *
 * @static
 * @param {*} res
 * @param {*} req
 * @returns
 * @memberof Location
 */
  static async getALocation (req, res) {
    const { locationId } = req.params
    console.log({ locationId })
    const location = await locationModel.findOne({ _id: locationId })

    if (!location) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({
          success: false,
          message: 'The location does not exist'
        })
    }

    return res.status(httpStatus.OK).json({
      success: true,
      data: location
    })
  }

  /**
 *
 * @method index
 * @description fetches all sublocations
 * @static
 * @param {*} req
 * @param {*} res
 * @returns
 * @memberof Location
 */
  static async index (req, res) {
    const { locationId } = req.params
    try {
      let locations = await locationModel.find({ _id: locationId })

      const nodeSchema = new schema.Entity('locations', { _id: 'subLocations' })

      const normalized = normalize(locations, nodeSchema)
      console.log({ normalized })
      locations = Object.values(normalized.entities.locations)

      // The recursive function to build the tree
      const makeTree = (id) => {
        return Object.assign({}, locations[0][id], {
          subLocations: locations[id].subLocations.map()
        })
      }

      // const tree = await makeTree(locationId)

      return res.json({ data: locations })
    } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({
          success: false,
          message: 'Internal Server Error',
          error
        })
    }
  }

  /**
  *
  *
  * @static
  * @param {*} req
  * @param {*} res
  * @returns
  * @memberof Location
  */
  static async createLocation (req, res) {
    const { name, male, female, region } = req.body
    const total = Number(male) + Number(female)
    try {
      const parentLocation = await locationModel.findOne({ region })
      const locationExist = await locationModel.findOne({ name })
      if (locationExist && parentLocation && locationExist.subLocations.includes(parentLocation.name)) {
        return res.status(httpStatus.FORBIDDEN)
          .json({
            success: false,
            error: 'the location already exist'
          })
      }
      const newPlace = new locationModel({
        region,
        name,
        male: Number(male),
        female: Number(female),
        total,
        territories: parentLocation ? parentLocation.territories.concat('' + parentLocation.name) : []
      })
      console.log('========')
      const newLocation = await newPlace.save()

      parentLocation && await locationModel.update({ name: parentLocation.name }, {
        $push: { subLocations: newLocation.name }
      }).exec()
      return res.status(httpStatus.CREATED).json({
        message: 'location information added successfully', data: newLocation })
    } catch (e) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({
          success: false,
          error: 'Internal Server Error'
        })
    }
  }

  /**
  *
  *
  * @static
  * @param {*} req
  * @param {*} res
  * @returns
  * @memberof Location
  */
  static async updateLocation (req, res) {
    const { locationId } = req.params
    const { male, female } = req.body
    try {
      let location = await locationModel.findOne({ _id: locationId })

      if (Number(male) === location.male && Number(female) === location.female) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR)
          .json({
            success: false,
            message: 'Same input with the database, please update input' })
      }
      const newMaleCount = male ? Number(male) : location.male
      const newFemaleCount = female ? Number(female) : location.female
      const total = newMaleCount + newFemaleCount
      await locationModel.updateOne({ _id: locationId }, {
        male: newMaleCount,
        female: newFemaleCount,
        total
      })
      return res.status(httpStatus.OK)
        .json({
          success: true,
          message: 'location information updated successfully',
          data: { id: locationId,
            name: location.name,
            male: newMaleCount,
            female: newFemaleCount }
        })
    } catch (e) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({
          success: false,
          error: 'Internal Server Error'
        })
    }
  }

  /**
 *s
 *
 * @static
 * @param {*} req
 * @param {*} res
 * @returns
 * @memberof Location
 */
  static async deleteLocation (req, res) {
    const { locationId } = req.params
    console.log({ locationId })
    try {
      const location = await locationModel.findOne({ _id: locationId })
      if (location) {
        console.log({ location })
        await locationModel.deletOne({
          _id: location._id
        })
        return res.status(httpStatus.CONTINUE)
          .json({
            success: true,
            message: 'location has been deleted successfully'
          })
      }
      return res.status(httpStatus.NOT_FOUND)
        .json({
          success: true,
          message: 'location has been deleted previously'
        })
    } catch (e) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({
          success: true,
          error: 'Internal Server Error'
        })
    }
  }
}

export default Location

import Listing from "../models/listing.model.js";
import { errorHandler } from "../utlis/error.js";

export const createListing = async (req, res, next) => {
    try {
      const listing = await Listing.create(req.body);
      return res.status(201).json(listing);
    } catch (error) {
      next(error);
    }
  };


  export const deleteListing = async (req,res,next)=>{

    const listing = await Listing.findById(req.params.id);

    if(!listing){

      return next(errorHandler(404,'Listing not found'));


    }


    if(req.user.id !== listing.userRef){

      return next(errorHandler(401,'You can only delete your own listings!'))
    }


    try {

      await Listing.findByIdAndDelete(req.params.id)
      res.status(200).json('Listing has been deleted')
      
    } catch (error) {
      next(error)
    }

    
  }



  export const updateListing = async (req,res,next)=>{

    const listing = await Listing.findById(req.params.id);

    if(!listing){
      return next(errorHandler(404,'Listing not found'));
    }

    if(req.user.id !== listing.userRef){
      return next(errorHandler(401,'You can only update your own listings'))
    }

    try {

    const updatedListing = await Listing.findByIdAndUpdate(

      req.params.id,
      req.body,
      {new:true}



    );

    res.status(200).json(updatedListing);
      
    } catch (error) {
      next(error)
    }
      


  }


  export const getListing =  async (req,res,next)=>{

    try {

      const listing = await Listing.findById(req.params.id)

      if(!listing){
        return next(errorHandler(404,'Listing not found'))
      }

      res.status(200).json(listing);
      
    } catch (error) {

      next(error);
      
    }



  }



  export const getListings = async (req, res, next) => {
    try {
      // Destructure query parameters with defaults
      const {
        limit = 9,
        startIndex = 0,
        offer = 'all',
        furnished = 'all',
        parking = 'all',
        type = 'all',
        searchTerm = '',
        sort = 'createdAt',
        order = 'desc',
      } = req.query;
  
      // Handle conditions for `offer`, `furnished`, `parking`, and `type`
      const offerCondition = offer === 'all' ? { $in: [false, true] } : offer;
      const furnishedCondition = furnished === 'all' ? { $in: [false, true] } : furnished;
      const parkingCondition = parking === 'all' ? { $in: [false, true] } : parking;
      const typeCondition = type === 'all' ? { $in: ['sale', 'rent'] } : type;
  
      // Query the database
      const listings = await Listing.find({
        name: { $regex: searchTerm, $options: 'i' },
        offer: offerCondition,
        furnished: furnishedCondition,
        parking: parkingCondition,
        type: typeCondition,
      })
        .sort({ [sort]: order })
        .limit(parseInt(limit))
        .skip(parseInt(startIndex));
  
      return res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  };
  


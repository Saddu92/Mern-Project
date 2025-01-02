import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing= async(req,res , next)=>{
    try {
        const listings = await Listing.create(req.body);
        return res.status(201).json(listings);

    } catch (error) {
        next(error);
    }
}

export const deleteListing = async(req,res,next)=>{
const listing = await Listing.findById(req.params.id);
if(!listing){
    return next(errorHandler(404, 'Listing not found'));
}
if(req.user.id !== listing.userRef){
    return next(errorHandler(401, 'You can only delete your own listing'));
}

try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted');
} catch (error) {
    next(error);
}
};

export const updateListing = async(req,res,next)=>{
    const listing = await Listing.findById(req.params.id);
    if(!listing){
        return next(errorHandler(404, 'Listing not found!'));
    }
    if(req.user.id!==listing.userRef){
        return next(errorHandler401,'You can only update your own listing!');

    }
    try {
        const updateListing = await Listing.findById(
            req.params.id,
            req.body,
            {new:true} // To return the new update value
        );
        res.status(200).json(updateListing);
    } catch (error) {
        next(error);
    }
}
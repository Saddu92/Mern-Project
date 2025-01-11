import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { list } from "postcss";

export default function ListingItem({ listings }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listings._id}`}>
        <img
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
          src={listings.imagesUrls[0]}
          alt="Listing Cover"
        />

        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="text-lg font-semibold text-slate-700 truncate w">
            {listings.name}
          </p>
          <div className="flex items-center gap-1 ">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-700 w-full">{listings.address}</p>
          </div>

          <p className="text-sm text-gray-600 line-clamp-3 ">
            {listings.description}
          </p>

          <p className="text-slate-500 mt-2 font-semibold">
            {listings.offer
              ? listings.discountPrice.toLocaleString("en-US")
              : listings.regularPrice.toLocaleString("en-US")}

              {listings.type==='rent' && '/month'}
          </p>

          <div className="text-slate-700 flex gap-4">
            <div className=" font-bold text-xs ">
                {listings.bedrooms>1 ? `${listings.bedrooms} beds` :  `${listings.bedrooms} beds`}
            </div>
            <div className=" font-bold text-xs ">
                {listings.bathrooms>1 ? `${listings.bathrooms} bathrooms` :  `${listings.bathrooms} bathrooms`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

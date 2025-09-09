import { Market } from "./market.model.js"

export const postMarket = async (data) => {
    return await Market.create(data);
}

export const getMarketListings = async () => {
    const listings = await Market.find().populate("userId", "name email phone").lean();
    return listings.map(listing => ({
        ...listing,
        name: listing.userId?.name,
        email: listing.userId?.email,
        phone: listing.userId?.phone,
        date: listing.date,
    }));
}

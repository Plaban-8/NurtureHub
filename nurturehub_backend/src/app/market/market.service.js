import { postMarket, getMarketListings } from "./market.repo.js";

export const postMarketService = async (data) => {
    try {
        await postMarket(data);
        return { success: true,};
    } catch (error) {
        console.log(error);
        return { success: false, error: error.message };
    }
}

export const getMarketListingService = async () => {
    try {
        const listings = await getMarketListings();
        return {
            data: listings,
            success: true
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            error: error.message
        }
    }
}
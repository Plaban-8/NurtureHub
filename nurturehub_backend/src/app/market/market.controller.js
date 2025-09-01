import { Router } from "express";
import { authenticate } from "../auth/auth.middleware.js";
import {postMarketService, getMarketListingService} from "./market.service.js"

export const marketController = Router();

marketController.post('/', authenticate, async (req, res) => {
  const data = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    photo: req.body.photo,
    userId: req.id
  }

  try{
    const response = await postMarketService(data);
    if (response.success){
        res.status(201).json({
            message: "Posted in MarketPlace"
        });
    }else{
        res.status(400).json({ error: response.error });
    }
  }catch(err){
    console.log(err)
      res.status(500).json({ error: err.message });
  }
});

marketController.get('/', async (req, res) => {
  try {
    const listings = await getMarketListingService();
    if (!listings.success) {
      return res.status(400).json({ error: listings.error });
    }
    res.status(200).json({ data: listings.data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

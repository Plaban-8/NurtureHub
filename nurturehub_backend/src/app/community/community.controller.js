import { Router } from "express";
import { authenticate } from "../auth/auth.middleware.js";
import { getAllPostsService, postService } from "./community.service.js";

export const communityController = Router();

communityController.post("/", authenticate, async (req, res) => {
  const id = req.id;
  const data = {
    content: req.body.content,
    photo: req.body.photo,
    userId: id,
  };

  try {
    const response = await postService(data);
    if (response.success) {
      res.status(200).json({
        message: "Post created successfully",
      });
    } else {
      res.status(400).json({
        message: "Failed to create post",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

communityController.get("/", async (req, res) => {
  try {
    const response = await getAllPostsService();
    console.log(response.data)
    if (response.success) {
      res.status(200).json({
        data: response.data,
      });
    }else{
      res.status(400).json({
        message: "failed in controller"
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "server error"
    })
  }
});

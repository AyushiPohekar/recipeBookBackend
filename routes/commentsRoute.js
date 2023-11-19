import express from "express";
import { createComment, toggleLike } from "../controllers/commentController.js";
//router object
const router = express.Router();

// Create a new comment
router.post('/comments',createComment );
// Route to toggle like/dislike for a recipe
router.post('/toggle-like', toggleLike);


// Other comment routes (update, delete, etc.) can be added similarly
export default router;
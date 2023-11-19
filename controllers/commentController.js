import Comment from "../models/Comment.js";
import reciepe from "../models/reciepe.js";
import usersModel from "../models/usersModel.js";

export const createComment = async (req, res) => {
  try {
    const { text, recipeId,createdBy } = req.body;
  

    const newComment = await Comment.create({
      text,
      createdBy,
      recipeId,
    });

    // Add comment ID to the recipe's comments array
    await reciepe.findByIdAndUpdate(recipeId, {
      $push: { comments: newComment._id },
    });
    await usersModel.findByIdAndUpdate(createdBy, {
        $addToSet: { commentedRecipes: recipeId }, // Use addToSet to avoid duplicates
      });

    res
      .status(201)
      .json({ message: "Comment created successfully", comment: newComment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};





export const toggleLike = async (req, res) => {
    try {
        const { recipeId, userId } = req.body;

        // Check if the user exists
        const user = await usersModel.findById(userId);
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Initialize likedRecipes as a Set or convert it to a Set
        if (!user.likedRecipes || !Array.isArray(user.likedRecipes)) {
          user.likedRecipes = [];
        } else {
          user.likedRecipes = [...new Set(user.likedRecipes)];
        }
    
        // Check if the recipe is already liked by the user
        const alreadyLiked = user.likedRecipes.includes(recipeId);
    
        if (alreadyLiked) {
          // If already liked, remove the like
          user.likedRecipes = user.likedRecipes.filter(id => id !== recipeId);
        } else {
          // If not liked, add the like
          user.likedRecipes.push(recipeId);
        }
    
        // Update user's liked recipes
        await user.save();

        const recipe = await reciepe.findById(recipeId);

        if (!recipe) {
          return res.status(404).json({ message: 'Recipe not found' });
        }
    
        // Check if the user has already liked the recipe
        const alreadyLikedIndex = recipe.likes.indexOf(userId);
    
        if (alreadyLikedIndex === -1) {
          // If user hasn't liked, add user ID to likedBy field in recipe
          recipe.likes.push(userId);
        } else {
          // If user already liked, remove user ID from likedBy field in recipe
          recipe.likes.splice(alreadyLikedIndex, 1);
        }
    
        // Update the recipe's likedBy field
        await recipe.save();
    
  
      res.status(200).json({ message: 'Like toggled successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  


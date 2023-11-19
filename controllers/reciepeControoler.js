import reciepe from "../models/reciepe.js";
import usersModel from "../models/usersModel.js";
import Comment from "../models/Comment.js";

export const createRecipe = async (req, res) => {
    try {
      const {
        title,
        ingredients,
        instructions,
        image,
        preparationTime,
        categories,
        createdBy
      } = req.body;
      
    
  
      const newRecipe = await reciepe.create({
        title,
        ingredients,
        instructions,
        image,
        preparationTime,
        categories,
        createdBy,
      });
  
      res.status(201).json({ message: 'Recipe created successfully', recipe: newRecipe });
    } catch (err) {
        console.log(err)
      res.status(500).json({ error: err.message });
    }
  };

  export const getAllRecipes = async (req, res) => {
    try {
      const recipes = await reciepe.find()
       
  
      res.status(200).json(recipes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


  export const getRecipeById = async (req, res) => {
    try {
      const { recipeId } = req.params;
  
      const recipe = await reciepe.findById(recipeId).populate("comments");
  
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
  
      res.status(200).json(recipe);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


  
 
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
      createdBy,
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

    res
      .status(201)
      .json({ message: "Recipe created successfully", recipe: newRecipe });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await reciepe.find().populate("comments");

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
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteRecipe = async (req, res) => {
  const { recipeId } = req.params;

  try {
    const deletedRecipe = await reciepe.findByIdAndDelete(recipeId);
    console.log(deletedRecipe);
    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    await usersModel.updateMany(
      { likedRecipes: recipeId },
      { $pull: { likedRecipes: recipeId } }
    );

    await usersModel.updateMany(
      { comments: { $in: [recipeId] } },
      { $pull: { comments: recipeId } }
    );

    res
      .status(200)
      .json({ message: "Recipe deleted successfully", deletedRecipe });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const {
      title,
      ingredients,
      instructions,
      image,
      preparationTime,
      categories,
      createdBy,
    } = req.body;

    const existingRecipe = await reciepe.findById(recipeId);

    if (!existingRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    existingRecipe.title = title;
    existingRecipe.ingredients = ingredients;
    existingRecipe.instructions = instructions;
    existingRecipe.image = image;
    existingRecipe.preparationTime = preparationTime;
    existingRecipe.categories = categories;
    existingRecipe.createdBy = createdBy;

    const updatedRecipe = await existingRecipe.save();

    res
      .status(200)
      .json({ message: "Recipe updated successfully", recipe: updatedRecipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

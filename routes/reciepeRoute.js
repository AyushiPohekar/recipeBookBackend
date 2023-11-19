import express from "express";
import { createRecipe, deleteRecipe, editRecipe, getAllRecipes, getRecipeById} from "../controllers/reciepeControoler.js";



const router = express.Router();


router.post('/createRecipe', createRecipe);


router.get('/getAllreciepes',getAllRecipes );
router.get('/getreciepeByid/:recipeId',getRecipeById );
router.delete('/deleterecipe/:recipeId',deleteRecipe );
router.put('/editrecipe/:recipeId',editRecipe );




export default router;
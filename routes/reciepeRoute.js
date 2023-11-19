import express from "express";
import { createRecipe, getAllRecipes, getRecipeById} from "../controllers/reciepeControoler.js";



const router = express.Router();


router.post('/createRecipe', createRecipe);


router.get('/getAllreciepes',getAllRecipes );
router.get('/getreciepeByid/:recipeId',getRecipeById );




export default router;
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: {},
      required: true,
    },
    answer: {
      type:String,
      required: true,
    },
    commentedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
  
    // Array to store IDs of recipes the user has liked
    likedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});



export default mongoose.model("Comment", commentSchema);

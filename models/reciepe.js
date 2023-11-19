import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    ingredients: { type: [String], required: true },
    instructions: { type: [String], required: true },
    image: String,
    preparationTime: Number,
    categories: { type: [String], default: [] },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
  },

  { timestamps: true }
);

export default mongoose.model("recipes", recipeSchema);

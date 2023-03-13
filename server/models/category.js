import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    categoryType: {
      type: String,
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
      default: "expense",
      enum: ["expense", "income"],
    },
  },
  {
    timestamps: true,
  }
);


const model = mongoose.model("Category", schema);

export default model;
 

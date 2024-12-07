import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

export const TopicModel =
  mongoose.models.Topics || mongoose.model("Topics", topicSchema);

// models/Project.ts
import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  title: { type: String, required: true },
  description: String,
  link: { type: String, required: true },
  category: { type: String, required: true },

  // Evaluation Scores
  functionalityScore: { type: Number, default: 0 },   // e.g., 0 - 10
  creativityScore: { type: Number, default: 0 },
  technicalScore: { type: Number, default: 0 },
  marketingScore: { type: Number, default: 0 },

  // Total Score
  totalScore: { type: Number, default: 0 },
});

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);

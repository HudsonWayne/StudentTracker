import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  title: String,
  description: String,
  link: String,
  category: String,
  originalityScore: Number,
});

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);

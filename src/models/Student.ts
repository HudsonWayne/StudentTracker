import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  specialization: String,
  bio: String,
  avatarUrl: String,
  projectLink: String, // main latest project link
  originalityScore: Number, // latest score
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }], // list of projects
});

export default mongoose.models.Student || mongoose.model("Student", StudentSchema);

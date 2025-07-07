import mongoose, { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema({
  title: String,
  description: String,
  link: String,
  category: String,
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "Student",
  },
  score: Number,
});

export default models.Project || model("Project", ProjectSchema);

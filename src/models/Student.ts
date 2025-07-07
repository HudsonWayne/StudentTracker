import mongoose, { Schema, model, models } from "mongoose";

const StudentSchema = new Schema({
  name: String,
  email: String,
  specialization: String,
  employed: Boolean,
  employer: String,
  bio: String,
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
  avatarUrl: String,
});

export default models.Student || model("Student", StudentSchema);

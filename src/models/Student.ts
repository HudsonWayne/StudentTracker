import mongoosePkg from "mongoose";
const { Schema, model, models } = mongoosePkg;

const StudentSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    specialization: { type: String },
    employed: { type: Boolean, default: false },
    employer: { type: String },
    bio: { type: String },
    avatarUrl: { type: String },
    projects: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Student = models.Student || model("Student", StudentSchema);

export default Student;

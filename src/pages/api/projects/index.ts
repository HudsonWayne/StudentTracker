import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";
import Project from "@/models/Project";
import Student from "@/models/Student";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      const projects = await Project.find({}).populate("studentId");
      return res.status(200).json({ success: true, data: projects });

    case "POST":
      try {
        const { email, title, description, link, category } = req.body;

        // Find student by email
        const student = await Student.findOne({ email });

        if (!student) {
          return res.status(404).json({ success: false, error: "Student with this email not found." });
        }

        // Simulated originality score
        const originalityScore = Math.floor(Math.random() * 40) + 60; // 60–100

        // Create project and associate with student
        const project = await Project.create({
          studentId: student._id,
          title,
          description,
          link,
          category,
          originalityScore,
        });

        // Update student document
        student.projectLink = link;
        student.originalityScore = originalityScore;

        // If you want to store multiple projects
        if (!student.projects) {
          student.projects = [];
        }
        student.projects.push(project._id);

        await student.save();

        return res.status(201).json({ success: true, data: project });
      } catch (error) {
        console.error("Project submission error:", error);
        return res.status(400).json({ success: false, error: error.message });
      }

    default:
      return res.status(400).json({ success: false, error: "Unsupported method" });
  }
}

// File: /pages/api/projects/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";
import Project from "@/models/Project";
import Student from "@/models/Student";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const projects = await Project.find({}).populate("studentId", "name email");
        res.status(200).json({ success: true, data: projects });
      } catch (error) {
        res.status(500).json({ success: false, error });
      }
      break;

    case "POST":
      try {
        const { title, description, studentId } = req.body;

        // Simple validation
        if (!title || !studentId) {
          return res.status(400).json({ success: false, message: "Title and studentId are required" });
        }

        const project = await Project.create({ title, description, studentId });

        // Link project to student
        await Student.findByIdAndUpdate(studentId, {
          $push: { projects: project._id },
        });

        res.status(201).json({ success: true, data: project });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    default:
      res.status(405).json({ success: false, message: "Method Not Allowed" });
      break;
  }
}

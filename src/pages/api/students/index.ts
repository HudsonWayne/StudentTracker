// /pages/api/students/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";
import Student from "@/models/Student";
import Project from "@/models/Project";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const students = await Student.find({});

        // For each student, calculate total project score
        const studentsWithScores = await Promise.all(
          students.map(async (student) => {
            const projects = await Project.find({ studentId: student._id });
            const totalScore = projects.reduce(
              (acc, proj) => acc + (proj.originalityScore || 0),
              0
            );

            return {
              ...student.toObject(),
              totalScore,
            };
          })
        );

        res.status(200).json({ success: true, data: studentsWithScores });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error });
      }
      break;

    case "POST":
      try {
        const student = await Student.create(req.body);
        res.status(201).json({ success: true, data: student });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    default:
      res.status(405).json({ success: false, message: "Method Not Allowed" });
      break;
  }
}

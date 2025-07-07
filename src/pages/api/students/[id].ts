import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";
import Student from "@/models/Student";
import Project from "@/models/Project";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const student = await Student.findById(id).populate("projects");
        if (!student) return res.status(404).json({ success: false, message: "Student not found" });
        res.status(200).json({ success: true, data: student });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}

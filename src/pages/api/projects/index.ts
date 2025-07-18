// /pages/api/projects/rankings.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";
import Project from "@/models/Project";
import Student from "@/models/Student";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({ success: false, message: "Category is required" });
    }

    // Get projects in category, sort by totalScore descending
    const projects = await Project.find({ category })
      .populate("studentId", "name email")
      .sort({ totalScore: -1 });

    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}

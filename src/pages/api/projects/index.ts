import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";
import Project from "@/models/Project";
import Student from "@/models/Student";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      const projects = await Project.find({});
      res.status(200).json({ success: true, data: projects });
      break;
    case "POST":
      try {
        const project = await Project.create(req.body);
        await Student.findByIdAndUpdate(req.body.studentId, { $push: { projects: project._id } });
        res.status(201).json({ success: true, data: project });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}

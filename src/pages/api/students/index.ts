import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";
import Student from "@/models/Student";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      const students = await Student.find({});
      res.status(200).json({ success: true, data: students });
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
      res.status(400).json({ success: false });
      break;
  }
}

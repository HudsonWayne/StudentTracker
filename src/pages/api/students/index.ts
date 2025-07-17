// File: /pages/api/students/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";
import Student from "@/models/Student";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const students = await Student.find({});
        res.status(200).json({ success: true, data: students });
      } catch (error) {
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

import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";
import Student from "@/models/Student";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const students = await Student.find({});
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ message: "Error fetching students", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

import { GetServerSideProps } from "next";
import { connectDB } from "@/lib/db";
import Student from "@/models/Student";
import Project from "@/models/Project";

interface StudentProps {
  students: {
    _id: string;
    name: string;
    email: string;
    specialization: string;
    employed: boolean;
    employer?: string;
    bio?: string;
    avatarUrl?: string;
    projects: { _id: string; title: string; link: string }[];
  }[];
}

export default function StudentsPage({ students }: StudentProps) {
  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">🚀 Our Students</h1>
      <ul className="space-y-6">
        {students.map((student) => (
          <li key={student._id} className="border p-4 rounded shadow hover:shadow-md transition">
            {student.avatarUrl && (
              <img
                src={student.avatarUrl}
                alt={`${student.name}'s avatar`}
                className="w-24 h-24 rounded-full mb-4 object-cover"
              />
            )}
            <h2 className="text-xl font-semibold">{student.name}</h2>
            <p className="text-gray-600">Specialization: {student.specialization}</p>
            <p className="text-gray-600">Email: {student.email}</p>
            <p className="text-gray-600">Employed: {student.employed ? "✅ Yes" : "❌ No"}</p>
            {student.employed && <p className="text-gray-600">Employer: {student.employer}</p>}
            {student.bio && <p className="text-gray-600">Bio: {student.bio}</p>}
            {student.projects.length > 0 && (
              <div className="mt-2">
                <p className="font-semibold">Projects:</p>
                <ul className="list-disc list-inside">
                  {student.projects.map((proj) => (
                    <li key={proj._id}>
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        {proj.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  await connectDB();
  const students = await Student.find().populate("projects").lean();
  return {
    props: {
      students: JSON.parse(JSON.stringify(students)),
    },
  };
};

import { GetServerSideProps } from "next";
import { useState } from "react";
import dbConnect from "@/lib/db";
import Student from "@/models/Student";

interface StudentType {
  _id: string;
  name: string;
  email: string;
  specialization: string;
  employed: boolean;
  employer?: string;
  bio?: string;
  avatarUrl?: string;
  projects: { _id: string; title: string; link: string }[];
}

interface Props {
  students: StudentType[];
}

export default function StudentsPage({ students }: Props) {
  const [filter, setFilter] = useState<string>("All");

  const filteredStudents = students.filter((student) => {
    if (filter === "All") return true;
    return student.specialization === filter;
  });

  return (
    <main className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-blue-700 text-center">🚀 Our Students</h1>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-4 mb-10 justify-center">
        {["All", "Software Development", "UX/UI Design", "Digital Marketing"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-full border font-medium ${
              filter === type ? "bg-blue-600 text-white" : "bg-white text-blue-600 border-blue-600"
            } hover:bg-blue-500 hover:text-white transition`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredStudents.map((student) => (
          <div
            key={student._id}
            className="bg-white border rounded-lg shadow hover:shadow-xl transition p-6 flex flex-col items-center text-center"
          >
            <img
              src={student.avatarUrl || "https://i.pravatar.cc/150"}
              alt={student.name}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <h2 className="text-xl font-bold mb-1">{student.name}</h2>
            <p className="text-blue-600 font-medium mb-2">{student.specialization}</p>
            <p className="text-gray-500 mb-4 line-clamp-3">{student.bio || "No bio available."}</p>
            {student.projects.length > 0 ? (
              <a
                href={`#projects-${student._id}`}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition mt-auto"
              >
                View Projects
              </a>
            ) : (
              <p className="text-gray-400 text-sm">No projects yet</p>
            )}
          </div>
        ))}
      </div>

      {/* Projects Sections */}
      {filteredStudents.map((student) =>
        student.projects.length > 0 ? (
          <section key={student._id} id={`projects-${student._id}`} className="mt-12">
            <h3 className="text-2xl font-bold mb-4 text-green-700">{student.name}'s Projects</h3>
            <ul className="list-disc list-inside">
              {student.projects.map((proj) => (
                <li key={proj._id}>
                  <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    {proj.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null
      )}
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  await dbConnect();
  const students = await Student.find().populate("projects").lean();
  return {
    props: {
      students: JSON.parse(JSON.stringify(students)),
    },
  };
};

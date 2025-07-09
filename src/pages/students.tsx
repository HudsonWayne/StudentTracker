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
    <main className="p-8 max-w-7xl mx-auto bg-gradient-to-b from-blue-50 via-white to-green-50 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-blue-700 text-center">🚀 Meet Our Talented Students</h1>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-4 mb-10 justify-center">
        {["All", "Software Development", "UX/UI Design", "Digital Marketing"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-5 py-2 rounded-full border-2 font-medium transition shadow ${
              filter === type ? "bg-blue-600 text-white border-blue-600" : "bg-white text-blue-600 border-blue-600"
            } hover:bg-blue-500 hover:text-white`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Students */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredStudents.map((student) => (
          <div
            key={student._id}
            className="bg-white bg-opacity-80 border border-blue-100 rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition transform p-6 flex flex-col items-center text-center"
          >
            <img
              src={student.avatarUrl || "https://i.pravatar.cc/150"}
              alt={student.name}
              className="w-24 h-24 rounded-full object-cover mb-4 ring-4 ring-blue-300"
            />
            <h2 className="text-xl font-bold text-gray-800 mb-1">{student.name}</h2>
            <p className="text-blue-600 font-medium mb-2">{student.specialization}</p>
            <p className="text-gray-600 mb-4 line-clamp-3">{student.bio || "No bio available."}</p>
            {student.projects.length > 0 ? (
              <a
                href={`#projects-${student._id}`}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full mt-auto font-semibold shadow transition"
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
          <section key={student._id} id={`projects-${student._id}`} className="mt-16">
            <h3 className="text-2xl font-bold mb-4 text-green-700 text-center">{student.name}'s Projects</h3>
            <ul className="list-disc list-inside text-center">
              {student.projects.map((proj) => (
                <li key={proj._id}>
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800 transition"
                  >
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

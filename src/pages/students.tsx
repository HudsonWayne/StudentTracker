import useSWR from "swr";
import Link from "next/link";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function StudentsPage() {
  const { data, error } = useSWR("/api/students", fetcher);
  const [showScoreboard, setShowScoreboard] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  if (error) return <div className="p-6 text-red-600">Failed to load students 😢</div>;
  if (!data) return <div className="p-6">Loading...</div>;

  // Assign fake points for demonstration
  const studentsWithPoints = data.data.map((student: any) => ({
    ...student,
    points: Math.floor(Math.random() * 100) + 20, // random points from 20 to 120
  }));

  // Sort students by points descending
  const rankedStudents = [...studentsWithPoints].sort((a, b) => b.points - a.points);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6 relative">
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-4xl font-extrabold mb-6 text-blue-700 text-center"
          data-aos="fade-down"
        >
          🌟 Meet Our Talented Students
        </h1>

        <Link
          href="/"
          className="inline-block mb-4 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow transition hover:scale-105 active:scale-95"
          data-aos="fade-up"
        >
          ← Back to Home
        </Link>

        <button
          onClick={() => setShowScoreboard(!showScoreboard)}
          className="mb-8 px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded shadow transition hover:scale-105 active:scale-95 ml-4"
          data-aos="fade-up"
        >
          🏆 {showScoreboard ? "Hide" : "Show"} Scoreboard
        </button>

        {showScoreboard && (
          <div
            className="bg-white border border-gray-300 rounded-lg p-6 mb-8 shadow-xl"
            data-aos="fade-up"
          >
            <h2 className="text-2xl font-bold mb-4 text-green-700">🏅 Student Scoreboard</h2>
            <ul className="space-y-2">
              {rankedStudents.map((student, idx) => (
                <li
                  key={student._id}
                  className="flex justify-between bg-gray-50 border rounded p-3 shadow-sm hover:bg-gray-100 transition"
                >
                  <div>
                    <span className="font-bold">{idx + 1}. {student.name}</span>
                    <span className="ml-2 text-gray-500">({student.specialization})</span>
                    {idx === 0 && (
                      <span className="ml-2 px-2 py-1 bg-yellow-300 text-yellow-900 rounded text-xs">
                        Top Performer ⭐
                      </span>
                    )}
                    {idx === rankedStudents.length - 1 && (
                      <span className="ml-2 px-2 py-1 bg-red-300 text-red-800 rounded text-xs">
                        Needs Support 💪
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-blue-600">{student.points} pts</div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {data.data.map((student: any) => (
            <div
              key={student._id}
              data-aos="fade-up"
              className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:scale-105 hover:shadow-2xl transition-transform duration-500"
            >
              <img
                src={student.avatarUrl}
                alt={student.name}
                className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-500"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-1 transition-colors duration-300 hover:text-blue-600">
                  {student.name}
                </h2>
                <p className="text-sm text-gray-500 mb-2">{student.specialization}</p>
                <p className="text-gray-600 text-sm">{student.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

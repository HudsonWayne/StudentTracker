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
    AOS.init({ duration: 1000, once: true });
  }, []);

  if (error) return <div className="p-6 text-red-600">Failed to load students 😢</div>;
  if (!data) return <div className="p-6">Loading...</div>;

  // Group students by specialization
  const groupedBySpecialization = data.data.reduce((acc: Record<string, any[]>, student: any) => {
    const key = student.specialization || "General";
    if (!acc[key]) acc[key] = [];
    acc[key].push(student);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6 relative">
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-4xl font-extrabold mb-6 text-blue-700 text-center"
          data-aos="fade-down"
        >
          {showScoreboard ? "🏆 Student Scoreboard" : "🌟 Meet Our Talented Students"}
        </h1>

        <div className="flex justify-between items-center mb-6" data-aos="fade-up">
          <Link
            href="/"
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow transition hover:scale-105 active:scale-95"
          >
            ← Back to Home
          </Link>

          <button
            onClick={() => setShowScoreboard(!showScoreboard)}
            className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded shadow transition hover:scale-105 active:scale-95 ml-4"
          >
            {showScoreboard ? "🙈 Hide Scoreboard" : "🏆 Show Scoreboard"}
          </button>
        </div>

        {showScoreboard ? (
          <div className="space-y-12 mb-12" data-aos="fade-up" data-aos-delay="200">
            {Object.entries(groupedBySpecialization).map(([dept, students], index) => {
              const ranked = [...students].sort((a, b) => b.totalScore - a.totalScore);
              return (
                <div
                  key={dept}
                  className="bg-white border border-gray-300 rounded-lg p-6 shadow-xl"
                  data-aos="zoom-in-up"
                  data-aos-delay={index * 100}
                >
                  <h2 className="text-2xl font-bold mb-4 text-green-700">{dept} Scoreboard</h2>
                  <ul className="space-y-2">
                    {ranked.map((student, idx) => (
                      <li
                        key={student._id}
                        className="flex justify-between items-center bg-gray-50 border rounded p-3 shadow-sm hover:bg-gray-100 transition"
                        data-aos="fade-up"
                        data-aos-delay={idx * 50}
                      >
                        <div>
                          <span className="font-bold">
                            {idx + 1}. {student.name}
                          </span>
                          {idx === 0 && (
                            <span className="ml-2 px-2 py-1 bg-yellow-300 text-yellow-900 rounded text-xs">
                              Top Performer ⭐
                            </span>
                          )}
                          {idx === ranked.length - 1 && ranked.length > 1 && (
                            <span className="ml-2 px-2 py-1 bg-red-300 text-red-800 rounded text-xs">
                              Needs Support 💪
                            </span>
                          )}
                        </div>
                        <div className="font-mono text-blue-600">{student.totalScore} pts</div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        ) : (
          // View Students (With Images)
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8" data-aos="fade-up">
            {data.data.map((student: any, idx: number) => (
              <div
                key={student._id}
                className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:scale-105 hover:shadow-2xl transition-transform duration-500"
                data-aos="zoom-in"
                data-aos-delay={idx * 50}
              >
                <img
                  src={student.avatarUrl}
                  alt={student.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-1 hover:text-blue-600 transition">
                    {student.name}
                  </h2>
                  <p className="text-sm text-gray-500 mb-2">{student.specialization}</p>
                  <p className="text-sm text-gray-600">{student.bio}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

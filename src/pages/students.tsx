import useSWR from "swr";
import Link from "next/link";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function StudentsPage() {
  const { data, error } = useSWR("/api/students", fetcher);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-700" data-aos="fade-down">
          🌟 Meet Our Talented Students
        </h1>

        <Link
          href="/"
          className="inline-block mb-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow transition"
          data-aos="fade-up"
        >
          ← Back to Home
        </Link>

        {/* Scoreboards */}
        <div className="space-y-10">
          {Object.entries(groupedBySpecialization).map(([dept, students]) => {
            const ranked = [...students].sort((a, b) => b.totalScore - a.totalScore);

            return (
              <div
                key={dept}
                className="bg-white rounded-lg p-6 shadow-lg border border-gray-200"
                data-aos="fade-up"
              >
                <h2 className="text-2xl font-bold mb-4 text-green-700">{dept} Scoreboard</h2>
                <ul className="space-y-2">
                  {ranked.map((student, index) => (
                    <li
                      key={student._id}
                      className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded border hover:bg-gray-100"
                    >
                      <div className="font-medium text-gray-800">
                        {index + 1}. {student.name}
                        {index === 0 && (
                          <span className="ml-2 px-2 py-1 bg-yellow-300 text-yellow-900 rounded text-xs">
                            Top Performer ⭐
                          </span>
                        )}
                        {index === ranked.length - 1 && (
                          <span className="ml-2 px-2 py-1 bg-red-300 text-red-900 rounded text-xs">
                            Needs Support 💪
                          </span>
                        )}
                      </div>
                      <div className="text-blue-600 font-mono">{student.totalScore} pts</div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

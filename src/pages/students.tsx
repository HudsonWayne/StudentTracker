import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function StudentsPage() {
  const { data, error } = useSWR("/api/students", fetcher);

  if (error) return <div>Error loading students</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Students</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.data.map((student: any) => (
          <div key={student._id} className="border rounded p-4 shadow">
            <h2 className="text-xl font-semibold">{student.name}</h2>
            <p>{student.specialization}</p>
            <p className="text-sm text-gray-500">
              {student.employed ? `Employed at ${student.employer}` : "Not employed"}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}

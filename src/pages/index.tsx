import Link from "next/link";

export default function Home() {
  return (
    <main className="p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">🎓 Welcome to Mufakose Hub</h1>
      <p className="mb-6">Empowering students and instructors to showcase their growth and projects.</p>
      <div className="flex justify-center gap-4">
        <Link href="/students" className="bg-blue-600 text-white px-4 py-2 rounded">View Students</Link>
        <Link href="/projects" className="bg-green-600 text-white px-4 py-2 rounded">Submit Project</Link>
      </div>
    </main>
  );
}

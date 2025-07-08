import Link from "next/link";


export default function Home() {
  return (
    <>
      
      <main className="relative z-10 min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-5xl font-extrabold mb-4 text-blue-700">🎓 Mufakose Hub</h1>
        <p className="text-xl text-gray-700 mb-6 max-w-2xl">
          Empowering young innovators and creators in Zimbabwe to showcase their skills, connect with employers,
          and build impactful projects across design, software development, and digital marketing.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Link
            href="/students"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded shadow-md transition"
          >
            🚀 View Students
          </Link>
          <Link
            href="/projects"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded shadow-md transition"
          >
            💡 Submit Project
          </Link>
        </div>
        <section className="bg-white shadow rounded p-6 max-w-3xl mb-8">
          <h2 className="text-2xl font-bold mb-2 text-green-700">🌟 Our Vision</h2>
          <p className="text-gray-600">
            We believe in unlocking talent and creating real opportunities for our students. We provide a platform to
            showcase projects, connect with mentors, and launch amazing careers.
          </p>
        </section>
        <section className="bg-green-50 shadow rounded p-6 max-w-3xl">
          <h2 className="text-2xl font-bold mb-2 text-blue-700">🤝 Join Us</h2>
          <p className="text-gray-600">
            Are you a student ready to share your work? Or an instructor looking to inspire? Join Mufakose Hub and
            become part of our growing community.
          </p>
        </section>
      </main>
    </>
  );
}

import { useState, useEffect } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ProjectsPage() {
  const [form, setForm] = useState({
    email: "",
    title: "",
    description: "",
    link: "",
    category: "",
  });

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setSuccess(true);
      setForm({ email: "", title: "", description: "", link: "", category: "" });
    } else {
      alert("❌ Failed to submit project.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-8 flex flex-col items-center">
      <h1
        className="text-4xl font-extrabold text-blue-700 mb-4"
        data-aos="fade-down"
      >
        💡 Submit Your Project
      </h1>

      <Link
        href="/"
        className="inline-block mb-6 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow transition hover:scale-105 active:scale-95"
        data-aos="fade-up"
      >
        ← Back to Home
      </Link>

      {success && (
        <p
          className="mb-4 text-green-600 font-semibold bg-green-50 px-4 py-2 rounded shadow"
          data-aos="fade-up"
        >
          ✅ Project submitted successfully!
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-lg space-y-5 border border-gray-100"
        data-aos="fade-up"
      >
        <input
          type="email"
          name="email"
          placeholder="Your email (must match student email)"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />
        <textarea
          name="description"
          placeholder="Project Description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
          required
        />
        <input
          type="text"
          name="link"
          placeholder="Project Link (e.g., GitHub, Behance)"
          value={form.link}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category (Design, Development, Marketing)"
          value={form.category}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded shadow-lg font-semibold text-lg transition transform hover:scale-105 active:scale-95 animate-pulse"
        >
          🚀 Submit Project
        </button>
      </form>
    </main>
  );
}

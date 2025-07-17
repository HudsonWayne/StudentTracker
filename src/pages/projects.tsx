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

  const [studentEmails, setStudentEmails] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [submittedProjects, setSubmittedProjects] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchStudentEmails();
  }, []);

  const fetchStudentEmails = async () => {
    try {
      const res = await fetch("/api/students/emails");
      const data = await res.json();
      if (data.success) {
        setStudentEmails(data.emails);
      }
    } catch (err) {
      console.error("Failed to load student emails:", err);
    }
  };

  const fetchStudentProjects = async (email: string) => {
    const res = await fetch(`/api/projects?email=${encodeURIComponent(email)}`);
    const data = await res.json();
    if (data.projects) {
      setSubmittedProjects(data.projects);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
    if (e.target.name === "email") fetchStudentProjects(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.title || !form.description || !form.link || !form.category) {
      setError("⚠️ All fields are required.");
      return;
    }

    const urlRegex = /^https?:\/\/.+$/i;
    if (!urlRegex.test(form.link)) {
      setError("⚠️ Please enter a valid project link (starting with https://)");
      return;
    }

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      setSuccess(true);
      setError("");
      setForm({ email: "", title: "", description: "", link: "", category: "" });
      fetchStudentProjects(form.email);
    } else {
      setError("❌ Failed to submit project. Make sure the email exists.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-4" data-aos="fade-down">
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
        <p className="mb-4 text-green-600 font-semibold bg-green-50 px-4 py-2 rounded shadow" data-aos="fade-up">
          ✅ Project submitted successfully!
        </p>
      )}

      {error && (
        <p className="mb-4 text-red-600 font-semibold bg-red-50 px-4 py-2 rounded shadow" data-aos="fade-up">
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-lg space-y-5 border border-gray-100"
        data-aos="fade-up"
      >
        <select
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">👤 Select Your Student Email</option>
          {studentEmails.map((email) => (
            <option key={email} value={email}>{email}</option>
          ))}
        </select>

        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <textarea
          name="description"
          placeholder="Project Description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          required
        />

        <input
          type="text"
          name="link"
          placeholder="Project Link (e.g., GitHub, Behance)"
          value={form.link}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category (Design, Development, Marketing)"
          value={form.category}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded shadow-lg font-semibold text-lg transition transform hover:scale-105 active:scale-95 animate-pulse"
        >
          🚀 Submit Project
        </button>
      </form>

      {submittedProjects.length > 0 && (
        <section className="mt-12 w-full max-w-2xl" data-aos="fade-up">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">📦 Your Submitted Projects</h2>
          {submittedProjects.map((proj, idx) => (
            <div key={idx} className="bg-white border rounded p-4 mb-4 shadow">
              <h3 className="text-xl font-semibold">{proj.title}</h3>
              <p className="text-gray-600 mb-1">{proj.description}</p>
              <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                🔗 View Project
              </a>
              <p className="text-sm text-gray-400 mt-1">Category: {proj.category}</p>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}

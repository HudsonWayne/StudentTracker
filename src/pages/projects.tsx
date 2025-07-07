import { useState } from "react";

export default function ProjectsPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
    category: "",
    studentId: "",
  });

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
      alert("Project submitted successfully! 🎉");
      setForm({ title: "", description: "", link: "", category: "", studentId: "" });
    } else {
      alert("Failed to submit project.");
    }
  };

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Submit Project</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Project Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="link"
          placeholder="Project Link (e.g., GitHub)"
          value={form.link}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category (Design, Dev, Marketing)"
          value={form.category}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="studentId"
          placeholder="Student ID"
          value={form.studentId}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-green-600 text-white py-2 rounded">
          Submit Project
        </button>
      </form>
    </main>
  );
}

import { useEffect, useState } from "react";
import axios from "axios";

export default function SubmitProject() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    category: "",
    studentId: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await axios.get("/api/students");
      setStudents(res.data.data);
    };
    fetchStudents();
  }, []);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("/api/projects", formData);
      if (res.data.success) {
        setMessage("✅ Project submitted successfully!");
        setFormData({
          title: "",
          description: "",
          link: "",
          category: "",
          studentId: "",
        });
      }
    } catch (error: any) {
      setMessage(`❌ ${error.response?.data?.message || "Submission failed"}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">💡 Submit Your Project</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">👤 Select Your Student Email</label>
          <select
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Select Email --</option>
            {students.map((student: any) => (
              <option key={student._id} value={student._id}>
                {student.email}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold">Project Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Project Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows={4}
          ></textarea>
        </div>

        <div>
          <label className="block font-semibold">Project Link (e.g., GitHub, Behance)</label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Select Category --</option>
            <option value="Design">Design</option>
            <option value="Development">Development</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          🚀 Submit Project
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-red-600 font-semibold">{message}</p>
      )}
    </div>
  );
}

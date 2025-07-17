import { useState, useEffect } from "react";
import axios from "axios";

export default function SubmitProject() {
  const [students, setStudents] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("");
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios.get("/api/students").then((res) => {
      setStudents(res.data.data);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    if (!title || !studentId || !link || !category) {
      setErrorMessage("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/projects", {
        title,
        description,
        link,
        category,
        studentId,
      });

      if (response.data.success) {
        setSuccessMessage("✅ Project submitted successfully!");
        setTitle("");
        setDescription("");
        setLink("");
        setCategory("");
        setStudentId("");
      } else {
        setErrorMessage("❌ Submission failed. Try again.");
      }
    } catch (err) {
      setErrorMessage("❌ Error submitting project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 rounded-2xl shadow-lg bg-white border border-gray-200">
      <h2 className="text-3xl font-bold text-center mb-6 text-purple-700">💡 Submit Your Project</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">👤 Select Your Student Email</label>
          <select
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
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
          <label className="block text-sm font-medium text-gray-700 mb-1">📌 Project Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            placeholder="e.g. Portfolio Website"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">📝 Project Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            placeholder="Short description of the project"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">🔗 Project Link (e.g., GitHub, Behance)</label>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            placeholder="https://github.com/yourproject"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">🎨 Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">-- Select Category --</option>
            <option value="Web">Web</option>
            <option value="Mobile">Mobile</option>
            <option value="Game">Game</option>
            <option value="AI">AI</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 font-bold rounded-lg text-white transition ${
            loading
              ? "bg-purple-300 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {loading ? "Submitting..." : "🚀 Submit Project"}
        </button>

        {successMessage && <p className="text-green-600 text-center mt-2">{successMessage}</p>}
        {errorMessage && <p className="text-red-600 text-center mt-2">{errorMessage}</p>}
      </form>
    </div>
  );
}

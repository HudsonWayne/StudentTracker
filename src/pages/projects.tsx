"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
      setStudents(res.data.data || []);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    if (!title || !studentId || !link || !category) {
      setErrorMessage("❌ Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("/api/projects", {
        title,
        description,
        link,
        category,
        studentId,
      });

      if (res.data.success) {
        setSuccessMessage("✅ Project submitted successfully!");
        setTitle("");
        setDescription("");
        setLink("");
        setCategory("");
        setStudentId("");
      } else {
        setErrorMessage("❌ Submission failed. Try again.");
      }
    } catch (error: any) {
      setErrorMessage(
        `❌ ${
          error.response?.data?.message ||
          "Something went wrong during submission."
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-2xl mx-auto mt-10 p-6 rounded-2xl shadow-xl bg-white border border-gray-100"
    >
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold text-center mb-6 text-blue-700"
      >
        💡 Submit Your Project
      </motion.h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            👤 Select Your Student Email
          </label>
          <select
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            📌 Project Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Portfolio Website"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            📝 Project Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description of the project"
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            🔗 Project Link (GitHub, Behance, Figma, etc.)
          </label>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://github.com/yourproject"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            🎨 Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">-- Select Category --</option>
            <option value="Software Development">Software Development</option>
            <option value="Design">Design</option>
            <option value="Digital Marketing">Digital Marketing</option>
          </select>
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className={`w-full py-2 px-4 font-bold rounded-lg text-white transition ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "⏳ Submitting..." : "🚀 Submit Project"}
        </motion.button>

        {/* Feedback Messages */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: successMessage || errorMessage ? 1 : 0 }}
        >
          {successMessage && (
            <motion.p
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              className="text-green-600 text-center mt-2 font-medium"
            >
              {successMessage}
            </motion.p>
          )}
          {errorMessage && (
            <motion.p
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              className="text-red-600 text-center mt-2 font-medium"
            >
              {errorMessage}
            </motion.p>
          )}
        </motion.div>
      </form>
    </motion.div>
  );
}

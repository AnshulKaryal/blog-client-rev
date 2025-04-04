import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { SERVERBASEURL } from "../api/api";

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the blog details
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${SERVERBASEURL}/getBlogById/${id}`);
        const data = await response.json();

        if (response.ok) {
          setTitle(data.blog.title);
          setDescription(data.blog.description);
        } else {
          setError(data.message || "Failed to fetch blog");
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Handle blog update
  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You must be logged in to update a blog.");
      return;
    }

    try {
      const response = await fetch(`${SERVERBASEURL}/updateBlog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Blog updated successfully!");
        navigate("/my-blogs"); // Redirect to My Blogs page
      } else {
        toast.error(data.message || "Failed to update blog.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Update Blog</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            UPDATE BLOG
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;

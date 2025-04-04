import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { SERVERBASEURL } from "../api/api";

const MyBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const fetchBlogs = async (page) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to view your blogs.");
      return;
    }

    try {
      const response = await fetch(`${SERVERBASEURL}/getUserBlog?page=${page}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setBlogs(data.blogs);
        setTotalPages(data.totalPages);
      } else {
        setError(data.message || "Failed to fetch blogs");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to delete a blog.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const response = await fetch(`${SERVERBASEURL}/deleteBlog/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Blog deleted successfully!");
        setBlogs(blogs.filter((blog) => blog._id !== id));
      } else {
        toast.error("Failed to delete the blog.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/update-blog/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">My Blogs</h2>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && blogs.length === 0 && <p className="text-center">No blogs found.</p>}

      <div className="grid gap-6 max-w-4xl mx-auto">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white p-4 rounded-lg shadow-md relative">
            <h3 className="text-xl font-bold">{blog.title}</h3>
            <p className="text-gray-700">
              {new Date(blog.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }).replace(",", "")}
            </p>
            <p className="text-gray-700">{blog.description}</p>
            <div className="flex justify-end gap-3 mt-3">
              <button
                onClick={() => handleEdit(blog._id)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-md mx-2 disabled:bg-gray-400"
          >
            Prev
          </button>
          <span className="px-4 py-2">{currentPage} / {totalPages}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded-md mx-2 disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MyBlog;

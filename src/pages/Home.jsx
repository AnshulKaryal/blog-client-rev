import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SERVERBASEURL } from "../api/api";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${SERVERBASEURL}/getAllBlogs?page=${currentPage}`);
        const data = await response.json();

        if (response.ok && data.blogs) {
          setBlogs(data.blogs);
          setTotalPages(data.totalPages);
        } else {
          setBlogs([]); // Set an empty array to avoid errors
          setError(data.message || "No Blogs Found");
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-semibold text-center mb-6">All Blogs</h2>
      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs available</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div key={blog._id} className="bg-white p-5 rounded-xl shadow-md">
                <h3 className="text-xl font-bold">{blog.title}</h3>
                <p className="text-gray-600 mt-2">
                  {new Date(blog.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }).replace(",", "")}
                </p>
                <p className="text-gray-600 mt-2">{blog.description.slice(0, 100)}...</p>
                <p className="text-sm text-gray-500 mt-4">
                  By{" "}
                  <span
                    className="text-blue-600 cursor-pointer underline"
                    onClick={() => navigate(`/user-blogs/${blog?.publishedBy?._id}`)}
                  >
                    {blog?.publishedBy?.username || "Unknown"}
                  </span>
                </p>
                <button
                  onClick={() => navigate(`/view-blog/${blog._id}`)}
                  className="mt-3 text-blue-600 underline"
                >
                  Read More
                </button>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`mx-2 px-4 py-2 rounded-md ${
                currentPage === 1 ? "bg-gray-300" : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Prev
            </button>
            <span className="px-4 py-2 border rounded-md">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`mx-2 px-4 py-2 rounded-md ${
                currentPage === totalPages ? "bg-gray-300" : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;

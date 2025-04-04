import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SERVERBASEURL } from "../api/api";

const ViewBlog = () => {
	const { id } = useParams();
	const [blog, setBlog] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchBlog = async () => {
			try {
				const response = await fetch(`${SERVERBASEURL}/getBlogById/${id}`);
				const data = await response.json();

				if (response.ok) {
					setBlog(data.blog);
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

	if (loading) return <p className="text-center">Loading...</p>;
	if (error) return <p className="text-center text-red-500">{error}</p>;

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
			<div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl w-full">
				<h2 className="text-3xl font-semibold">{blog.title}</h2>
				<p className="text-gray-600 mt-4">
					{new Date(blog.createdAt).toLocaleDateString("en-GB", {
						day: "numeric",
						month: "short",
						year: "numeric",
					}).replace(",", "")}
				</p>
				<p className="text-gray-600 mt-4">{blog.description}</p>
				<p className="text-sm text-gray-500 mt-4">
					By{" "}
					<span
						className="text-blue-600 cursor-pointer underline"
						onClick={() => navigate(`/user-blogs/${blog?.publishedBy?._id}`)}
					>
						{blog?.publishedBy?.username || "Unknown"}
					</span>
				</p>
			</div>
		</div>
	);
};

export default ViewBlog;

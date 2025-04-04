import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { SERVERBASEURL } from "../api/api";

const CreateBlog = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const token = localStorage.getItem("token");
		if (!token) {
			toast.error("You must be logged in to create a blog.");
			navigate("/login");
			return;
		}

		const blogData = { title, description };

		try {
			const response = await fetch(`${SERVERBASEURL}/createBlog`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(blogData),
			});

			const data = await response.json();
			if (response.ok) {
				toast.success("Blog Created Successfully!");
				navigate("/");
			} else {
				toast.error(data.message || "Failed to create blog");
			}
		} catch (error) {
			toast.error("Something went wrong. Please try again.");
			console.error(error);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white p-8 rounded-xl shadow-lg w-96">
				<h2 className="text-2xl font-semibold text-center mb-6">Create A Blog</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block font-medium">Title</label>
						<input
							type="text"
							placeholder="Enter title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
							required
						/>
					</div>
					<div>
						<label className="block font-medium">Description</label>
						<textarea
							placeholder="Enter description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
							rows="4"
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
					>
						SUBMIT
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateBlog;

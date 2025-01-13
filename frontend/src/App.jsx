
import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoryMaster = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ id: "", name: "" });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await axios.get("/api/category");
    setCategories(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.id) {
      await axios.put(`/api/category/${form.id}`, { name: form.name });
    } else {
      await axios.post("/api/category", { name: form.name });
    }
    setForm({ id: "", name: "" });
    fetchCategories();
  };

  const handleEdit = (category) => {
    setForm(category);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/category/${id}`);
    fetchCategories();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Category Master</h2>
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Category Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {form.id ? "Update" : "Add"}
        </button>
      </form>
      <ul className="list-disc pl-5">
        {categories.map((category) => (
          <li key={category.id} className="mb-2">
            <span className="mr-4">{category.name}</span>
            <button
              onClick={() => handleEdit(category)}
              className="bg-yellow-400 text-white px-2 py-1 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(category.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ProductMaster = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", categoryId: "" });
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchCategories();
    fetchProducts(page);
  }, [page]);

  const fetchCategories = async () => {
    const response = await axios.get("/api/category");
    setCategories(response.data);
  };

  const fetchProducts = async (page) => {
    const response = await axios.get(`/api/product?page=${page}&pageSize=${pageSize}`);
    setProducts(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.id) {
      await axios.put(`/api/product/${form.id}`, form);
    } else {
      await axios.post("/api/product", form);
    }
    setForm({ id: "", name: "", categoryId: "" });
    fetchProducts(page);
  };

  const handleEdit = (product) => {
    setForm(product);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/product/${id}`);
    fetchProducts(page);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Product Master</h2>
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <select
          value={form.categoryId}
          onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
          className="border p-2 rounded w-full"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {form.id ? "Update" : "Add"}
        </button>
      </form>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Product ID</th>
            <th className="border px-4 py-2">Product Name</th>
            <th className="border px-4 py-2">Category Name</th>
            <th className="border px-4 py-2">Category ID</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border px-4 py-2">{product.id}</td>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">{product.categoryName}</td>
              <td className="border px-4 py-2">{product.categoryId}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-yellow-400 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="bg-gray-300 text-black px-4 py-2 rounded"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-gray-300 text-black px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const App = () => (
  <div className="container mx-auto p-4">
    <CategoryMaster />
    <ProductMaster />
  </div>
);

export default App;

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const FormAddProduct = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/create-products", {
        name,
        price,
        brand,
      });
      navigate("/products");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 ">Products</h1>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Add New Product
      </h2>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <Link
                to="/products"
                className="inline-block px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-200"
              >
                Cancel
              </Link>
              <form onSubmit={saveProduct} className="space-y-6">
                <p>{msg}</p>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-bold text-black"
                  >
                    Product Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="brand"
                    className="block text-sm font-bold text-black"
                  >
                    Brand
                  </label>
                  <input
                    id="brand"
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-sm font-bold text-black"
                  >
                    Price
                  </label>
                  <input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium text-sm leading-5 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddProduct;

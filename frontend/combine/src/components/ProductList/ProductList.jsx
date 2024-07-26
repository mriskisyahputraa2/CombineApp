import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoPencil, IoTrash } from "react-icons/io5";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:8080/get-all-products");
    setProducts(response.data);
  };

  const deleteProduct = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      await axios.delete(`http://localhost:8080/delete-products/${productId}`);
    }
    getProducts();
  };

  return (
    <div className="p-6 ">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 ">Products</h1>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        List of Products
      </h2>
      <Link
        to={"/products/add"}
        className="inline-block mb-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
      >
        Add Products
      </Link>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-sm text-black font-bold uppercase "
                    >
                      No
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-sm text-black font-bold uppercase "
                    >
                      Product Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-sm text-black font-bold uppercase "
                    >
                      Brand
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-sm text-black font-bold uppercase "
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-sm text-black font-bold uppercase "
                    >
                      Created By
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-sm text-black font-bold uppercase "
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                  {products.map((product, index) => (
                    <tr key={product.uuid}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-80">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-80">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-80">
                        {product.brand}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-80">
                        {product.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-80">
                        {product.user.name}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium ">
                        {/* button edit */}
                        <Link
                          to={`/products/edit/${product.uuid}`}
                          className="inline-flex items-center mb-2 p-2 bg-transparent shadow-md text-blue-600 hover:text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 rounded-md"
                          aria-label="Edit"
                        >
                          <IoPencil className="w-[15px] h-[15px]" />
                        </Link>

                        {/* button delete */}
                        <button
                          type="button"
                          onClick={() => deleteProduct(product.uuid)}
                          className="inline-flex items-center mb-2 p-2 bg-transparent shadow-md text-red-600 hover:text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-200 rounded-md"
                          aria-label="Delete"
                        >
                          <IoTrash className="w-[15px] h-[15px]" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;

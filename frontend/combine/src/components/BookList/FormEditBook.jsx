import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const FormEditBook = () => {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [deadline, setDeadline] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  // get data by id books
  useEffect(() => {
    const getBookById = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/books/${id}`);
        setName(response.data.name);
        setGenre(response.data.genre);
        setDeadline(response.data.deadline);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getBookById();
  }, [id]);

  // function updateBookById
  const updateBook = async (e) => {
    e.preventDefault();

    // inisialisasi format date
    const tanggalSaatIni = new Date();
    const tanggalMasuk = new Date(deadline);

    // validasi format date
    if (tanggalSaatIni > tanggalMasuk) {
      Swal.fire({
        title: "Attention!",
        text: "Please move your date forward.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    // if date format validation is successful, continue the book update
    try {
      await axios.patch(`http://localhost:8080/update-books/${id}`, {
        name,
        genre,
        deadline,
      });
      navigate("/books");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 ">Books</h1>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Update Book</h2>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <Link
                to="/books"
                className="inline-block px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-200"
              >
                Cancel
              </Link>
              <form onSubmit={updateBook} className="space-y-6">
                <p>{msg}</p>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-bold text-black"
                  >
                    Book Name
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
                    Genre
                  </label>
                  <input
                    id="brand"
                    type="text"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="deadline"
                    className="block text-sm font-bold text-black"
                  >
                    Deadline
                  </label>
                  <input
                    id="deadline"
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium text-sm leading-5 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150"
                  >
                    Update Book
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

export default FormEditBook;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoPencil, IoTrash } from "react-icons/io5";
import Swal from "sweetalert2";
import EmptyBook from "../EmptyBook/EmptyBook";

const BookList = () => {
  const [books, setBooks] = useState([]);

  const getAllBook = async () => {
    const response = await axios.get("http://localhost:8080/get-all-books");
    setBooks(response.data);
  };

  useEffect(() => {
    getAllBook();
  }, []);

  // function create format deadline
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // function of checking deadline book for format expiration date
  const checkDeadline = (deadline) => {
    const currentDate = new Date();
    const deadlineDate = new Date(deadline);

    // validasi, apakah tanggal saat ini(currentDate) sudah melewati tanggal deadline(deadlineDate)
    if (currentDate > deadlineDate) {
      // jika waktu hari ini sudah lewat(currentDate), maka tampilkan expired
      return <span className="text-red-600 font-bold">Expired</span>;
    } else {
      // jika belum tampilkan tanggal hari ini
      return <span className="text-green-600">{formatDate(deadline)}</span>;
    }
  };

  // function delete books
  const deletebooks = async (bookId) => {
    // switch alert delete product
    Swal.fire({
      title: "Are you sure you want to delete this?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:8080/delete-books/${bookId}`);
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
        getAllBook(); // Refresh product list after deletion
      }
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Books</h1>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        List of Books
      </h2>
      <Link
        to="/books/add"
        className="inline-block mb-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
      >
        Add Books
      </Link>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                {books.length > 0 ? (
                  <>
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-sm text-black font-bold uppercase"
                        >
                          No
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-sm text-black font-bold uppercase"
                        >
                          Image
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-sm text-black font-bold uppercase"
                        >
                          Book Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-sm text-black font-bold uppercase"
                        >
                          Genre
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-sm text-black font-bold uppercase"
                        >
                          Deadline
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-sm text-black font-bold uppercase"
                        >
                          Created By
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-end text-sm text-black font-bold uppercase"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                      {books.map((book, index) => (
                        <tr key={book.uuid}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                            {book.imageUrl ? (
                              <img
                                src={book.imageUrl}
                                alt={book.name}
                                className="w-12 h-12 object-cover"
                                onError={(e) =>
                                  (e.target.style.display = "none")
                                }
                              />
                            ) : (
                              <span>No Image</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                            {book.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                            {book.genre}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {checkDeadline(book.deadline)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                            {book.user.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                            <Link
                              to={`/books/edit/${book.uuid}`}
                              className="inline-flex items-center mb-2 p-2 bg-transparent shadow-md text-blue-600 hover:text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 rounded-md"
                              aria-label="Edit"
                            >
                              <IoPencil className="w-[15px] h-[15px]" />
                            </Link>
                            <button
                              type="button"
                              onClick={() => deletebooks(book.uuid)}
                              className="inline-flex items-center mb-2 p-2 bg-transparent shadow-md text-red-600 hover:text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-200 rounded-md"
                              aria-label="Delete"
                            >
                              <IoTrash className="w-[15px] h-[15px]" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </>
                ) : (
                  <tbody>
                    <tr>
                      <td>
                        <EmptyBook />
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookList;

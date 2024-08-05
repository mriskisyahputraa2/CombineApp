import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Welcome = () => {
  const [products, setProducts] = useState([]);
  const [books, setBooks] = useState([]);
  const [notes, setNotes] = useState([]);
  // for calender
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const { user } = useSelector((state) => state.auth);

  const getAllProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/get-all-products"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getAllBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/get-all-books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/get-all-notes");
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const getUserProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/get-user-products/${user.id}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching user products:", error);
    }
  };

  const getUserBooks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/get-user-books/${user.id}`
      );
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching user books:", error);
    }
  };

  const getUserNotes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/get-user-notes/${user.id}`
      );
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching user notes:", error);
    }
  };

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        getAllProducts();
        getAllBooks();
        getAllNotes();
      } else {
        getUserProducts();
        getUserBooks();
        getUserNotes();
      }
    }
  }, [user]);

  const generateCalendar = (year, month) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay();

    let calendarDays = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      calendarDays.push(<div key={`empty-${i}`} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        year === new Date().getFullYear() &&
        month === new Date().getMonth() &&
        day === new Date().getDate();
      calendarDays.push(
        <div
          key={day}
          className={`text-center py-2 border cursor-pointer ${
            isToday ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      );
    }
    return calendarDays;
  };

  const handleDateClick = (day) => {
    const selected = new Date(currentYear, currentMonth, day);
    setSelectedDate(selected);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  useEffect(() => {
    generateCalendar(currentYear, currentMonth);
  }, [currentYear, currentMonth]);
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h1>
      <h2 className="text-xl text-gray-700">
        Welcome <strong className="text-gray-900">{user && user.name}</strong>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900">
            Total Products
          </h3>
          <p className="text-2xl text-gray-700">{products.length}</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900">Total Books</h3>
          <p className="text-2xl text-gray-700">{books.length}</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900">Total Notes</h3>
          <p className="text-2xl text-gray-700">{notes.length}</p>
        </div>
      </div>
      {/* start calender */}
      <div className="mt-4">
        <div className="lg:w-7/12 md:w-9/12 sm:w-10/12">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-3 bg-gray-700">
              <button onClick={handlePrevMonth} className="text-white">
                Previous
              </button>
              <h2 className="text-white">
                {monthNames[currentMonth]} {currentYear}
              </h2>
              <button onClick={handleNextMonth} className="text-white">
                Next
              </button>
            </div>
            <div className="grid grid-cols-7 gap-2 p-4">
              {generateCalendar(currentYear, currentMonth)}
            </div>
          </div>
        </div>
        {isModalOpen && (
          <div className="modal fixed inset-0 flex items-center justify-center z-50">
            <div
              className="modal-overlay absolute inset-0 bg-black opacity-50"
              onClick={handleCloseModal}
            ></div>
            <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
              <div className="modal-content py-4 text-left px-6">
                <div className="flex justify-between items-center pb-3">
                  <p className="text-2xl font-bold">Selected Date</p>
                  <button
                    onClick={handleCloseModal}
                    className="modal-close px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring"
                  >
                    ✕
                  </button>
                </div>
                <div className="text-xl font-semibold">
                  {selectedDate?.toLocaleDateString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* end calender */}
    </div>
  );
};

export default Welcome;

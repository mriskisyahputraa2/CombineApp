import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

  useEffect(() => {
    getAllProducts();
    getAllBooks();
    getAllNotes();
  }, []);

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

  const chartData = {
    labels: ["Products", "Books", "Notes"],
    datasets: [
      {
        label: "Count",
        data: [products.length, books.length, notes.length],
        backgroundColor: ["#4caf50", "#2196f3", "#ff9800"],
        borderColor: ["#388e3c", "#1976d2", "#f57c00"],
        borderWidth: 1,
      },
    ],
  };

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Kalender */}
        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900">Calendar</h3>
          <div className="flex justify-between pb-4 mb-4 border-b border-gray-200">
            <button
              onClick={handlePrevMonth}
              className="text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              {/* img panah kiri kanan */}
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="m8 10-4-4 4-4"
                />
              </svg>
            </button>
            <p className="text-sm font-normal text-gray-500">
              {monthNames[currentMonth]} {currentYear}
            </p>
            <button
              onClick={handleNextMonth}
              className="text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="m6 4 4 4-4 4"
                />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {generateCalendar(currentYear, currentMonth)}
          </div>
        </div>

        {/* Chart */}
        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900">Statistics</h3>
          <Bar data={chartData} />
        </div>
      </div>

      {/* Modal Code */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Selected Date
            </h3>
            <p className="text-gray-700">
              {selectedDate ? selectedDate.toDateString() : "No date selected"}
            </p>
            <button
              onClick={handleCloseModal}
              className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Welcome;

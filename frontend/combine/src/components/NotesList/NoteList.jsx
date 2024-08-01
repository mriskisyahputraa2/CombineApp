import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlinePushPin } from "react-icons/md";
import { IoPencil, IoTrash } from "react-icons/io5";
import { Link } from "react-router-dom";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdAdd } from "react-icons/md";
import Swal from "sweetalert2";
import EmptyCard from "../EmptyCard/EmptyCard";
import SearchBar from "../SearchBar/SearchBar";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const getAllNote = async () => {
    try {
      const response = await axios.get("http://localhost:8080/get-all-notes");
      const sortedNotes = response.data.sort(
        (a, b) => b.isPinned - a.isPinned || new Date(b.date) - new Date(a.date)
      );

      if (response.data && response.data.notes) {
        setNotes(response.data.notes);
        setIsSearch(false);
      } else {
        setNotes(sortedNotes);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  const onSearchNote = async (query) => {
    try {
      const response = await axios.get("http://localhost:8080/search-notes", {
        params: query,
      });

      if (response.data && response.data.notes) {
        if (response.data.notes.length > 0) {
          setNotes(response.data.notes);
          setIsSearch(true);
        } else {
          setNotes([]);
          setIsSearch(true);
          toast.error("City not found", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    } catch (error) {
      console.error("Error searching notes:", error);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNote();
  };

  useEffect(() => {
    getAllNote();
  }, []);

  const deleteNotes = async (notesId) => {
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
        await axios.delete(`http://localhost:8080/delete-notes/${notesId}`);
        Swal.fire("Deleted!", "Your note has been deleted.", "success");
        getAllNote();
      }
    });
  };

  const updatedIsPinned = async (noteData) => {
    const noteId = noteData.uuid;
    const newIsPinnedStatus = !noteData.isPinned;

    try {
      const response = await axios.put(
        `http://localhost:8080/update-note-pinned/${noteId}`,
        {
          isPinned: newIsPinnedStatus,
        }
      );

      if (response.data && response.data.note) {
        if (newIsPinnedStatus) {
          toast.success("This note has been pinned to the top of your list.", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.info("This note has been unpinned.", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        getAllNote();
      }
    } catch (error) {
      toast.error("An error occurred while updating the note.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="p-6 min-h-screen flex flex-col">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ top: "63px" }}
      />
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Notes</h1>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        List of Notes
      </h2>

      {/* Start SearchBar */}
      <div className="flex items-center justify-center px-4 bg-white rounded-full mb-6 mx-auto drop-shadow-md w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <SearchBar
          onSearchNote={onSearchNote}
          handleClearSearch={handleClearSearch}
        />
      </div>
      {/* End SearchBar */}

      <div className="flex flex-col items-center justify-center w-full">
        {notes.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
            {notes.map((note) => (
              <div
                key={note.uuid}
                className="bg-white rounded-lg border p-4 flex flex-col relative"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-sm font-medium mb-1">{note.title}</h3>
                    <span className="text-xs text-slate-500">
                      {moment(note.date).format("Do MMM YYYY")}
                    </span>
                  </div>
                  <div className="flex-none">
                    <MdOutlinePushPin
                      className={`text-2xl cursor-pointer ${
                        note.isPinned ? "text-blue-500" : "text-gray-400"
                      }`}
                      style={{ width: "16px", height: "16px" }}
                      onClick={() => updatedIsPinned(note)}
                    />
                  </div>
                </div>
                <p className="text-xs text-slate-600 mb-4">
                  {note.content.slice(0, 100)}
                </p>
                <p className="text-xs text-slate-500 mb-4">
                  {note.tags.map((tag) => `#${tag}`).join(" ")}
                </p>
                <p className="text-xs text-slate-800 mb-4">
                  By: {note.user?.name || "Unknown"}
                </p>
                <div className="flex mt-auto justify-end space-x-2">
                  <Link
                    to={`/notes/edit/${note.uuid}`}
                    className="inline-flex items-center p-2 bg-transparent shadow-md text-blue-600 hover:text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 rounded-md"
                    aria-label="edit note"
                  >
                    <IoPencil className="w-[15px] h-[15px]" />
                  </Link>
                  <button
                    onClick={() => deleteNotes(note.uuid)}
                    type="button"
                    className="inline-flex items-center p-2 bg-transparent shadow-md text-red-600 hover:text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-200 rounded-md"
                    aria-label="Delete"
                  >
                    <IoTrash className="w-[15px] h-[15px]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full">
            <EmptyCard />
          </div>
        )}
      </div>

      <Link
        to="/notes/add"
        className="fixed bottom-8 right-8 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600"
      >
        <MdAdd className="text-3xl" />
      </Link>
    </div>
  );
};

export default NoteList;

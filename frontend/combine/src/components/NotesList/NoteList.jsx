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

const NoteList = () => {
  const [notes, setNotes] = useState([]); // state array yang menyimpan daftar catatan(note).

  // function get all notes
  const getAllNote = async () => {
    const response = await axios.get("http://localhost:8080/get-all-notes");

    // mengurutkan catatan(note) berdasarkan isPinned==(true) & tanggal yang muncul terlebih dahulu
    const sortedNotes = response.data.sort(
      (a, b) => b.isPinned - a.isPinned || new Date(b.date) - new Date(a.date)
    );
    setNotes(sortedNotes); // menyimpan catatan(note) yang sudah diurutakan
  };

  // memanggil getAllNote yang dirender dari sisi server
  useEffect(() => {
    getAllNote();
  }, []);

  // function delete notes berdasarkan id
  const deleteNotes = async (notesId) => {
    // swall alert notification delete notes
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
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
        getAllNote();
      }
    });
  };

  // function updated is Pinned
  const updatedIsPinned = async (noteData) => {
    const noteId = noteData.uuid; // mengambil note uuid
    const newIsPinnedStatus = !noteData.isPinned; // mengubah status isPinned true or false

    try {
      // mengirim permintaan PUT ke API untuk memperbarui status pinned.
      const response = await axios.put(
        `http://localhost:8080/update-note-pinned/${noteId}`,
        {
          isPinned: newIsPinnedStatus,
        }
      );

      // validasi, jika response is pinned "true", tampilkan swalt alert true
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

          // jika response is pinned 'false',  tampilkan swalt alert false
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
        getAllNote(); // render data catatan(note) yang baru
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
    <div className="p-6">
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
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {notes.map((note) => (
          <div
            key={note.uuid}
            className="bg-white rounded-lg border mb-6 p-4 flex flex-col relative"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col flex-grow">
                <h3 className="text-sm font-medium mr-2">{note.title}</h3>
                <span className="text-xs text-slate-500 mt-2">
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
            <p className="text-xs text-slate-800 mb-4">By: {note.user.name}</p>
            <div className="flex mt-auto justify-end space-x-2">
              <Link
                to={`/notes/edit/${note.uuid}`}
                className="inline-flex items-center mb-2 p-2 bg-transparent shadow-md text-blue-600 hover:text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 rounded-md"
                aria-label="edit note"
              >
                <IoPencil className="w-[15px] h-[15px]" />
              </Link>
              <button
                onClick={() => deleteNotes(note.uuid)}
                type="button"
                className="inline-flex items-center mb-2 p-2 bg-transparent shadow-md text-red-600 hover:text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-200 rounded-md"
                aria-label="Delete"
              >
                <IoTrash className="w-[15px] h-[15px]" />
              </button>
            </div>
          </div>
        ))}
        <Link
          to={"/notes/add"}
          className="w-14 h-14 flex items-center justify-center rounded-2xl bg-green-600 hover:bg-green-700 fixed right-4 bottom-4 md:right-10 md:bottom-10 shadow-lg font-semibold"
        >
          <MdAdd className="text-[32px] text-white" />
        </Link>
      </div>
    </div>
  );
};

export default NoteList;

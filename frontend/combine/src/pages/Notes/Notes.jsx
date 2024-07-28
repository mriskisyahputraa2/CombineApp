import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import NoteList from "../../components/NotesList/NoteList";
import { useNavigate } from "react-router";
import { MdAdd } from "react-icons/md";
import FormAddNote from "../../components/NotesList/FormAddNote";
import axios from "axios";

const Notes = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);

  useEffect(() => {
    // Fetch initial notes from the server
    const fetchNotes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/get-all-notes");
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  const handleAddNote = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  return (
    <div>
      <Layout>
        <NoteList notes={notes} />

        <button
          className="w-14 h-14 flex items-center justify-center rounded-2xl bg-green-600 hover:bg-green-700 fixed right-4 bottom-4 md:right-10 md:bottom-10 shadow-lg font-semibold"
          onClick={() => setOpenAddModal(true)}
        >
          <MdAdd className="text-[32px] text-white" />
        </button>

        {openAddModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <FormAddNote
                onClose={() => setOpenAddModal(false)}
                onAddNote={handleAddNote}
              />
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default Notes;

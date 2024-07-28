import axios from "axios";
import React, { useState } from "react";
import { MdClose, MdAdd } from "react-icons/md";

const FormAddNote = ({ onClose, onAddNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [msg, setMsg] = useState("");
  const [tagInput, setTagInput] = useState("");

  const saveNote = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/create-notes", {
        title,
        content,
        tags,
      });
      onAddNote(response.data); // Mengirim catatan baru ke komponen Notes
      onClose(); // Menutup modal setelah berhasil menambahkan catatan
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const addTag = () => {
    if (tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="relative p-4 sm:p-6 bg-white rounded-lg shadow-lg max-w-xs sm:max-w-md md:max-w-lg w-full mx-auto">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4 text-gray-800">
        Notes
      </h1>
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-4 text-gray-700">
        Add New Note
      </h2>

      <form onSubmit={saveNote}>
        <button
          className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1 hover:bg-gray-200 rounded-full"
          onClick={onClose}
          type="button"
        >
          <MdClose className="text-xl sm:text-2xl text-gray-600" />
        </button>

        <p>{msg}</p>
        <div className="flex flex-col gap-3 sm:gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm outline-none bg-transparent"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm outline-none bg-transparent"
              placeholder="Enter content"
              rows="4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tags
            </label>
            {tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap mt-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded"
                  >
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)}>
                      <MdClose />
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className="flex items-center gap-4 mt-3">
              <input
                type="text"
                className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
                placeholder="Enter tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
              />
              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded border border-slate-600 hover:bg-slate-700 hover:text-white"
                onClick={addTag}
              >
                <MdAdd className="text-2xl text-black hover:text-white" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 p-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAddNote;

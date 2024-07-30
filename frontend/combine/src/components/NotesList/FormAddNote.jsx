import axios from "axios";
import React, { useState } from "react";
import { MdClose, MdAdd } from "react-icons/md";
import { useNavigate } from "react-router";

const FormAddNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  // const [tags, setTags] = useState(noteData?.tags || []);
  const [msg, setMsg] = useState("");
  const [tagInput, setTagInput] = useState("");
  const navigate = useNavigate();

  const saveNote = async (e) => {
    e.preventDefault(); // Mencegah refresh halaman saat submit form

    try {
      await axios.post("http://localhost:8080/create-notes", {
        title,
        content,
        tags,
      });
      navigate("/notes");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  // function add tags
  const addTag = () => {
    if (tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  // function remove tags
  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="relative p-6 bg-white rounded-lg shadow-lg max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl w-full mt-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-800">
        Notes
      </h1>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-gray-700">
        Add New Note
      </h2>

      <form onSubmit={saveNote}>
        <p className="text-sm text-red-500 mb-4">{msg}</p>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm text-sm outline-none bg-transparent"
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
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm text-sm outline-none bg-transparent"
              placeholder="Enter content"
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          {/* tags */}
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
                      <MdClose className="text-sm text-gray-600" />
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
                <MdAdd className="text-xl text-black hover:text-white" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 p-3 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAddNote;

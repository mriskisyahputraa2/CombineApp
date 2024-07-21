import User from "../models/UserModel.js";
import Note from "../models/NoteModel.js";
import { Op } from "sequelize";

// Function Get All Note
export const getAllNote = async (req, res) => {
  try {
    let response;

    if (req.role === "admin") {
      response = await Note.findAll({
        attributes: ["uuid", "title", "content", "tags", "isPinned"],
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Note.findAll({
        attributes: ["uuid", "title", "content", "tags", "isPinned"],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function Get Note By Id
export const getNoteById = async (req, res) => {};

// Function Create Note
export const createNote = async (req, res) => {
  const { title, content, tags, isPinned } = req.body;

  try {
    await Note.create({
      title: title,
      content: content,
      tags: tags,
      isPinned: isPinned,
      userId: req.userId,
    });
    res.status(200).json({ message: "Note created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function Update Note
export const updateNote = async (req, res) => {};

// Function Delete Note
export const deleteNote = async (req, res, next) => {};

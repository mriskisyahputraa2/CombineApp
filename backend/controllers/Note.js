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
export const getNoteById = async (req, res) => {
  try {
    const notes = await Note.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!notes) return res.status(404).json({ message: "Note not found" });

    let response;

    if (req.role === "admin") {
      response = await Note.findOne({
        attributes: ["uuid", "title", "content", "tags", "isPinned"],
        where: {
          id: notes.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Note.findOne({
        attributes: ["uuid", "title", "content", "tags", "isPinned"],
        where: {
          [Op.and]: [{ id: notes.id }, { userId: req.userId }],
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
export const updateNote = async (req, res) => {
  try {
    const notes = await Note.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!notes) return res.status(404).json({ message: "Note not found" });

    const { title, content, tags, isPinned } = req.body;

    if (req.role === "admin") {
      await Note.update(
        {
          title,
          content,
          tags,
          isPinned,
        },
        {
          where: { id: notes.id },
        }
      );
    } else {
      if (req.userId !== notes.userId) {
        return res
          .status(403)
          .json({ message: "Access restricted, you are not an admin" });
      }

      await Note.update(
        { title, content, tags, isPinned },
        {
          where: {
            [Op.and]: [{ id: notes.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function Delete Note
export const deleteNote = async (req, res) => {
  try {
    const notes = await Note.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!notes) return res.status(404).json({ message: "Note not found" });

    if (req.role === "admin") {
      await Note.destroy({
        where: {
          id: notes.id,
        },
      });
    } else {
      if (req.userId !== notes.userId) {
        return res
          .status(403)
          .json({ message: "Access restricted, you are not an admin" });
      }

      await Note.destroy({
        where: {
          [Op.and]: [{ id: notes.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import Note from "../models/NoteModel.js";
import { Op } from "sequelize"; // import operator
import User from "../models/UserModel.js"; // import model user

export const searchNote = async (req, res) => {
  // Validasi, mengecek apakah req user dan uuid ada atau tidak
  if (!req.user || !req.user.uuid) {
    return res.status(401).json({
      message: "Unauthorized: User information not available", // tampilkan pesan
    });
  }

  // Mendapatkan query yang dimasukkan pengguna
  const { query } = req.query;

  // Validasi query jika tidak ada
  if (!query) {
    return res.status(400).json({
      message: "Search query is required",
    });
  }

  try {
    // Mencari data user berdasarkan userId
    const user = await User.findOne({ where: { id: req.user.id } });

    let searchCriteria = {
      [Op.or]: [
        { title: { [Op.like]: `%${query}%` } },
        { content: { [Op.like]: `%${query}%` } },
      ],
    };

    // Jika pengguna adalah admin, mereka bisa melihat semua catatan
    if (user.role !== "admin") {
      searchCriteria.userId = req.user.id; // Hanya catatan pengguna tersebut
    }

    // Mencari data note yang cocok dengan query
    const matchingNotes = await Note.findAll({
      where: searchCriteria,
      include: [
        {
          model: User,
          attribute: ["name"],
        },
      ],
    });

    // Jika tidak ditemukan catatan yang cocok
    if (matchingNotes.length === 0) {
      return res.status(404).json({
        message: "No notes found matching the search query",
      });
    }

    // Jika cocok tampilkan datanya
    return res.json({
      notes: matchingNotes,
      message: "Notes matching the search query retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

import Note from "../models/NoteModel.js";
import { Op } from "sequelize"; // import opertor

export const searchNote = async (req, res) => {
  // validasi , mengecek apakah req user dan uuid ada atau tidak, jika tidak
  if (!req.user || !req.user.uuid) {
    return res.status(401).json({
      message: "Unauthorized: User information not available", // tampilkan pesan
    });
  }

  // mendapatkan query yang dimasukkan pengguna
  const { query } = req.query;

  // validasi query jika tidak ada
  if (!query) {
    return res.status(400).json({
      message: "Search query is required",
    });
  }

  try {
    // mencari(search) data note sesuai yang didatabase
    const matchingNotes = await Note.findAll({
      where: {
        userId: req.user.id, // berdasarkan user id

        // mencari catatan di mana title atau content cocok dengan query pencarian.
        [Op.or]: [
          // digunakan untuk pencarian substring yang case-insensitive dalam title atau content.
          { title: { [Op.like]: `%${query}%` } },
          { content: { [Op.like]: `%${query}%` } },
        ],
      },
    });

    // jika search note tidak ditemukan atau tidak cocok
    if (matchingNotes.length === 0) {
      return res.status(404).json({
        message: "No notes found matching the search query",
      });
    }

    // jika cocok tampilkan datanya
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

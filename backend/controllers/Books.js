import multer from "multer";
import path from "path";
import Book from "../models/BookModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

// konfiguration multer untuk upload gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/book/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Batas ukuran file 2MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Sorry, you can only enter JPG, JPEG, and PNG format images. "
        ),
        false
      );
    }
  },
});

// Middleware untuk menangani kesalahan ukuran file
const handleFileSizeError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ message: "Images should not be larger than 2MB" });
    }
  } else if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
};

// Function Get All Books
export const getAllBooks = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Book.findAll({
        attributes: ["uuid", "name", "genre", "deadline", "imageUrl"],
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Book.findAll({
        attributes: ["uuid", "name", "genre", "deadline", "imageUrl"],
        where: {
          userId: req.userId,
        },
        include: {
          model: User,
          attributes: ["name", "email"],
        },
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function Get Book By Id
export const getBooksById = async (req, res) => {
  try {
    const book = await Book.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!book) return res.status(404).json({ message: "Book not found" });

    let response;
    if (req.role === "admin") {
      response = await Book.findOne({
        attributes: ["uuid", "name", "genre", "deadline", "imageUrl"],
        where: {
          id: book.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Book.findOne({
        attributes: ["uuid", "name", "genre", "deadline", "imageUrl"],
        where: {
          [Op.and]: [{ id: book.id }, { userId: req.userId }],
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

// Function Create Books
export const createBooks = [
  upload.single("image"),
  handleFileSizeError,
  async (req, res) => {
    const { name, genre, deadline } = req.body;
    const imageUrl = req.file
      ? `http://localhost:8080/uploads/book/${req.file.filename}`
      : null;

    if (!name || !genre || !deadline) {
      return res.status(400).json({ message: "Please complete the data!" });
    }

    // Mengkonversi field deadline book menjadi object date
    const deadlineData = new Date(deadline);

    // Validasi, apakah deadlineDate adalah date yang valid, jika tidak maka tampilkan message
    if (isNaN(deadlineData)) {
      return res
        .status(400)
        .json({ message: "The date you entered is invalid!" });
    }

    // Inisialisasi tanggal saat ini
    const maxDeadlineDate = new Date();
    maxDeadlineDate.setDate(maxDeadlineDate.getDate() + 30); // kemudian menambahkan 30 hari ke tanggal tersebut untuk menentukan batas maksimal deadline.

    // Validasi, jika deadlineData lebih besar dari maxDeadlineDate yaitu 30 hari, maka tampilkan status 400 dan message
    if (deadlineData > maxDeadlineDate) {
      return res.status(400).json({
        message: "The deadline should not be more than 30 days from today",
      });
    }

    // Jika proses validasi berhasil, maka buatkan data 'book-nya'
    try {
      await Book.create({
        name: name,
        genre: genre,
        deadline: deadlineData, // tanggal yang sudah di konversi menjadi object
        userId: req.userId, // userId yang diambil inputan dari request userId
        imageUrl,
      });
      res.status(200).json({ message: "Book created successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

// Function Update Books
export const updateBooks = [
  upload.single("image"),
  handleFileSizeError,
  async (req, res) => {
    try {
      const book = await Book.findOne({
        where: {
          uuid: req.params.id,
        },
      });

      if (!book) return res.status(404).json({ message: "Book not found!" });

      const { name, genre, deadline } = req.body;

      const updateData = { name, genre, deadline };

      // Update image URL if a new image is uploaded
      if (req.file) {
        updateData.imageUrl = `http://localhost:8080/uploads/book/${req.file.filename}`;
      }

      const deadlineDate = new Date(deadline);

      if (isNaN(deadlineDate)) {
        return res
          .status(400)
          .json({ message: "The date you entered is invalid!" });
      }

      // Inisialisasi membuat date hari ini / tanggal dan waktu saat ini
      const today = new Date();

      // Validasi, jika deadlineDate atau tanggal deadline-nya sudah berlalu lebih kecil dari today, maka tampilkan status 400 dan message
      if (deadlineDate < today) {
        return res
          .status(400)
          .json({ message: "The date you entered has passed" });
      }

      updateData.deadline = deadlineDate;

      // Validasi, jika role pengguna ialah 'admin', maka role 'admin' bisa meng-update data yang dibuat `admin` dan `user`
      if (req.role === "admin") {
        await Book.update(updateData, {
          where: {
            id: book.id,
          },
        });

        // Jika role pengguna bukan 'admin' ialah 'user' dan ingin meng-update data yang dibuat `admin`, maka tidak bisa
      } else {
        if (req.userId !== book.userId) {
          return res
            .status(403)
            .json({ message: "Access restricted, you are not an admin" });
        }

        // Jika role pengguna ialah 'user' maka update data-nya
        await Book.update(updateData, {
          where: {
            [Op.and]: [{ id: book.id }, { userId: req.userId }],
          },
        });
      }
      res.status(200).json({ message: "Book updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

// Function Delete Books
export const deleteBooks = async (req, res) => {
  try {
    const book = await Book.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!book) return res.status(404).json({ message: "Book not found" });

    // Validasi, jika role pengguna ialah 'admin', maka role 'admin' bisa menghapus data yang dibuat `admin` dan `user`
    if (req.role === "admin") {
      await Book.destroy({
        where: {
          id: book.id,
        },
      });

      // Jika role pengguna bukan 'admin' ialah 'user' dan ingin menghapus data yang dibuat `admin`, maka tidak bisa
    } else {
      if (req.userId !== book.userId) {
        return res
          .status(403)
          .json({ message: "Access restricted, you are not an admin" });
      }

      // Jika role pengguna ialah 'user' maka hapus data-nya
      await Book.destroy({
        where: {
          [Op.and]: [{ id: book.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function extendDeadline untuk memperpanjang waktu deadline
export const extendDeadline = async (req, res) => {
  const { bookId, newDeadline } = req.body;

  if (req.role !== "admin") {
    return res.status(403).json({ message: "Akses dilarang: Hanya Admin" });
  }

  const newDeadlineDate = new Date(newDeadline);

  if (isNaN(newDeadlineDate)) {
    return res
      .status(400)
      .json({ message: "Tanggal yang kamu masukkan tidak valid" });
  }

  try {
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ message: "Buku tidak ditemukan" });
    }

    book.deadline = newDeadlineDate;
    await book.save();

    res.status(200).json({ message: "Deadline extended successfully", book });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

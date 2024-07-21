import Book from "../models/BookModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

// Function Get All Books
export const getAllBooks = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Book.findAll({
        attributes: ["uuid", "name", "genre", "deadline"],
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Book.findAll({
        attributes: ["uuid", "name", "genre", "deadline"],
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
    res.status(500).json({ messsage: error.message });
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
        attributes: ["uuid", "name", "genre", "deadline"],
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
        attributes: ["uuid", "name", "genre", "deadline"],
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
    res.status(500).json({ messsage: error.message });
  }
};

// Function Create Books
export const createBooks = async (req, res) => {
  const { name, genre, deadline } = req.body;

  if (!name || !genre || !deadline) {
    return res.status(400).json({ message: "Please complete the data!" });
  }

  // mengkonversi field deadline book menjadi object date
  const deadlineData = new Date(deadline);

  // validasi, apakah deadlineDate adalah date yang valid, jika tidak maka tampilkan message
  if (isNaN(deadlineData)) {
    return res
      .status(400)
      .json({ message: "The date you entered is invalid!" });
  }

  // inisialisasi tanggal saat ini
  const maxDeadlineDate = new Date();
  maxDeadlineDate.setDate(maxDeadlineDate.getDate() + 30); // kemudian menambahkan 30 hari ke tanggal tersebut untuk menentukan batas maksimal deadline.

  // validasi, jika deadlineData lebih besar dari maxDeadlineDate yaitu 30 hari, maka tampilkan status 400 dan message
  if (deadlineData > maxDeadlineDate) {
    return res.status(400).json({
      message: "The deadline should not be more than 30 days from today",
    });
  }

  // jika proses validasi berhasil, maka buatkan data 'book-nya'
  try {
    await Book.create({
      name: name,
      genre: genre,
      deadline: deadlineData, // tanggal yang sudah di konversi menjadi object
      userId: req.userId, // userId yang diambil inputan dari request userId
    });
    res.status(200).json({ message: "Book created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function Update Books
export const updateBooks = async (req, res) => {
  try {
    const book = await Book.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!book) return res.status(404).json({ message: "Book not found!" });

    const { name, genre, deadline } = req.body;

    const deadlineDate = new Date(deadline);

    if (isNaN(deadlineDate)) {
      return res
        .status(400)
        .json({ messsage: "The date you entered is invalid!" });
    }

    // inisialisasi membuat date hari ini / tanggal dan waktu saat ini
    const today = new Date();

    // validasi, jika deadlineDate atau tanggal deadline-nya sudah berlalu lebih kecil dari today, maka tampilkan status 400 dan message
    if (deadlineDate < today) {
      return res
        .status(400)
        .json({ messsage: "The date you entered has passed" });
    }

    // validasi, jika role pengguna ialah 'admin', maka role 'admin' bisa meng-update data yang dibuat `admin` dan `user`
    if (req.role === "admin") {
      await Book.update(
        { name, genre, deadline: deadlineDate },
        {
          where: {
            id: book.id,
          },
        }
      );

      // jika role pengguna bukan 'admin' ialah 'user' dan ingin meng-update data yang dibuat `admin`, maka tidak bisa
    } else {
      if (req.userId !== book.userId) {
        return res
          .status(403)
          .json({ messsage: "Access restricted, you are not an admin" });
      }

      // jika role pengguna ialah 'user' maka update data-nya
      await Book.update(
        { name, genre, deadline: deadlineDate },
        {
          where: {
            [Op.and]: [{ id: book.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({ messsage: "Book updated successfully" });
  } catch (error) {
    res.status(500).json({ messsage: error.message });
  }
};

// Function Delete Books
export const deleteBooks = async (req, res) => {
  try {
    const book = await Book.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!book) return res.status(404).json({ messsage: "Book not found" });

    // validasi, jika role pengguna ialah 'admin', maka role 'admin' bisa menghapus data yang dibuat `admin` dan `user`
    if (req.role === "admin") {
      await Book.destroy({
        where: {
          id: book.id,
        },
      });

      // jika role pengguna bukan 'admin' ialah 'user' dan ingin menghapus data yang dibuat `admin`, maka tidak bisa
    } else {
      if (req.userId !== book.userId) {
        return res
          .status(403)
          .json({ messsage: "Access restricted, you are not an admin" });
      }

      // jika role pengguna ialah 'user' maka hapus data-nya
      await Book.destroy({
        where: {
          [Op.and]: [{ id: book.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ messsage: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ messsage: error.message });
  }
};

export const extendDeadline = async (req, res) => {
  const { bookId, newDeadline } = req.body;

  if (req.role !== "admin") {
    return res.status(403).json({ messsage: "Akses dilarang: Hanya Admin" });
  }

  const newDeadlineDate = new Date(newDeadline);

  if (isNaN(newDeadlineDate)) {
    return res
      .status(400)
      .json({ messsage: "Tanggal yang kamu masukkan tidak valid" });
  }

  try {
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ messsage: "Buku tidak ditemukan" });
    }

    book.deadline = newDeadlineDate;
    await book.save();

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ messsage: error.message });
  }
};

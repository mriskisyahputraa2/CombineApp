import React from "react";
import addNotesImg from "../../assets/images/add-book.svg";

const EmptyBook = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10 rounded-lg">
      <img
        className="w-40 h-40 object-cover mb-4"
        src={addNotesImg}
        alt="No notes"
      />
      <p className="text-center text-lg font-semibold mb-4">
        Start borrowing your first books!
      </p>
      <p className="text-center text-gray-500 text-sm">
        Click the 'Add Books' button to add the book you want to borrow! Let's
        get started!
      </p>
    </div>
  );
};

export default EmptyBook;

import React from "react";
// import noDataImg from "../../assets/images/no-data.jpg";
import addNotesImg from "../../assets/images/add-note.svg";

const EmptyCard = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-20 p-6 rounded-lg">
      <img
        className="w-40 h-40 object-cover mb-4"
        src={addNotesImg}
        alt="No notes"
      />
      <p className="text-center text-lg font-semibold mb-4">
        Start creating your first note!
      </p>
      <p className="text-center text-gray-500 text-sm">
        Click the 'Add' button to jot down your thoughts, ideas, and reminders.
        Let's get started!
      </p>
    </div>
  );
};

export default EmptyCard;

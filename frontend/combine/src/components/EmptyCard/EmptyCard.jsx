import React from "react";
import noDataImg from "../../assets/images/no-data.jpg";
import addNotesImg from "../../assets/images/add-note.svg";

const EmptyCard = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      {/* <img className="w-60" src={noDataImg} alt="No notes" /> */}
      <img className="w-60" src={addNotesImg} alt="No notes" />
      <p>
        Start creating your first note! Click the 'Add' button to jot down your
        thoughts, ideas, and reminders. Let's get started!
      </p>
    </div>
  );
};

export default EmptyCard;

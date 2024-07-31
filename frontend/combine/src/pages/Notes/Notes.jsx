import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import NoteList from "../../components/NotesList/NoteList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getMe } from "../../features/authSlice";

const Notes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);
  return (
    <div>
      <Layout>
        <NoteList />
      </Layout>
    </div>
  );
};

export default Notes;

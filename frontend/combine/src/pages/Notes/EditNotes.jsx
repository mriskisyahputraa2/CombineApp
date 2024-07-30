import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getMe } from "../../features/authSlice";
import Layout from "../Layout/Layout";
import FormEditNote from "../../components/NotesList/FormEditNote";

const EditNotes = () => {
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
        <FormEditNote />
      </Layout>
    </div>
  );
};

export default EditNotes;

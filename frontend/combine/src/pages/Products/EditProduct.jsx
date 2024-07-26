import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import FormEditProduct from "../../components/ProductList/FormEditProduct";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getMe } from "../../features/authSlice";

const EditProduct = () => {
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
        <FormEditProduct />
      </Layout>
    </div>
  );
};

export default EditProduct;

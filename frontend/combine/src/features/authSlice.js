import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Function Thunks Asinkron untuk registrasi
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:8080/users", {
        name: user.name,
        email: user.email,
        password: user.password,
        confPassword: user.confPassword,
      });
      return response.data;
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Function Thunks Asinkron untuk login
export const LoginUser = createAsyncThunk(
  "user/LoginUser",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:8080/login", {
        email: user.email,
        password: user.password,
      });
      return response.data;
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkAPI.rejectWithValue(message);
      // const message = error.response.data.msg;
      // return thunkAPI.rejectWithValue(message);
    }
  }
);

// Function Get Me dari request backend untuk frontend
export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
  try {
    const response = await axios.get("http://localhost:8080/me");
    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

// Function Logout
export const logOut = createAsyncThunk("user/logOut", async () => {
  await axios.delete("http://localhost:8080/logout");
});

// Function AuthSlice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    // start app login
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
    });

    // login if success
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });

    // login if failed
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // start app GetMe
    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true;
    });

    // GetMe if success
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });

    // GetMe if failed
    builder.addCase(getMe.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // start app register
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });

    // register if success
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    });

    // register if failed
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = authSlice.actions; // reset di-export untuk mengatur ulang state

export default authSlice.reducer; // di-export sebagai default untuk digunakan dalam store Redux

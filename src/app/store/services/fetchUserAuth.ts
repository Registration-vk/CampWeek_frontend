import { $api } from "@/core/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface Access {
  access: boolean;
}

export const fetchUserAuth = createAsyncThunk<Access, void, { rejectValue: string }>(
  "login/getUserIdThunk",
  async (_, thunkApi) => {
    try {
      const response = await $api.post<Access>("/api/v1/user/check_access/");
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(`error: ${error}`);
    }
  },
);

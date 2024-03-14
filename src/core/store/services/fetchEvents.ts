"use client";
import { $api } from "@/core/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Meeting } from "../types/StateSchema";

export const fetchEvents = createAsyncThunk<Meeting[], void, { rejectValue: string }>(
  "events/getEvents",
  async (_, thunkApi) => {
    try {
      const response = await $api.get<Meeting[]>("/api/v1/event/");
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(`error: ${error}`);
    }
  },
);

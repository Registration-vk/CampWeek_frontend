"use client";
import { PayloadAction, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { EventSchema, EventsSchema, Meeting, StateSchema } from "../types/StateSchema";
import { fetchEvents } from "../services/fetchEvents";
import { compareArrays, getStoredCitiesIds } from "@/core/utils";
import { createInitialCities } from "@/components/ui/FiltersProfileWrapper/ui/FiltersProfileWrapper";
import { regionsId } from "@/feature/MeetingForm/static";

const eventsAdapter = createEntityAdapter({
  selectId: (event: Meeting) => event.id,
});

export const getEvents = eventsAdapter.getSelectors<StateSchema>(
  (state) => state.events || eventsAdapter.getInitialState(),
);

// const initialState: EventsSchema = {
//   events: [],
//   filteredEvents: [],
//   error: "",
//   isLoading: false,
//   roleFilters: [],
//   storedCities: [],
//   offset: 0,
//   limit: 6,
//   hasMore: true,
// };

export const eventsSlice = createSlice({
  name: "events",
  initialState: eventsAdapter.getInitialState<EventsSchema>({
    ids: [],
    entities: {},
    // events: [],
    regionIds: getStoredCitiesIds(),
    filteredEvents: [],
    error: "",
    isLoading: false,
    roleFilters: [],
    storedCities: [],
    offset: 0,
    limit: 6,
    hasMore: true,
  }),
  reducers: {
    addRoleFilter(state, action: PayloadAction<string[]>) {
      state.roleFilters = action.payload;
    },
    getFilteredEvents(state) {
      if (state.roleFilters.length > 0) {
        state.filteredEvents = Object.values(state.entities).filter((entity) => {
          return compareArrays(entity.roles.split(";"), state.roleFilters);
        });
        eventsAdapter.setAll(state, state.filteredEvents);
      }
    },
    setRegionIds(state, action: PayloadAction<string>) {
      state.regionIds = action.payload;
      eventsAdapter.setAll(state, []);
    },
    cancelRoleFilter(state) {
      state.roleFilters = [];
      eventsAdapter.setAll(state, Object.values(state.entities));
    },
    setOffset(state, action: PayloadAction<number>) {
      state.offset = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action: PayloadAction<Meeting[]>) => {
        state.isLoading = false;
        state.hasMore = action.payload.length > 0;
        eventsAdapter.addMany(state, action.payload);
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { actions: eventsActions } = eventsSlice;
export const { reducer: eventsReducer } = eventsSlice;

export const getAllEvents = (state: StateSchema) => state?.events;

export const getOffsetForEvents = (state: StateSchema) => state?.events.offset || 0;
export const getLimitForEvents = (state: StateSchema) => state?.events.limit || 6;
export const getCitiesIdsEvents = (state: StateSchema) => state?.events.regionIds || "";
// export const getRoleFiltersLength = (state: StateSchema) => state?.events.roleFilters.length || 0;

import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    activeNote: null
  },
  reducers: {
    addNewEmptyNote: (state, action) => {
      /* Note: It's not necessary to return a new state object here 
      since we are using Redux Toolkit */
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    setActiveNote: (state, action) => {
      state.activeNote = action.payload;
    },
    setNotes: (state, action) => {},
    setSaving: (state, action) => {},
    updateNote: (state, action) => {},
    deleteNoteById: (state, action) => {}
  }
});
//* These functions are not the same as the reducers we have defined above.
// Action creators are generated for each case reducer function
export const {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote
} = journalSlice.actions;

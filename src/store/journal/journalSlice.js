import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    savedNoteMessage: '',
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
      state.savedNoteMessage = '';
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setSaving: (state, action) => {
      state.isSaving = true;
      state.savedNoteMessage = '';
    },
    updateNote: (state, action) => {
      state.isSaving = false;

      const { id } = action.payload;
      const noteIndex = state.notes.findIndex((note) => note.id === id);

      state.notes[noteIndex] = action.payload;

      state.savedNoteMessage = `Note with title: ${action.payload.title}, was successfully saved!`;
    },
    setPhotosToActiveNote: (state, action) => {
      state.activeNote.imageUrls = [
        ...state.activeNote.imageUrls,
        ...action.payload
      ];
      state.isSaving = false;
    },
    clearNotesLogOut: (state, action) => {
      state.isSaving = false;
      state.savedNoteMessage = '';
      state.notes = [];
      state.activeNote = null;
    },
    deleteNoteById: (state, action) => {
      state.activeNote = null;
      const id = action.payload;
      const newNotes = state.notes.filter((note) => note.id !== id);
      state.notes = newNotes;
    }
  }
});
//* These functions are not the same as the reducers we have defined above.
// Action creators are generated for each case reducer function
export const {
  addNewEmptyNote,
  clearNotesLogOut,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote
} = journalSlice.actions;

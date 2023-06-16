import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
  setNotes,
  updateNote,
  setPhotosToActiveNote,
  clearNotesLogOut,
  deleteNoteById,
  journalSlice
} from '../../../src/store/journal/journalSlice';
import {
  demoNotes,
  initialState,
  withNotesState,
  withActiveNoteState
} from '../../fixtures/journalFixtures';

jest.mock('../../../src/firebase/config', () => ({
  FirebaseDB: jest.fn()
}));

jest.mock('../../../src/store/journal', () => ({
  uploadFile: jest.fn()
}));

describe('Tests on journalSlice', () => {
  it('should return the initial state', () => {
    // console.log(journalSlice);

    expect(journalSlice.name).toBe('journal');

    const state = journalSlice.reducer(initialState, {});

    // console.log(state);

    expect(state).toEqual(initialState);
  });

  it('should add a new empty note', () => {
    const note = {
      title: '',
      body: '',
      imageUrls: [],
      date: 0
    };

    const state = journalSlice.reducer(initialState, addNewEmptyNote(note));

    expect(state.isSaving).toBe(false);

    expect(state).toEqual({
      activeNote: null,
      isSaving: false,
      notes: [
        {
          body: '',
          date: 0,
          imageUrls: [],
          title: ''
        }
      ],
      savedNoteMessage: ''
    });
    expect(state.notes.length).toBe(1);
  });

  it('should save a new note', () => {
    const state = journalSlice.reducer(initialState, savingNewNote());

    expect(state.isSaving).toBe(true);
  });

  it('should set the current note into the state', () => {
    const currentNote = demoNotes[0];

    const state = journalSlice.reducer(
      initialState,
      setActiveNote(currentNote)
    );

    expect(state.activeNote).toEqual(currentNote);

    expect(state.savedNoteMessage).toBe('');
  });

  it('should set all the notes into the state', () => {
    const state = journalSlice.reducer(initialState, setNotes(demoNotes));

    expect(state.notes).toEqual(demoNotes);

    expect(state.notes.length).toBeGreaterThan(0);
  });

  it('should update a note that is currently on the notes state', () => {
    const noteUpdated = {
      id: '1',
      title: 'Demo Note 1 Updated',
      body: 'This is the body of demo note 1',
      imageUrls: [],
      date: 0
    };

    const state = journalSlice.reducer(withNotesState, updateNote(noteUpdated));

    expect(state.notes[0].title).toBe(noteUpdated.title);

    expect(state.savedNoteMessage).toBe(
      `Note with title: ${noteUpdated.title}, was successfully saved!`
    );
  });
  it('should set the photos to an active note', () => {
    const imageUrls = ['image1.jpg', 'image2.jpg'];

    const state = journalSlice.reducer(
      withActiveNoteState,
      setPhotosToActiveNote(imageUrls)
    );

    expect(state.activeNote.imageUrls).toEqual(imageUrls);
    expect(state.activeNote.imageUrls.length).toBeGreaterThan(0);
  });

  it('should clear the notes when the user logs out', () => {
    const state = journalSlice.reducer(
      withNotesState,
      clearNotesLogOut(clearNotesLogOut)
    );

    expect(state.notes.length).toBe(0);
  });

  // deleteNoteById

  it('should delete a note by id', () => {
    const id = '1';
    const state = journalSlice.reducer(withNotesState, deleteNoteById(id));
    expect(state.notes.length).toBeLessThan(2);
  });
});

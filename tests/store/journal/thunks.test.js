import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite';
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote
} from '../../../src/store/journal/journalSlice';
import {
  startNewNote,
  startLoadingNotes,
  startSaveNote,
  startDeletingNote
} from '../../../src/store/journal/thunks';
import { FirebaseDB } from '../../../src/firebase/config';
import { authenticatedState } from '../../fixtures/authFixtures';
import { demoNotes } from '../../fixtures/journalFixtures';

// jest.mock('../../../src/firebase/config', () => ({
//   FirebaseAuth: jest.fn()
// }));

// jest.mock('../../../src/helpers/uploadFile', () => ({
//   uploadFile: jest.fn()
// }));

describe('Tests on Journal Thunks', () => {
  const dispatch = jest.fn();
  const getState = jest.fn();
  const uid = 'TEST-UID';

  beforeEach(() => jest.clearAllMocks());
  it('should add a new empty note', async () => {
    getState.mockReturnValue({ auth: { uid: uid } });

    await startNewNote()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(savingNewNote());

    expect(dispatch).toHaveBeenCalledWith(
      addNewEmptyNote({
        body: '',
        title: '',
        imageUrls: [],
        id: expect.any(String),
        date: expect.any(Number)
      })
    );

    expect(dispatch).toHaveBeenCalledWith(
      setActiveNote({
        title: '',
        body: '',
        imageUrls: [],
        id: expect.any(String),
        date: expect.any(Number)
      })
    );

    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);

    const deletePromises = [];

    docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref)));

    await Promise.all(deletePromises);
  });

  it('should throw an error while start loading notes if user is not found', async () => {
    getState.mockReturnValue({ auth: { uid: null } });

    try {
      await startLoadingNotes()(dispatch, getState);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty('message', 'User not found');
    }
  });
  it('should start loading notes if user is found', async () => {
    getState.mockReturnValue({ auth: { uid: uid } });

    await startLoadingNotes()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(setNotes([]));
  });
  it('should start saving note if user is found', async () => {
    getState.mockReturnValue({
      auth: { uid: uid },
      journal: { activeNote: demoNotes[0] }
    });

    await startSaveNote()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(updateNote(demoNotes[0]));

    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);

    const deletePromises = [];

    docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref)));

    await Promise.all(deletePromises);
  });
  it('should start deleting notes if user is found', async () => {
    getState.mockReturnValue({
      auth: { uid: uid },
      journal: { activeNote: demoNotes[0] }
    });

    await startDeletingNote()(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith(deleteNoteById(demoNotes[0].id));
  });
});

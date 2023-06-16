import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite';
import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote
} from '../../../src/store/journal/journalSlice';
import { startNewNote } from '../../../src/store/journal/thunks';
import { FirebaseDB } from '../../../src/firebase/config';

// jest.mock('../../../src/firebase/config', () => ({
//   FirebaseAuth: jest.fn()
// }));

// jest.mock('../../../src/helpers/uploadFile', () => ({
//   uploadFile: jest.fn()
// }));

describe('Tests on Journal Thunks', () => {
  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => jest.clearAllMocks());
  it('should add a new empty note', async () => {
    const uid = 'TEST-UID';

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
});

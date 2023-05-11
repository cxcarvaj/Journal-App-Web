import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote
} from './journalSlice';
import { loadNotes, uploadFile } from '../../helpers';

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());

    const { uid } = getState().auth;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    if (!uid) throw new Error('User not found');

    const notes = await loadNotes(uid);

    dispatch(setNotes(notes));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { activeNote } = getState().journal;

    const noteToSave = { ...activeNote };

    delete noteToSave.id;

    const noteRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);

    await setDoc(noteRef, noteToSave, { merge: true });

    dispatch(updateNote(activeNote));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());

    const uploadFilePromises = [];

    for (const file of files) {
      // * We are not using the await keyword here because we want to upload all the files at the same time
      // * Here we are pushing the promise returned by the uploadFile function and not executing the function
      uploadFilePromises.push(uploadFile(file));
    }

    // * We are using Promise.all to wait for all the promises to be resolved
    // * Promise.all returns an array with the results of each promise
    // * This works perfectly when we want to make multiple requests at the same time
    const photosUrls = await Promise.all(uploadFilePromises);

    dispatch(setPhotosToActiveNote(photosUrls));
  };
};

export const demoNotes = [
  {
    id: '1',
    title: 'Demo Note 1',
    body: 'This is the body of demo note 1',
    imageUrls: [],
    date: 0
  },
  {
    id: '2',
    title: 'Demo Note 2',
    body: 'This is the body of demo note 2',
    imageUrls: [],
    date: 0
  }
];

export const initialState = {
  isSaving: false,
  savedNoteMessage: '',
  notes: [],
  activeNote: null
};

export const withNotesState = {
  isSaving: false,
  savedNoteMessage: '',
  notes: demoNotes,
  activeNote: null
};

export const withActiveNoteState = {
  isSaving: false,
  savedNoteMessage: '',
  notes: demoNotes,
  activeNote: demoNotes[1]
};

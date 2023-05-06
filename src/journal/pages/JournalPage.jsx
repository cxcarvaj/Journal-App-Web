import { Typography } from '@mui/material';

import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { FloatingButton } from '../components';
import { useSelector } from 'react-redux';

export const JournalPage = () => {
  const { activeNote } = useSelector((state) => state.journal);
  return (
    <JournalLayout>
      {Boolean(activeNote) ? <NoteView /> : <NothingSelectedView />}
      <FloatingButton />
    </JournalLayout>
  );
};

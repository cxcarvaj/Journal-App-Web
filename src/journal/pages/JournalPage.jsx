import { Typography } from '@mui/material';

import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { FloatingButton } from '../components';

export const JournalPage = () => {
  return (
    <JournalLayout>
      {/* <NothingSelectedView /> */}
      <NoteView />
      <FloatingButton />
    </JournalLayout>
  );
};

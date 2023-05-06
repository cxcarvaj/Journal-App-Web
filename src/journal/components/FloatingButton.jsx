import { useDispatch, useSelector } from 'react-redux';

import { AddOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { startNewNote } from '../../store/journal';

export const FloatingButton = () => {
  const dispatch = useDispatch();

  const { isSaving } = useSelector((state) => state.journal);

  const onClickNewNote = () => {
    dispatch(startNewNote());
  };

  return (
    <IconButton
      size="large"
      disabled={isSaving}
      sx={{
        color: 'white',
        backgroundColor: 'error.main',
        ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
        position: 'fixed',
        right: 50,
        bottom: 40
      }}
      onClick={onClickNewNote}
    >
      <AddOutlined sx={{ fontSize: 30 }} />
    </IconButton>
  );
};

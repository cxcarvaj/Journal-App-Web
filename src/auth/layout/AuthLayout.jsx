import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export const AuthLayout = ({ children, title }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
    >
      <Grid
        item
        className="box-shadow"
        xs={12}
        sm={6}
        md={4}
        sx={{
          width: { xs: 500 },
          backgroundColor: 'white',
          padding: 3,
          borderRadius: 2
        }}
      >
        <Typography variant="h5" sx={{ mb: 1 }}>
          {title}
        </Typography>

        {children}
      </Grid>
    </Grid>
  );
};

AuthLayout.propTypes = {
  title: PropTypes.string.isRequired
};

AuthLayout.defaultProps = {
  title: 'Login'
};

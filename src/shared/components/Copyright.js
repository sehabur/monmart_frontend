import { Link, Typography } from '@mui/material';
import { Box } from '@mui/system';

const Copyright = (props) => {
  return (
    <Box sx={{ width: '100%', bgcolor: 'monmartBlue.main', py: 2, mt: 5 }}>
      <Typography
        variant="body2"
        color="common.white"
        align="center"
        {...props}
      >
        {'Copyright © '}
        <Link
          color="inherit"
          href="#"
          component={Typography}
          sx={{ display: 'inline' }}
        >
          Monmart.com
        </Link>{' '}
        2022
        {'.'}
      </Typography>
    </Box>
  );
};

export default Copyright;

import { AppBar, Typography, Box } from '@mui/material';

export default function NavBar() {
    return (
      <Box sx={{ flexGrow: 1}}>
        <AppBar position="static">
            <Typography variant="h6" align="center" component="div" sx={{ flexGrow: 1}}>
              Housing Data
            </Typography>
        </AppBar>
      </Box>
    );
  }
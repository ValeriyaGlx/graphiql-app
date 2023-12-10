import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    fontFamily: 'Inconsolata, monospace',
  },
  components: {
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          backgroundColor: '#ff05ea',
          borderRadius: '0',
          justifyContent: 'center',
          '&:hover': {
            backgroundColor: 'none',
          },
          '& .MuiToggleButtonGroup-grouped:not(:first-of-type)': {
            borderLeft: '0',
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          '&.Mui-selected': {
            color: 'white',
            backgroundColor: '#2f2746',
            borderRadius: '0',
            border: '5px solid #ff05ea',
            '&:hover': {
              backgroundColor: '#2f2746',
            },
          },
        },
      },
    },
  },
});

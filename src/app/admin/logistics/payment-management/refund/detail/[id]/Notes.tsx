import React from 'react';
import { Box, Typography, TextField } from '@mui/material';

interface NotesProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const Notes: React.FC<NotesProps> = ({
  value = '',
  onChange,
  placeholder = 'Enter your notes here...',
  disabled = false,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography
        component="label"
        variant="body1"
        sx={{
          display: 'block',
          mb: 1,
          color: '#666',
          fontSize: '14px',
          fontWeight: 500,
        }}
      >
        Notes
      </Typography>
      <TextField
        multiline
        fullWidth
        minRows={3}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#fff',
            borderRadius: '4px',
            '& fieldset': {
              borderColor: '#e0e0e0',
              borderWidth: '1px',
            },
            '&:hover fieldset': {
              borderColor: '#bdbdbd',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#9e9e9e',
            },
          },
          '& .MuiOutlinedInput-input': {
            padding: '12px 14px',
            fontSize: '14px',
            lineHeight: 1.5,
            color: '#333',
          },
        }}
        InputProps={{
          sx: {
            padding: 0,
          },
        }}
      />
    </Box>
  );
};

export default Notes;

// Usage example:
// function MyComponent() {
//   const [notes, setNotes] = React.useState('Loreal ipsumLoreal ipsums Loreal ipsums Loreal ipsums Loreal ipsums\nloreal Loreal ipsums Loreal ipsums Loreal ipsums Loreal ipsums Loreal ipsums Lors');
//   return <Notes value={notes} onChange={setNotes} />;
// }
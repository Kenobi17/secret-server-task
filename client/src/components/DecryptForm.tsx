import { useState, ChangeEvent } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Secret } from '../interfaces';

interface Props {
  updateDecrypted: (newSecret: Secret) => void;
}

const API_URL = process.env.REACT_APP_BASE_URL || '';

const DecryptForm = ({ updateDecrypted }: Props): JSX.Element => {
  const [hash, setHash] = useState('');

  const handleHashChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHash(event.target.value as string);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${API_URL}/secret/${hash}`);
      const data = await response.json();
      if (data === 'Secret not found') {
        toast.error('Secret not found');
      } else if (data === 'Secret expired') {
        toast.error('Secret expired');
      } else {
        updateDecrypted(data as Secret);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="DecryptForm">
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off">
        <TextField
          id="hash"
          label="Hash"
          variant="outlined"
          value={hash}
          onChange={handleHashChange}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Decrypt
        </Button>
      </Box>
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default DecryptForm;

import { useState, ChangeEvent } from 'react';
import {
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { Secret } from '../interfaces';

interface Props {
  updateSecrets: (newSecret: Secret) => void;
}

const SecretForm = ({ updateSecrets }: Props): JSX.Element => {
  const [expireAfter, setExpireAfter] = useState('');
  const [secret, setSecret] = useState('');

  const handleSelectChange = (event: SelectChangeEvent) => {
    setExpireAfter(event.target.value as string);
  };

  const handleSecretChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSecret(event.target.value as string);
  };

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:4000/secret', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        expireAfter,
        secret,
      }),
    });
    const data = (await response.json()) as Secret;
    updateSecrets(data);
  };

  const menuItems = [];

  for (let i = 1; i <= 15; i++) {
    menuItems.push(
      <MenuItem key={i} value={i}>
        {i} seconds
      </MenuItem>
    );
  }

  return (
    <div className="SecretForm">
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off">
        <TextField
          id="secret"
          label="Secret"
          variant="outlined"
          value={secret}
          onChange={handleSecretChange}
        />
        <FormControl fullWidth>
          <InputLabel id="expireAfter">Expire after</InputLabel>
          <Select
            labelId="expireAfter"
            id="select-expireAfter"
            value={expireAfter}
            label="Expire After"
            onChange={handleSelectChange}>
            <MenuItem value={0}>Never</MenuItem>
            {menuItems}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default SecretForm;

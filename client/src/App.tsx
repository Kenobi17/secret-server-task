import { FC, useState } from 'react';
import SecretForm from './components/SecretForm';
import SecretsTable from './components/SecretsTable';
import DecryptForm from './components/DecryptForm';
import { Secret } from './interfaces';

import './App.css';
import DecryptedTable from './components/DecryptedTable';
import { Grid } from '@mui/material';

const App: FC = (): JSX.Element => {
  const [secrets, setSecrets] = useState<Secret[]>([]);
  const [decryptedSecrets, setDecryptedSecrets] = useState<Secret[]>([]);

  const updateSecrets = (newSecret: Secret) => {
    setSecrets([...secrets, newSecret]);
    localStorage.setItem('secrets', JSON.stringify(secrets));
  };

  const updateDecrypted = (newSecret: Secret) => {
    setDecryptedSecrets([...decryptedSecrets, newSecret]);
    localStorage.setItem('decryptedSecrets', JSON.stringify(decryptedSecrets));
  };

  const clearSecrets = () => {
    setSecrets([]);
    localStorage.setItem('secrets', JSON.stringify([]));
  };

  const clearDecryptedSecrets = () => {
    setDecryptedSecrets([]);
    localStorage.setItem('decryptedSecrets', JSON.stringify([]));
  };

  return (
    <div className="App">
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center">
        <Grid className="encrypt" item xs={12}>
          <SecretForm updateSecrets={updateSecrets} />
          <SecretsTable secrets={secrets} clearSecrets={clearSecrets} />
        </Grid>
        <Grid className="decrypt" item xs={12}>
          <DecryptForm updateDecrypted={updateDecrypted} />
          <DecryptedTable
            decryptedSecrets={decryptedSecrets}
            clearDecryptedSecrets={clearDecryptedSecrets}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;

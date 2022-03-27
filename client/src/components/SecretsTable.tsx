import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import moment from 'moment';
import { Secret } from '../interfaces';

interface Props {
  secrets: Secret[];
  clearSecrets: () => void;
}

const SecretsTable = ({ secrets, clearSecrets }: Props): JSX.Element => {
  const never = moment(new Date(0)).format('YYYY-MM-DD');
  return (
    <div className="SecretsTable">
      <TableContainer component={Paper} sx={{ textAlign: 'center' }}>
        <Table
          sx={{ minWidth: 650, alignSelf: 'center' }}
          size="small"
          aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Hash</TableCell>
              <TableCell align="right">Encrypted Text</TableCell>
              <TableCell align="right">Expires At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {secrets.map((secret) => (
              <TableRow
                key={secret.hash}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {secret.hash}
                </TableCell>
                <TableCell align="right">{secret.secretText}</TableCell>
                <TableCell align="right">
                  {moment(secret.expiresAt).format('YYYY-MM-DD') === never
                    ? 'Never'
                    : moment(secret.expiresAt).format('YYYY MM DD | HH:mm:ss')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="error" onClick={clearSecrets}>
        Clear secrets
      </Button>
    </div>
  );
};

export default SecretsTable;

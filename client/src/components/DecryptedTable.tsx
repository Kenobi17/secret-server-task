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
  decryptedSecrets: Secret[];
  clearDecryptedSecrets: () => void;
}

const DecryptedTable = ({
  decryptedSecrets,
  clearDecryptedSecrets,
}: Props): JSX.Element => {
  return (
    <div className="DecryptedTable">
      <TableContainer component={Paper} sx={{ textAlign: 'center' }}>
        <Table
          sx={{ minWidth: 650, alignSelf: 'center' }}
          size="small"
          aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Hash</TableCell>
              <TableCell align="right">Decrypted Text</TableCell>
              <TableCell align="right">Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {decryptedSecrets.map((secret) => (
              <TableRow
                key={secret.hash}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {secret.hash}
                </TableCell>
                <TableCell align="right">{secret.secretText}</TableCell>
                <TableCell align="right">
                  {moment(secret.createdAt).format('YYYY MM DD | HH:mm:ss')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="error" onClick={clearDecryptedSecrets}>
        Clear Decrypted
      </Button>
    </div>
  );
};

export default DecryptedTable;

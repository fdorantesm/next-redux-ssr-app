import {
  Button,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export function DatatTable(props: Props) {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table aria-label="collapsible table" size="medium">
        <TableHead>
          <TableRow>
            {props.headers.map((label, index) => (
              <TableCell key={index}>{label}</TableCell>
            ))}
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.items.map((row: any) => {
            return (
              <TableRow
                key={row.uuid}
                sx={{ "& > *": { borderBottom: "unset" } }}
              >
                <TableCell component="th" scope="row">
                  {row.profile.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.email}
                </TableCell>
                <TableCell>
                  <Switch
                    name="isActive"
                    value={row.uuid}
                    checked={row.isActive}
                    inputProps={{ "aria-label": "controlled" }}
                    size={"small"}
                    color={"success"}
                  />
                </TableCell>
                <TableCell>
                  <Button>
                    <EditIcon></EditIcon>
                  </Button>
                  <Button>
                    <DeleteIcon></DeleteIcon>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

interface Props {
  items: any[];
  headers: string[];
}

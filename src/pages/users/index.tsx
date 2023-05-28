import {
  Alert,
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
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { Layout } from "src/layout/default";
import { getUsers } from "src/services/api/users/get-users";
import { User } from "src/types/user.type";
import { Page } from "src/components/page";
import { If } from "src/components/if";
import { withAuth } from "src/hofs/with-auth";

export default function () {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <Layout>
      <Page title="Usuarios">
        <If condition={users?.length === 0}>
          <Alert color="info">No se ha creado ningún usuario</Alert>
        </If>
        <If condition={users?.length > 0}>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Activo</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((row: User) => (
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
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </If>
      </Page>
    </Layout>
  );
}

export const getServerSideProps = withAuth((ctx: any) => {
  return {
    props: {},
  };
});

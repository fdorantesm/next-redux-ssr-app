import {
  Alert,
  Button,
  IconButton,
  Paper,
  Stack,
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
import AddIcon from "@mui/icons-material/Add";

import { Layout } from "src/layout/default";
import { getUsers } from "src/services/api/users/get-users";
import { User } from "src/types/user.type";
import { Page } from "src/components/page";
import { If } from "src/components/if";
import { withAuth } from "src/hofs/with-auth";
import { UpdateUserModal } from "src/components/modals/users/update-user.modal";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [updateUserModalStatus, setUpdateUserModalStatus] = useState(false);
  const [updateUserCurrentId, setUpdateUserCurrentId] = useState("");

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const handleUpdateUserButtonClick = (e: any) => {
    const target = e.currentTarget;
    const uuid = target.dataset.uuid;
    setUpdateUserCurrentId(uuid);
    setUpdateUserModalStatus(true);
  };

  const handleUpdateUserModalClose = () => {
    setUpdateUserModalStatus(false);
  };

  const handleUpdateUserModalCancel = () => {
    setUpdateUserModalStatus(false);
  };

  const handleUpdateUserModalSubmit = (user: User) => {
    console.log({ user });
    setUpdateUserModalStatus(false);
  };

  return (
    <>
      <Layout>
        <Page title="Usuarios">
          <Stack justifyContent={"end"} alignItems={"end"} mb={2}>
            <Button color="success" variant="contained" size="small">
              <AddIcon /> Agregar
            </Button>
          </Stack>
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
                    <TableCell>Teléfono</TableCell>
                    <TableCell
                      sx={{ fontWeight: 600 }}
                      width={100}
                      align="right"
                    >
                      Activo
                    </TableCell>
                    <TableCell width={150}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((row: User) => (
                    <TableRow
                      key={row.uuid}
                      sx={{ "& > *": { borderBottom: "unset" } }}
                    >
                      <TableCell component="th" scope="row">
                        {row?.profile?.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.email}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row?.profile?.phone}
                      </TableCell>
                      <TableCell align="right" width={100}>
                        <Switch
                          name="isActive"
                          value={row.uuid}
                          checked={row.isActive}
                          inputProps={{ "aria-label": "controlled" }}
                          size={"small"}
                          color={"success"}
                        />
                      </TableCell>
                      <TableCell align="right" width={100}>
                        <Stack justifyContent={"end"} direction={"row"}>
                          <IconButton
                            data-uuid={row.uuid}
                            color="inherit"
                            size="small"
                            onClick={handleUpdateUserButtonClick}
                          >
                            <EditIcon></EditIcon>
                          </IconButton>
                          <IconButton color="error" size="small">
                            <DeleteIcon></DeleteIcon>
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </If>
        </Page>
      </Layout>
      <UpdateUserModal
        isOpen={updateUserModalStatus}
        onClose={handleUpdateUserModalClose}
        onCancel={handleUpdateUserModalCancel}
        onCreate={handleUpdateUserModalSubmit}
        userId={updateUserCurrentId}
      />
    </>
  );
}

export const getServerSideProps = withAuth((ctx: any) => {
  return {
    props: {},
  };
});

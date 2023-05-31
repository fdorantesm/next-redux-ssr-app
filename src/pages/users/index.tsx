import {
  Alert,
  Button,
  IconButton,
  LinearProgress,
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
import { useConfirm } from "material-ui-confirm";

import { Layout } from "src/layout/default";
import { getUsers } from "src/services/api/users/get-users";
import { User } from "src/types/user.type";
import { Page } from "src/components/page";
import { If } from "src/components/if";
import { withAuth } from "src/hofs/with-auth";
import { UpdateUserModal } from "src/components/modals/users/update-user.modal";
import { replaceElementAtIndex } from "src/services/api/utils/array-replace-element.util";
import { updateUser } from "src/services/api/users/update-user.service";
import { deleteUser } from "src/services/api/users/delete-user.service";
import { AddUserModal } from "src/components/modals/users/add-user.modal";
import { UserListSkeleton } from "src/components/skeletons/users-list.skeleton";
import { Skeleton } from "src/components/skeleton";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [updateUserModalStatus, setUpdateUserModalStatus] = useState(false);
  const [addUserModalStatus, setAddUserModalStatus] = useState(false);
  const [updateUserCurrentId, setUpdateUserCurrentId] = useState("");
  const [loading, setLoading] = useState(true);
  const confirm = useConfirm();

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = (row: User) => {
    setUpdateUserCurrentId(row.uuid);
    setUpdateUserModalStatus(true);
  };

  const handleUpdateUserModalClose = () => {
    setUpdateUserModalStatus(false);
  };

  const handleUpdateUserModalCancel = () => {
    setUpdateUserModalStatus(false);
  };

  const handleUpdateUserModalSubmit = (updatedUser: User) => {
    const index = users.findIndex((user) => user.uuid === updatedUser.uuid);
    if (index >= 0) {
      const updatedCollection = replaceElementAtIndex(
        users,
        index,
        updatedUser
      );
      setUsers(updatedCollection);
      setUpdateUserCurrentId("");
      setUpdateUserModalStatus(false);
    }
  };

  const toogleStatus = async (user: User) => {
    try {
      const index = users.findIndex((item) => user.uuid === item.uuid);
      const isActive = user?.isActive;
      const message = `Estás a punto de ${
        isActive ? "desactivar" : "activar"
      } al usuario ${user?.email}.`;
      await confirm({
        title: "¡Atención!",
        description: message,
        cancellationText: "Cancelar",
        confirmationText: "Confirmar",
        buttonOrder: ["cancel", "confirm"],
        confirmationButtonProps: {
          color: "error",
          variant: "contained",
        },
        cancellationButtonProps: {
          color: "inherit",
        },
      });

      const updatedUser = await updateUser(user.uuid, {
        isActive: !user.isActive,
      });

      setUsers(replaceElementAtIndex(users, index, updatedUser!));
    } catch (error) {}
  };

  const handleDelete = async (user: User) => {
    const message = `Estás a punto de eliminar al usuario ${user?.email}.`;
    try {
      await confirm({
        title: "¡Atención!",
        description: message,
        cancellationText: "Cancelar",
        confirmationText: "Confirmar",
        buttonOrder: ["cancel", "confirm"],
        confirmationButtonProps: {
          color: "error",
          variant: "contained",
        },
        cancellationButtonProps: {
          color: "inherit",
        },
      });

      await deleteUser(user.uuid);

      const updatedUsersList = users.filter((item) => item.uuid !== user.uuid);

      setUsers(updatedUsersList);
    } catch (error) {
      console.log("error", error);
    }
  };

  const addUserModalOnClose = () => {
    setAddUserModalStatus(false);
  };

  const addUserModalOnCancel = () => {
    setAddUserModalStatus(false);
  };

  const addUserModalOnCreate = (user: User) => {
    setUsers([...users, user]);
    setAddUserModalStatus(false);
  };

  const handleAddUserButtonClick = () => {
    setAddUserModalStatus(true);
  };

  return (
    <>
      <Layout>
        <Page title="Usuarios">
          <Stack justifyContent={"end"} alignItems={"end"} mb={2}>
            <Button
              color="success"
              variant="contained"
              size="medium"
              onClick={handleAddUserButtonClick}
            >
              <AddIcon /> Agregar
            </Button>
          </Stack>
          <>
            {!loading && users.length === 0 && (
              <Alert color="info">No se ha creado ningún usuario</Alert>
            )}
          </>
          <>
            <TableContainer component={Paper} variant="outlined">
              <Table aria-label="collapsible table" size="medium">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>
                      <Skeleton loading={loading}>Nombre</Skeleton>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>
                      <Skeleton loading={loading}>Email</Skeleton>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>
                      <Skeleton loading={loading}>Teléfono</Skeleton>
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 600 }}
                      width={100}
                      align="right"
                    >
                      <Skeleton loading={loading}>Nombre</Skeleton>
                    </TableCell>
                    <TableCell width={150}>
                      <Skeleton loading={loading}>{""}</Skeleton>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((row: User) => (
                    <TableRow
                      key={row.uuid}
                      sx={{ "& > *": { borderBottom: "unset" } }}
                    >
                      <TableCell component="th" scope="row">
                        <Skeleton loading={loading}>
                          {row?.profile?.name}
                        </Skeleton>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Skeleton loading={loading}>{row.email}</Skeleton>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Skeleton loading={loading}>
                          {row?.profile?.phone}
                        </Skeleton>
                      </TableCell>
                      <TableCell align="right" width={100}>
                        <Skeleton loading={loading}>
                          <Switch
                            name="isActive"
                            value={row.uuid}
                            checked={row.isActive}
                            inputProps={{ "aria-label": "controlled" }}
                            size={"small"}
                            color={"success"}
                            onClick={() => toogleStatus(row)}
                          />
                        </Skeleton>
                      </TableCell>
                      <TableCell align="right" width={100}>
                        <Skeleton loading={loading}>
                          <Stack
                            justifyContent={"end"}
                            direction={"row"}
                            spacing={1}
                          >
                            <IconButton
                              color="inherit"
                              size="small"
                              onClick={() => handleEdit(row)}
                            >
                              <EditIcon></EditIcon>
                            </IconButton>
                            <IconButton
                              color="error"
                              size="small"
                              onClick={() => handleDelete(row)}
                            >
                              <DeleteIcon></DeleteIcon>
                            </IconButton>
                          </Stack>
                        </Skeleton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        </Page>
      </Layout>
      {updateUserCurrentId && (
        <UpdateUserModal
          isOpen={updateUserModalStatus}
          onClose={handleUpdateUserModalClose}
          onCancel={handleUpdateUserModalCancel}
          onCreate={handleUpdateUserModalSubmit}
          userId={updateUserCurrentId}
        />
      )}
      <AddUserModal
        isOpen={addUserModalStatus}
        onClose={addUserModalOnClose}
        onCancel={addUserModalOnCancel}
        onCreate={addUserModalOnCreate}
      />
    </>
  );
}

export const getServerSideProps = withAuth((ctx: any) => {
  return {
    props: {},
  };
});

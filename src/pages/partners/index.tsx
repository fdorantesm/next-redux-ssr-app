import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Switch,
  Button,
  Alert,
  IconButton,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { useConfirm } from "material-ui-confirm";

import { If } from "src/components/if";
import { Page } from "src/components/page";
import { withAuth } from "src/hofs/with-auth";
import { Layout } from "src/layout/default";
import { getPartners } from "src/services/api/partners/get-partners.service";
import { User } from "src/types/user.type";
import { Skeleton } from "src/components/skeleton";
import { arrayFrom } from "src/utils/array-from.util";
import { deletePartner } from "src/services/api/partners/delete-partner.service";
import { replaceElementAtIndex } from "src/services/api/utils/array-replace-element.util";
import { updatePartner } from "src/services/api/partners/update-partner.service";
import { UpdatePartnerModal } from "src/components/modals/partners/update-partner.modal";
import { AddPartnerModal } from "src/components/modals/partners/add-partner.modal";

export default function Partners() {
  const [partners, setPartners] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [updateUserModalStatus, setUpdateUserModalStatus] = useState(false);
  const [addUserModalStatus, setAddUserModalStatus] = useState(false);
  const [updatePartnerCurrentId, setUpdatePartnerCurrentId] = useState("");
  const confirm = useConfirm();

  useEffect(() => {
    getPartners()
      .then(setPartners)
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = (row: User) => {
    setUpdatePartnerCurrentId(row.uuid);
    setUpdateUserModalStatus(true);
  };

  const handleUpdateUserModalClose = () => {
    setUpdateUserModalStatus(false);
  };

  const handleUpdateUserModalCancel = () => {
    setUpdateUserModalStatus(false);
  };

  const handleUpdateUserModalSubmit = (updatedUser: User) => {
    const index = partners.findIndex((user) => user.uuid === updatedUser.uuid);
    if (index >= 0) {
      const updatedCollection = replaceElementAtIndex(
        partners,
        index,
        updatedUser
      );
      setPartners(updatedCollection);
      setUpdatePartnerCurrentId("");
      setUpdateUserModalStatus(false);
    }
  };

  const toogleStatus = async (user: User) => {
    try {
      const index = partners.findIndex((item) => user.uuid === item.uuid);
      const isActive = user?.isActive;
      const message = `Estás a punto de ${
        isActive ? "desactivar" : "activar"
      } al socio ${user?.profile.name}.`;
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

      const updatedUser = await updatePartner(user.uuid, {
        isActive: !user.isActive,
      });

      setPartners(replaceElementAtIndex(partners, index, updatedUser!));
    } catch (error) {}
  };

  const handleDelete = async (user: User) => {
    const message = `Estás a punto de eliminar al socio ${user?.profile.name}.`;
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

      await deletePartner(user.uuid);

      const updatedUsersList = partners.filter(
        (item) => item.uuid !== user.uuid
      );

      setPartners(updatedUsersList);
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
    setPartners([...partners, user]);
    setAddUserModalStatus(false);
  };

  const handleAddUserButtonClick = () => {
    setAddUserModalStatus(true);
  };

  return (
    <>
      <Layout>
        <Page title="Socios">
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
          <TableContainer component={Paper} variant="outlined">
            <Table aria-label="collapsible table" size="medium">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Nombre</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Teléfono</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 600 }} width={100} align="right">
                    Activo
                  </TableCell>
                  <TableCell align="right" width={150}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading &&
                  arrayFrom(10).map((item) => (
                    <TableRow
                      key={`partner-${item}`}
                      sx={{ "& > *": { borderBottom: "unset" } }}
                    >
                      {arrayFrom(5).map((row) => (
                        <TableCell key={`partner-${item}-${row}`}>
                          <Skeleton loading={loading}></Skeleton>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                {partners.map((row: User) => (
                  <TableRow
                    key={row.uuid}
                    sx={{ "& > *": { borderBottom: "unset" } }}
                  >
                    <TableCell component="th" scope="row">
                      <Skeleton loading={loading}>{row.profile.name}</Skeleton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Skeleton loading={loading}>{row.profile.phone}</Skeleton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Skeleton loading={loading}>{row.email}</Skeleton>
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
          <If condition={!loading && partners.length === 0}>
            <Alert color="info">No se ha creado ningún socio</Alert>
          </If>
        </Page>
      </Layout>
      {updatePartnerCurrentId && (
        <UpdatePartnerModal
          isOpen={updateUserModalStatus}
          onClose={handleUpdateUserModalClose}
          onCancel={handleUpdateUserModalCancel}
          onCreate={handleUpdateUserModalSubmit}
          userId={updatePartnerCurrentId}
        />
      )}
      <AddPartnerModal
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

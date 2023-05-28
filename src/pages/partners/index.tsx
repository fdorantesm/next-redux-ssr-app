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

import { If } from "src/components/if";
import { Page } from "src/components/page";
import { withAuth } from "src/hofs/with-auth";
import { Layout } from "src/layout/default";
import { useEffect, useState } from "react";
import { getPartners } from "src/services/api/partners/get-partners.service";
import { User } from "src/types/user.type";

export default function Partners() {
  const [partners, setPartners] = useState<User[]>([]);

  useEffect(() => {
    getPartners().then(setPartners);
  }, []);

  return (
    <>
      <Layout>
        <Page title="Socios">
          <Stack justifyContent={"end"} alignItems={"end"} mb={2}>
            <Button color="success" variant="contained" size="small">
              <AddIcon /> Agregar
            </Button>
          </Stack>
          <If condition={partners?.length > 0}>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Nombre</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Teléfono</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                    <TableCell
                      sx={{ fontWeight: 600 }}
                      width={100}
                      align="right"
                    >
                      Activo
                    </TableCell>
                    <TableCell align="right" width={150}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {partners.map((row: User) => (
                    <TableRow
                      key={row.uuid}
                      sx={{ "& > *": { borderBottom: "unset" } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.profile.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.profile.phone}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.email}
                      </TableCell>
                      <TableCell align="right" width={100}>
                        <Switch
                          name="isActive"
                          value={row.uuid}
                          checked={true}
                          inputProps={{ "aria-label": "controlled" }}
                          size={"small"}
                          color={"success"}
                        />
                      </TableCell>
                      <TableCell align="right" width={100}>
                        <Stack justifyContent={"end"} direction={"row"}>
                          <IconButton color="inherit" size="small">
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
          <If condition={!partners || partners.length === 0}>
            <Alert color="info">No se ha creado ningún rancho</Alert>
          </If>
        </Page>
      </Layout>
    </>
  );
}

export const getServerSideProps = withAuth((ctx: any) => {
  return {
    props: {},
  };
});

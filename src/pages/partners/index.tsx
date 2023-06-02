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

import { If } from "src/components/if";
import { Page } from "src/components/page";
import { withAuth } from "src/hofs/with-auth";
import { Layout } from "src/layout/default";
import { getPartners } from "src/services/api/partners/get-partners.service";
import { User } from "src/types/user.type";
import { Skeleton } from "src/components/skeleton";
import { arrayFrom } from "src/utils/array-from.util";

export default function Partners() {
  const [partners, setPartners] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPartners()
      .then(setPartners)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Layout>
        <Page title="Socios">
          <Stack justifyContent={"end"} alignItems={"end"} mb={2}>
            <Button color="success" variant="contained" size="medium">
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
                          checked={true}
                          inputProps={{ "aria-label": "controlled" }}
                          size={"small"}
                          color={"success"}
                        />
                      </Skeleton>
                    </TableCell>
                    <TableCell align="right" width={100}>
                      <Skeleton loading={loading}>
                        <Stack justifyContent={"end"} direction={"row"}>
                          <IconButton color="inherit" size="small">
                            <EditIcon></EditIcon>
                          </IconButton>
                          <IconButton color="error" size="small">
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

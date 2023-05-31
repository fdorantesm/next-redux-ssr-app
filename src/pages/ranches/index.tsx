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
  Stack,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CollectionsIcon from "@mui/icons-material/Collections";

import { Page } from "src/components/page";
import { withAuth } from "src/hofs/with-auth";
import { Layout } from "src/layout/default";
import { useEffect, useState } from "react";
import { getRanches } from "src/services/api/ranches/get-ranches.service";
import { Ranch } from "src/types/ranche.type";
import {
  humanDate,
  remainingMonths,
  shortestDate,
  yearAndMonth,
} from "src/utils/date";
import { If } from "src/components/if";
import { formatCurrency } from "src/utils/format-currency.util";
import { Skeleton } from "src/components/skeleton";

export default function Ranches() {
  const [ranches, setRanches] = useState<Ranch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRanches()
      .then(setRanches)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Layout>
        <Page title="Ranchos">
          <Stack justifyContent={"end"} alignItems={"end"} mb={2}>
            <Button color="success" variant="contained" size="medium">
              <AddIcon /> Agregar
            </Button>
          </Stack>
          <TableContainer component={Paper} variant="outlined">
            <Table aria-label="collapsible table" size="medium">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>
                    <Skeleton loading={loading}>Nombre</Skeleton>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    <Skeleton loading={loading}>Descripción</Skeleton>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    <Skeleton loading={loading}>Planta</Skeleton>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    <Skeleton loading={loading}>Precio por planta</Skeleton>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    <Skeleton loading={loading}>Precio por kg</Skeleton>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    <Skeleton loading={loading}>Kg / Planta</Skeleton>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    <Skeleton loading={loading}>Jima estimada</Skeleton>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }} width={100} align="right">
                    <Skeleton loading={loading}>Activo</Skeleton>
                  </TableCell>
                  <TableCell align="right" width={150}>
                    <Skeleton loading={loading}></Skeleton>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ranches.map((row: Ranch) => (
                  <TableRow
                    key={row.uuid}
                    sx={{ "& > *": { borderBottom: "unset" } }}
                  >
                    <TableCell component="th" scope="row">
                      <Skeleton loading={loading}>{row.name}</Skeleton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Skeleton loading={loading}>{row.description}</Skeleton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Skeleton loading={loading}>
                        {row.plants![0].name}
                      </Skeleton>
                    </TableCell>
                    <TableCell>
                      <Skeleton loading={loading}>
                        {formatCurrency(row.plants![0].plantPurchasePrice)}
                      </Skeleton>
                    </TableCell>
                    <TableCell>
                      <Skeleton loading={loading}>
                        {formatCurrency(row.plants![0].plantKilogramSalesPrice)}
                      </Skeleton>
                    </TableCell>
                    <TableCell>
                      <Skeleton loading={loading}>
                        {row.plants![0].plantWeight}kg
                      </Skeleton>
                    </TableCell>
                    <TableCell>
                      <Skeleton loading={loading}>
                        {remainingMonths(row.harvestDate)} meses (
                        {yearAndMonth(row.harvestDate)})
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
                        />
                      </Skeleton>
                    </TableCell>
                    <TableCell align="right" width={100}>
                      <Skeleton loading={loading}>
                        <Stack justifyContent={"end"} direction={"row"}>
                          <IconButton>
                            <CollectionsIcon />
                          </IconButton>
                          <IconButton>
                            <EditIcon></EditIcon>
                          </IconButton>
                          <IconButton color="error">
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
          <If condition={!ranches || ranches.length === 0}>
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

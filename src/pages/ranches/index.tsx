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
import { yearAndMonth, remainingMonths } from "src/utils/date";
import { If } from "src/components/if";
import { formatCurrency } from "src/utils/format-currency.util";
import { Skeleton } from "src/components/skeleton";
import { arrayFrom } from "src/utils/array-from.util";

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
                  <TableCell sx={{ fontWeight: 600 }}>Nombre</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Descripción</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Planta</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    Precio por planta
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Precio por kg</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Kg / Planta</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Jima estimada</TableCell>
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
                      key={`ranch-${item}`}
                      sx={{ "& > *": { borderBottom: "unset" } }}
                    >
                      {arrayFrom(9).map((row) => (
                        <TableCell key={`ranch-${item}-${row}`}>
                          <Skeleton loading={loading}></Skeleton>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                {!loading &&
                  ranches.map((row: Ranch) => (
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
                          {formatCurrency(
                            row.plants![0].plantKilogramSalesPrice
                          )}
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

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

export default function Ranches() {
  const [ranches, setRanches] = useState<Ranch[]>([]);

  useEffect(() => {
    getRanches().then(setRanches);
  }, []);

  return (
    <>
      <Layout>
        <Page title="Ranchos">
          <Stack justifyContent={"end"} alignItems={"end"} mb={2}>
            <Button color="success" variant="contained" size="small">
              <AddIcon /> Agregar
            </Button>
          </Stack>
          <If condition={ranches?.length > 0}>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Nombre</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Descripción</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Planta</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>
                      Precio por planta
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Precio Kg</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Kg / Planta</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>
                      Jima estimada
                    </TableCell>
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
                  {ranches.map((row: Ranch) => (
                    <TableRow
                      key={row.uuid}
                      sx={{ "& > *": { borderBottom: "unset" } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.description}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.plants![0].name}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(row.plants![0].plantPurchasePrice)}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(row.plants![0].plantKilogramSalesPrice)}
                      </TableCell>
                      <TableCell>{row.plants![0].plantWeight}kg</TableCell>
                      <TableCell>
                        {remainingMonths(row.harvestDate)} meses (
                        {yearAndMonth(row.harvestDate)})
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </If>
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

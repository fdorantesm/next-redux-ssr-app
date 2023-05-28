import {
  Alert,
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SourceIcon from "@mui/icons-material/Source";

import { If } from "src/components/if";
import { Page } from "src/components/page";
import { withAuth } from "src/hofs/with-auth";
import { Layout } from "src/layout/default";
import { useEffect, useState } from "react";
import { getInvestments } from "src/services/api/investments/get-investments.service";
import { Investment } from "src/types/investment.type";
import { AddInvestmentModal } from "src/components/modals/investments/add-investment.modal";
import { formatCurrency } from "src/utils/format-currency.util";
import { formatPercentaje } from "src/utils/format-percentage.util";

export default function Investments() {
  const [investments, setPlants] = useState<Investment[]>([]);
  const [addPlantModalStatus, setAddInvestmentModalStatus] = useState(false);

  useEffect(() => {
    getInvestments().then(setPlants);
  }, []);

  const handleAddPlantModalCancel = () => {
    setAddInvestmentModalStatus(false);
  };

  const handleAddPlantModalClose = () => {
    setAddInvestmentModalStatus(false);
  };

  const handleAddPlantModalOpen = () => {
    setAddInvestmentModalStatus(true);
  };

  const handleCreatedPlant = (investment: Investment) => {
    investments.push(investment);
  };

  return (
    <>
      <Layout>
        <Page title="Inversiones">
          <Stack justifyContent={"end"} alignItems={"end"} mb={2}>
            <Button
              color="success"
              variant="contained"
              size="small"
              onClick={handleAddPlantModalOpen}
            >
              <AddIcon /> Agregar
            </Button>
          </Stack>
          <If condition={investments?.length > 0}>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Socio</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Rancho</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Plantas</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Superficie</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Inversión</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Venta</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Utilidad B.</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Comisión</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Utilidad N.</TableCell>
                    <TableCell align="right" width={150}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {investments.map((row: Investment) => (
                    <TableRow
                      key={row.uuid}
                      sx={{ "& > *": { borderBottom: "unset" } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.user?.profile?.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.ranch?.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.plantsQuantity}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {formatPercentaje(row.surfacePercentage)}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {formatCurrency(row.seedCapital)}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {formatCurrency(row.metrics?.returnal!)}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {formatCurrency(row.metrics?.grossProfit!)}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {formatCurrency(row.metrics?.fee!)}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {formatCurrency(row.metrics?.netProfit!)}
                      </TableCell>
                      <TableCell align="right" width={100}>
                        <Stack justifyContent={"end"} direction={"row"}>
                          <IconButton>
                            <SourceIcon />
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
          <If condition={!investments || investments.length === 0}>
            <Alert color="info">No se ha registrado ninguna inversión</Alert>
          </If>
        </Page>
      </Layout>
      <AddInvestmentModal
        isOpen={addPlantModalStatus}
        onCancel={handleAddPlantModalCancel}
        onClose={handleAddPlantModalClose}
        onCreate={handleCreatedPlant}
      />
    </>
  );
}

export const getServerSideProps = withAuth((ctx: any) => {
  return {
    props: {},
  };
});

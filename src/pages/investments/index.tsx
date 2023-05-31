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
import { Skeleton } from "src/components/skeleton";

export default function Investments() {
  const [investments, setPlants] = useState<Investment[]>([]);
  const [addPlantModalStatus, setAddInvestmentModalStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInvestments()
      .then(setPlants)
      .finally(() => setLoading(false));
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
              size="medium"
              onClick={handleAddPlantModalOpen}
            >
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
                    <Skeleton loading={loading}>Rancho</Skeleton>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    <Skeleton loading={loading}>Plantas</Skeleton>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    <Skeleton loading={loading}>Superficie</Skeleton>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    <Skeleton loading={loading}>Inversión</Skeleton>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    <Skeleton loading={loading}>Venta</Skeleton>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    <Skeleton loading={loading}>Utilidad B.</Skeleton>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    <Skeleton loading={loading}>Comisión</Skeleton>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    <Skeleton loading={loading}>Utilidad N.</Skeleton>
                  </TableCell>
                  <TableCell align="right" width={150}>
                    <Skeleton loading={loading}></Skeleton>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {investments.map((row: Investment) => (
                  <TableRow
                    key={row.uuid}
                    sx={{ "& > *": { borderBottom: "unset" } }}
                  >
                    <TableCell component="th" scope="row">
                      <Skeleton loading={loading}>
                        {row.user?.profile?.name}
                      </Skeleton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Skeleton loading={loading}>{row.ranch?.name}</Skeleton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Skeleton loading={loading}>
                        {row.plantsQuantity}
                      </Skeleton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Skeleton loading={loading}>
                        {formatPercentaje(row.surfacePercentage)}
                      </Skeleton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Skeleton loading={loading}>
                        {formatCurrency(row.seedCapital)}
                      </Skeleton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Skeleton loading={loading}>
                        {formatCurrency(row.metrics?.returnal!)}
                      </Skeleton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Skeleton loading={loading}>
                        {formatCurrency(row.metrics?.grossProfit!)}
                      </Skeleton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Skeleton loading={loading}>
                        {formatCurrency(row.metrics?.fee!)}
                      </Skeleton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Skeleton loading={loading}>
                        {formatCurrency(row.metrics?.netProfit!)}
                      </Skeleton>
                    </TableCell>
                    <TableCell align="right" width={100}>
                      <Skeleton loading={loading}>
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
                      </Skeleton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <If condition={!loading && investments.length === 0}>
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

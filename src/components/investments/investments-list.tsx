import {
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SourceIcon from "@mui/icons-material/Source";

import { arrayFrom } from "src/utils/array-from.util";
import { Investment } from "src/types/investment.type";
import { Skeleton } from "src/components/skeleton";
import { formatPercentaje } from "src/utils/format-percentage.util";
import { formatCurrency } from "src/utils/format-currency.util";
import Link from "next/link";

export default function InvestmentsList(props: Props) {
  return (
    <>
      <TableContainer component={Paper} variant="outlined">
        <Table aria-label="collapsible table" size="medium">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Nombre</TableCell>
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
            {props.loading &&
              arrayFrom(10).map((item) => (
                <TableRow
                  key={`investment-${item}`}
                  sx={{ "& > *": { borderBottom: "unset" } }}
                >
                  {arrayFrom(10).map((row) => (
                    <TableCell key={`investment-${item}-${row}`}>
                      <Skeleton loading={props.loading}></Skeleton>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            {!props.loading &&
              props.data.map((row: Investment) => (
                <TableRow
                  key={row.uuid}
                  sx={{ "& > *": { borderBottom: "unset" } }}
                >
                  <TableCell component="th" scope="row">
                    <Skeleton loading={props.loading}>
                      {row.user?.profile?.name}
                    </Skeleton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Skeleton loading={props.loading}>
                      {row.ranch?.name}
                    </Skeleton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Skeleton loading={props.loading}>
                      {row.plantsQuantity}
                    </Skeleton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Skeleton loading={props.loading}>
                      {formatPercentaje(row.surfacePercentage)}
                    </Skeleton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Skeleton loading={props.loading}>
                      {formatCurrency(row.seedCapital)}
                    </Skeleton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Skeleton loading={props.loading}>
                      {formatCurrency(row.metrics?.returnal!)}
                    </Skeleton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Skeleton loading={props.loading}>
                      {formatCurrency(row.metrics?.grossProfit!)}
                    </Skeleton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Skeleton loading={props.loading}>
                      {formatCurrency(row.metrics?.fee!)}
                    </Skeleton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Skeleton loading={props.loading}>
                      {formatCurrency(row.metrics?.netProfit!)}
                    </Skeleton>
                  </TableCell>
                  <TableCell align="right" width={100}>
                    <Skeleton loading={props.loading}>
                      <Stack justifyContent={"end"} direction={"row"}>
                        <Link
                          href={`/partners/${row.userId}/investments/${row.uuid}`}
                        >
                          <a>
                            <Tooltip title="Contrato" arrow>
                              <IconButton>
                                <SourceIcon />
                              </IconButton>
                            </Tooltip>
                          </a>
                        </Link>
                        <IconButton>
                          <Tooltip title="Editar" arrow>
                            <EditIcon></EditIcon>
                          </Tooltip>
                        </IconButton>
                        <IconButton color="error">
                          <Tooltip title="Eliminar" arrow>
                            <DeleteIcon></DeleteIcon>
                          </Tooltip>
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
  );
}

interface Props {
  data: Investment[];
  loading: boolean;
}

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
import { getPlants } from "src/services/api/plants/get-plants.service";
import { Plant } from "src/types/plant.type";
import { PlantsModal } from "src/components/modals/plants/plants.modal";

export default function Plants() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [addPlantModalStatus, setAddPlantModalStatus] = useState(false);

  useEffect(() => {
    getPlants().then(setPlants);
  }, []);

  const handleAddPlantModalCancel = () => {
    setAddPlantModalStatus(false);
  };

  const handleAddPlantModalClose = () => {
    setAddPlantModalStatus(false);
  };

  const handleAddPlantModalOpen = () => {
    setAddPlantModalStatus(true);
  };

  const handleCreatedPlant = (plant: Plant) => {
    plants.push(plant);
  };

  return (
    <>
      <Layout>
        <Page title="Plantas">
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
          <If condition={plants?.length > 0}>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Nombre</TableCell>
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
                  {plants.map((row: Plant) => (
                    <TableRow
                      key={row.uuid}
                      sx={{ "& > *": { borderBottom: "unset" } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
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
          <If condition={!plants || plants.length === 0}>
            <Alert color="info">No se ha creado ningún rancho</Alert>
          </If>
        </Page>
      </Layout>
      <PlantsModal
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

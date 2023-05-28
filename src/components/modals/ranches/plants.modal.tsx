import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormGroup,
  Stack,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { createPlant } from "src/services/api/plants/create-plant.service";
import { PlantPayload } from "src/services/api/plants/types/plant.payload.type";
import { Plant } from "src/types/plant.type";

export function PlantsModal(props: Props) {
  const initialState: PlantPayload = {
    name: "",
    plantKilogramSalesPrice: 0,
    plantPurchasePrice: 0,
    plantWeight: 0,
  };

  const [formData, setFormData] = useState<PlantPayload>(initialState);
  const snackbar = useSnackbar();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const plant = await createPlant(formData);
    snackbar.enqueueSnackbar({
      message: "Planta creada exitosamente",
      autoHideDuration: 3000,
      variant: "success",
    });
    props.onCreate(plant);
    setFormData(initialState);
    props.onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Dialog open={props.isOpen} maxWidth={"lg"} onClose={props.onClose}>
      <DialogTitle>Crear planta</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} style={{ width: "300px" }}>
          <FormGroup sx={{ marginBottom: "1rem" }}>
            <FormControl fullWidth>
              <TextField
                margin="dense"
                name="name"
                label="Nombre de la planta"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.name}
                onChange={handleInputChange}
              />
            </FormControl>
          </FormGroup>
          <Stack direction={"row"} justifyContent={"end"} alignItems={"center"}>
            <Button color="inherit" onClick={props.onCancel} type="button">
              Cancelar
            </Button>
            <Button
              color="success"
              variant="contained"
              sx={{ marginLeft: 1 }}
              type="submit"
            >
              Guardar
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface Props {
  isOpen: boolean;
  onClose(): any;
  onCancel(): any;
  onCreate(data: Plant): any;
}

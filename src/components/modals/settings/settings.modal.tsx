import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormGroup,
  Stack,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useLayoutEffect, useState } from "react";
import { getSettings } from "src/services/api/settings/get-settings";
import { updateSettings } from "src/services/api/settings/update-settings";
import { Settings } from "src/types/settings.type";

const initialState = {
  kilogramPerPlant: 0,
  pricePerPlantKilogram: 0,
};

export function SettingsModal(props: Props) {
  const snackbar = useSnackbar();
  const [data, setData] = useState<SettingsPayload>(initialState);
  const [formData, setFormData] = useState<SettingsPayload>(initialState);

  useLayoutEffect(() => {
    if (props.isOpen) {
      getSettings().then((settings) => {
        setFormData(settings);
        setData(settings);
      });
    }
  }, [props.isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await updateSettings({
      kilogramPerPlant: Number(formData.kilogramPerPlant),
      pricePerPlantKilogram: Number(formData.pricePerPlantKilogram),
    });

    setData(response);

    snackbar.enqueueSnackbar({
      variant: "success",
      autoHideDuration: 3000,
      message: "Los datos fueron guardados con éxico",
    });

    props.handleClose();
  };

  const handleCancel = () => {
    setFormData(data);
    props.handleCancel();
  };

  return (
    <Dialog open={props.isOpen} onClose={props.handleClose}>
      <DialogTitle>Configuración</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <FormGroup sx={{ marginBottom: "1rem" }}>
            <FormControl fullWidth>
              <TextField
                autoFocus
                margin="dense"
                name="kilogramPerPlant"
                label="Kilos por planta"
                type="number"
                fullWidth
                variant="outlined"
                value={formData.kilogramPerPlant}
                onChange={handleInputChange}
              />
            </FormControl>
          </FormGroup>
          <FormGroup sx={{ marginBottom: "1rem" }}>
            <FormControl fullWidth>
              <TextField
                margin="dense"
                name="pricePerPlantKilogram"
                label="Precio por kilos de planta"
                type="number"
                fullWidth
                variant="outlined"
                value={formData.pricePerPlantKilogram}
                onChange={handleInputChange}
              />
            </FormControl>
          </FormGroup>
          <FormGroup>
            <Stack direction="row" spacing={2}>
              <Button type={"button"} variant="text" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button type={"submit"} variant="contained">
                Guardar
              </Button>
            </Stack>
          </FormGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface Props {
  isOpen: boolean;
  // onSubmit(data: Omit<Settings, "uuid">): Omit<Settings, "uuid">;
  handleClose(): any;
  handleCancel(): any;
}

type SettingsPayload = Omit<Settings, "uuid">;

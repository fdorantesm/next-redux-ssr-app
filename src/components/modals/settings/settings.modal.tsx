import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormGroup,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { getSettings } from "src/services/api/settings/get-settings";
import { updateSettings } from "src/services/api/settings/update-settings";
import { Settings } from "src/types/settings.type";

export function SettingsModal(props: Props) {
  const snackbar = useSnackbar();
  const [formData, setFormData] = useState<SettingsPayload>({
    kilogramPerPlant: 0,
    pricePerPlantKilogram: 0,
  });

  useEffect(() => {
    console.log("useEffect");
    getSettings().then(setFormData);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, value, name } = e.target;
    const isNumber = type === "number";
    setFormData({
      ...formData,
      [name]: isNumber ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await updateSettings({
      kilogramPerPlant: formData.kilogramPerPlant,
      pricePerPlantKilogram: formData.pricePerPlantKilogram,
    });

    setFormData(response);

    snackbar.enqueueSnackbar({
      variant: "success",
      autoHideDuration: 3000,
      message: "Los datos fueron guardados con éxico",
    });
  };

  return (
    <Dialog open={true}>
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
            <Button type={"submit"} variant="contained">
              Guardar
            </Button>
          </FormGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface Props {
  // onSubmit(data: Omit<Settings, "uuid">): Omit<Settings, "uuid">;
}

type SettingsPayload = Omit<Settings, "uuid">;

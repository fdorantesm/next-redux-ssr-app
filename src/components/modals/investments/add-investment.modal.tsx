import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { ChangeEvent, useEffect, useLayoutEffect, useState } from "react";
import { createInvestment } from "src/services/api/investments/create-investment.service";
import { getPartners } from "src/services/api/partners/get-partners.service";
import { getRanches } from "src/services/api/ranches/get-ranches.service";
import { getSettings } from "src/services/api/settings/get-settings";
import { InvestmentPayload } from "src/types/investment.payload.type";
import { Investment } from "src/types/investment.type";
import { Ranch } from "src/types/ranche.type";
import { Settings } from "src/types/settings.type";
import { User } from "src/types/user.type";

const initialState = {
  plantsQuantity: 0,
  plantWeight: 0,
  purchasePrice: 0,
  ranchId: "",
  seedCapital: 0,
  surfacePercentage: 0,
  userId: "",
};

export function AddInvestmentModal(props: Props) {
  const snackbar = useSnackbar();
  const [formData, setFormData] = useState<InvestmentPayload>(initialState);
  const [ranches, setRanches] = useState<Ranch[]>([]);
  const [partners, setPartners] = useState<User[]>([]);
  const [settings, setSettings] = useState<Omit<Settings, "uuid">>({
    kilogramPerPlant: 0,
    pricePerPlantKilogram: 0,
  });

  useEffect(() => {
    const ranch = ranches.find((ranch) => ranch.uuid === formData.ranchId);
    setFormData({
      ...formData,
      purchasePrice: ranch?.plants![0].plantPurchasePrice!,
      plantWeight: ranch?.plants![0].plantWeight!,
    });
  }, [formData.ranchId]);

  useEffect(() => {
    const { purchasePrice, plantsQuantity } = formData;
    const seedCapital = purchasePrice * plantsQuantity;
    setFormData((prevFormData) => ({
      ...prevFormData,
      seedCapital,
    }));
  }, [formData.purchasePrice, formData.plantsQuantity]);

  useEffect(() => {
    getRanches().then(setRanches);
    getPartners().then(setPartners);
    getSettings().then((settings) => {
      setSettings(settings);
      setFormData({
        ...formData,
        plantWeight: settings.kilogramPerPlant,
      });
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const investment = await createInvestment({
      userId: formData.userId,
      ranchId: formData.ranchId,
      plantsQuantity: Number(formData.plantsQuantity),
      plantWeight: Number(formData.plantWeight),
      purchasePrice: Number(formData.purchasePrice),
      seedCapital: Number(formData.seedCapital),
      surfacePercentage: Number(formData.surfacePercentage),
    });
    snackbar.enqueueSnackbar({
      message: "Inversión registrada exitosamente",
      autoHideDuration: 3000,
      variant: "success",
    });
    props.onCreate(investment);
    setFormData({
      ...initialState,
      plantWeight: settings.kilogramPerPlant,
    });
    props.onClose();
  };

  return (
    <Dialog open={props.isOpen} key={"add-investment-modal"} fullWidth>
      <DialogTitle>
        <Box px={1}>Crear Inversión</Box>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item md={6} p={1}>
              <TextField
                select
                fullWidth
                value={formData.ranchId}
                label="Rancho"
                onChange={handleSelectChange}
                name="ranchId"
                margin={"dense"}
              >
                {ranches.map((ranch) => (
                  <MenuItem key={ranch.uuid} value={ranch.uuid}>
                    {ranch.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} p={1}>
              <TextField
                select
                fullWidth
                value={formData.userId}
                label="Socio"
                onChange={handleSelectChange}
                name="userId"
                margin={"dense"}
              >
                {partners.map((partner) => (
                  <MenuItem key={partner.uuid} value={partner.uuid}>
                    {partner.profile.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={4} p={1}>
              <TextField
                margin="dense"
                name="plantsQuantity"
                label="Número de plantas"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.plantsQuantity}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item md={4} p={1}>
              <TextField
                margin="dense"
                name="purchasePrice"
                label="Precio de compra"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.purchasePrice}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item md={4} p={1}>
              <TextField
                margin="dense"
                name="plantWeight"
                label="Peso de la planta"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.plantWeight}
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Kg</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={4} p={1}>
              <TextField
                margin="dense"
                name="surfacePercentage"
                label="Porcentaje del terreno"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.surfacePercentage}
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item md={4} p={1}>
              <TextField
                margin="dense"
                name="surfacePercentage"
                label="Inversión inicial"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.seedCapital}
                aria-readonly
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Stack
            direction={"row"}
            justifyContent={"end"}
            alignItems={"center"}
            pt={2}
            px={1}
          >
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
  onCreate(data: Investment): any;
}

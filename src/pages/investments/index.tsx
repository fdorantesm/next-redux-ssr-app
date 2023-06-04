import { Alert, Box, Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { If } from "src/components/if";
import { Page } from "src/components/page";
import { withAuth } from "src/hofs/with-auth";
import { Layout } from "src/layout/default";
import { useEffect, useState } from "react";
import { getInvestments } from "src/services/api/investments/get-investments.service";
import { Investment } from "src/types/investment.type";
import { AddInvestmentModal } from "src/components/modals/investments/add-investment.modal";
import InvestmentsList from "src/components/investments/investments-list";

export default function Investments() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [addPlantModalStatus, setAddInvestmentModalStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInvestments()
      .then(setInvestments)
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
    setInvestments([...investments, investment]);
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
          <Box>
            <InvestmentsList data={investments} loading={loading} />
          </Box>
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

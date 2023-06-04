import { Box, Breadcrumbs, Stack, Typography } from "@mui/material";
import cookie from "cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import InvestmentsList from "src/components/investments/investments-list";
import { Page } from "src/components/page";

import { withAuth } from "src/hofs/with-auth";
import { Layout } from "src/layout/default";
import { getInvestments } from "src/services/api/investments/get-investments.service";
import { getPartner } from "src/services/api/partners/get-partner";
import { Investment } from "src/types/investment.type";
import { User } from "src/types/user.type";

export default function PartnerProfile(props: Props) {
  const partner = props.partner;
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInvestments(partner.uuid)
      .then(setInvestments)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <Page>
        <Stack py={2}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href={`/`}>
              <a style={{ textDecoration: "none", color: "initial" }}>
                Dashboard
              </a>
            </Link>
            <Link color="inherit" href={`/partners`}>
              <a style={{ textDecoration: "none", color: "initial" }}>Socios</a>
            </Link>
            <Typography color={"#000"}>{partner.profile.name}</Typography>
          </Breadcrumbs>
        </Stack>
        <Box>
          <InvestmentsList data={investments} loading={loading} />
        </Box>
      </Page>
    </Layout>
  );
}

export const getServerSideProps = withAuth(async (ctx: any) => {
  const partnerId: string = ctx?.params?.partnerId;
  const tokenCookie = ctx.req?.headers.cookie;
  const { token } = cookie.parse(tokenCookie);
  const props: Partial<Props> = {};

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    if (partnerId) {
      props.partner = await getPartner(partnerId, config);
    }
  } catch (error) {
    console.log(error);
  }

  return {
    props,
  };
});

interface Props {
  partner: User;
}

import { ScriptProps } from "next/script";
import { CssBaseline } from "@mui/material";
import styled from "@emotion/styled";

import { Footer } from "./footer";
import { Header } from "./header";
import { Nav } from "./nav";
import { SettingsModal } from "src/components/modals/settings/settings.modal";
import { Settings } from "src/types/settings.type";

const LayoutStyles = styled.div`
  height: inherit;
  min-height: inherit;
`;

const MainStyles = styled.div`
  flex-grow: 1;
  display: flex;
`;

const PageStyles = styled.div`
  background: #e7e7e7;
  padding-left: 4rem;
  display: flex;
  flex-direction: column;
  height: inherit;
  min-height: inherit;
  display: flex;
`;

export const Layout = (props: ScriptProps) => (
  <>
    <LayoutStyles className="page">
      <CssBaseline />
      <>
        <Nav></Nav>
        <PageStyles>
          <Header />
          <MainStyles className="main">{props.children}</MainStyles>
          <Footer />
        </PageStyles>
      </>
    </LayoutStyles>
    <SettingsModal />
  </>
);

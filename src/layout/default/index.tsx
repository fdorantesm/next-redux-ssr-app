import { ScriptProps } from "next/script";
import { CssBaseline } from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";

import { Footer } from "./footer";
import { Header } from "./header";
import { Nav } from "./nav";
import { SettingsModal } from "src/components/modals/settings/settings.modal";

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
  min-height: inherit;
  display: flex;
`;

export const Layout = (props: ScriptProps) => {
  const [settingsModalState, setSettingsModalState] = useState(false);

  const handleSettingsClick = () => {
    setSettingsModalState(true);
  };

  const handleSettingsModalClose = () => {
    setSettingsModalState(false);
  };
  const handleSettingsModalCancel = () => {
    setSettingsModalState(false);
  };

  return (
    <>
      <LayoutStyles className="page">
        <CssBaseline />
        <>
          <Nav></Nav>
          <PageStyles>
            <Header onSettingsClick={handleSettingsClick} />
            <MainStyles className="main">{props.children}</MainStyles>
            <Footer />
          </PageStyles>
        </>
      </LayoutStyles>
      <SettingsModal
        isOpen={settingsModalState}
        handleClose={handleSettingsModalClose}
        handleCancel={handleSettingsModalCancel}
      />
    </>
  );
};

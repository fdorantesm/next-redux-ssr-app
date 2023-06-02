import { Provider } from "react-redux";
import { AppProps } from "next/app";
import { PersistGate } from "redux-persist/integration/react";
import { SnackbarProvider } from "notistack";
import { CssBaseline } from "@mui/material";
import { ConfirmProvider } from "material-ui-confirm";
import NextNprogress from "nextjs-progressbar";

import "../styles/main.scss";
import { store, wrapper, persistor } from "../store/store";

function App({ Component, pageProps }: AppProps) {
  const AppComponent = () => (
    <>
      <CssBaseline />
      <Component {...pageProps} />
    </>
  );

  if (typeof window === "undefined") {
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <ConfirmProvider>
          <AppComponent />
        </ConfirmProvider>
      </SnackbarProvider>
    </Provider>;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <ConfirmProvider>
            <NextNprogress showOnShallow={true} />
            <AppComponent />
          </ConfirmProvider>
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  );
}

export default wrapper.withRedux(App);

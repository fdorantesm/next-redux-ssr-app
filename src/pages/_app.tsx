import { Provider } from "react-redux";
import { AppProps } from "next/app";
import { PersistGate } from "redux-persist/integration/react";
import { SnackbarProvider } from "notistack";

import { store, wrapper, persistor } from "../store/store";

import "../styles/main.scss";
import { CssBaseline } from "@mui/material";

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
        <AppComponent />
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
          <AppComponent />
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  );
}

export default wrapper.withRedux(App);

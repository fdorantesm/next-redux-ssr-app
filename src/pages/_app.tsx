import { Provider } from "react-redux";
import { AppProps } from "next/app";
import { PersistGate } from "redux-persist/integration/react";
import { SnackbarProvider } from "notistack";
import { CssBaseline } from "@mui/material";
import { ConfirmProvider } from "material-ui-confirm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { store, wrapper, persistor } from "../store/store";
import "../styles/main.scss";
import PageLoader from "src/components/page-loader";

function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };

    const handleComplete = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, []);

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
            {loading && <PageLoader />}
            <AppComponent />
          </ConfirmProvider>
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  );
}

export default wrapper.withRedux(App);

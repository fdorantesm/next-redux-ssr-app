import { Provider, useDispatch, useSelector } from "react-redux";
import { AppProps } from "next/app";
import { PersistGate } from "redux-persist/integration/react";
import { SnackbarProvider } from "notistack";
import { v4 as uuid } from "uuid";

import { store, wrapper, persistor } from "../store/store";
import { setCartKey } from "src/store/modules/slices/cart.slice";
import { RootState } from "src/store/types/root-state.type";

function App({ Component, pageProps }: AppProps) {
  const key = useSelector((state: RootState) => state.cart.key);
  const dispatch = useDispatch();
  const cartKey = key || uuid();
  console.log("app:", key, cartKey);
  dispatch(setCartKey(cartKey));

  if (typeof window === "undefined") {
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <Component {...pageProps} />
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
          <Component {...pageProps} />
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  );
}

export default wrapper.withRedux(App);

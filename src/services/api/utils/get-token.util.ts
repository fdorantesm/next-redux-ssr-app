export async function getTokenFromLocalStorage(): Promise<string | undefined> {
  if (typeof window !== "undefined") {
    const rootState = await require("asynkstorage").getItem("persist:root");
    if (!rootState.auth) {
      return;
    }

    const { token } = JSON.parse(rootState.auth);
    return token;
  }
}

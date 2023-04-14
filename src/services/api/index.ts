import Axios from "axios";

import { config } from "../../config/config";

export const apiClient = Axios.create({
  baseURL: config.baseUrl,
  headers: {
    "Content-type": "application/json",
  },
  responseType: "json",
  transitional: {
    silentJSONParsing: true,
  },
});


import axios, {AxiosInstance} from "axios";
import {RESIZER_BACKEND_URL} from "../config";
import { UserData } from "./types";

export class ResizerBackendClient {
  declare private api: AxiosInstance;

  constructor({ authToken }: { authToken: string }) {
    this.api = axios.create({baseURL: RESIZER_BACKEND_URL });
    
    this.api.interceptors.request.use((config) => {
      config.headers.Authorization = `OAuth ${authToken}`;
      return config;
    });
  }

  getUserData = async (): Promise<UserData> => {
    const response = await this.api.get("/v1/user");
    return response.data;
  };
}

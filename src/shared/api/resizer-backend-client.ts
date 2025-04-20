
import axios, {AxiosInstance} from "axios";
import {RESIZER_BACKEND_URL} from "../config";
import { CreateProject, PresetResp, ProjectInfo, ProjectListItem, UserData, UserProjects } from "./types";

export class ResizerBackendClient {
  declare private api: AxiosInstance;

  constructor({ authToken }: { authToken: string | null }) {
    this.api = axios.create({baseURL: RESIZER_BACKEND_URL });
    
    if (authToken) {
      this.api.interceptors.request.use((config) => {
        config.headers.Authorization = `OAuth ${authToken}`;
        return config;
      });
    }
  }

  getUserData = async (): Promise<UserData> => {
    const response = await this.api.get("/v1/user");
    return response.data;
  };

  getUserProjects = async (): Promise<UserProjects> => {
    const response = await this.api.get("/v1/user/projects");
    return response.data;
  }

  createProject = async (project: CreateProject): Promise<ProjectListItem> => {
    const response = await this.api.post("/v1/projects", project);
    return response.data;
  }

  getProjectInfo = async (projectAlias: string): Promise<ProjectInfo> => {
    const response = await this.api.get(`/v1/projects/${projectAlias}`);
    return response.data;
  }

  removeProject = async (projectAlias: string): Promise<void> => {
    await this.api.delete(`/v1/projects/${projectAlias}`);
  }

  getProjectApiKey = async (projectAlias: string): Promise<string> => {
    const response = await this.api.get(`/v1/projects/${projectAlias}/apiKey`);
    return response.data;
  }

  refreshProjectApiKey = async (projectAlias: string): Promise<void> => {
    await this.api.delete(`/v1/projects/${projectAlias}/apiKey`);
  }

  getPresetsList = async (projectAlias: string): Promise<PresetResp[]> => {
    const response = await this.api.get(`/v1/projects/${projectAlias}/presets`);
    return response.data;
  }
}

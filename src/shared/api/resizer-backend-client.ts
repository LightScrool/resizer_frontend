
import axios, {AxiosInstance} from "axios";
import {RESIZER_BACKEND_URL} from "../config";
import { CreateProject, Image, Preset, ProjectInfo, ProjectListItem, UploadImageBody, UserData, UserProjects } from "./types";

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

  getPresetsList = async (projectAlias: string): Promise<Preset[]> => {
    const response = await this.api.get(`/v1/projects/${projectAlias}/presets`);
    return response.data;
  }

  setPresets = async (projectAlias: string, presets: Preset[]): Promise<void> => {
    const response = await this.api.post(`/v1/projects/${projectAlias}/presets`, presets);
    return response.data;
  }

  getImagesList = async (projectAlias: string): Promise<Image[]> => {
    const response = await this.api.get(`/v1/projects/${projectAlias}/images`);
    return response.data;
  }

  removeImage = async (projectAlias: string, imageId: string): Promise<void> => {
    await this.api.delete(`/v1/projects/${projectAlias}/images/${imageId}`);
  }

  uploadImage = async (projectAlias: string, body: UploadImageBody): Promise<Image> => {
    const formData = new FormData();

    formData.append('file', body.file)
    if (body.name) {
      formData.append('name', body.name)
    }
    if (body.description) {
      formData.append('description', body.description)
    }

    const response = await this.api.post(
      `/v1/projects/${projectAlias}/images`,
      formData
    );
    return response.data;
  }
}

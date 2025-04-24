export enum AllowedFilesExtensions {
    jpg = 'jpg',
    jpeg = 'jpeg',
    png = 'png',
    webp = 'webp',
    svg = 'svg',
}

export const YP_API_CLIENT_ID: string = import.meta.env.VITE_YP_API_CLIENT_ID;
export const RESIZER_BACKEND_URL: string = import.meta.env.VITE_RESIZER_BACKEND_URL;
export const RESIZER_IMAGE_SERVER_URL: string = import.meta.env.VITE_RESIZER_IMAGE_SERVER_URL;
export const RESIZER_BACKEND_PING_PATH: string = import.meta.env.VITE_RESIZER_BACKEND_PING_PATH;
export const RESIZER_IMAGE_SERVER_PING_PATH: string = import.meta.env.VITE_RESIZER_IMAGE_SERVER_PING_PATH;

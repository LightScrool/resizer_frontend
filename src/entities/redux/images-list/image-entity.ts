import { Image } from "../../../shared/api";
import { RequestStatuses } from "../../../shared/lib/network";

export type ImageEntity = Image & {
    fetchRemoveStatus: RequestStatuses;
}

export const createImageEntity = (image: Image): ImageEntity => ({
    ...image,
    fetchRemoveStatus: RequestStatuses.IDLE,
});

export const getImageFromEntity = (imageEntity: ImageEntity): Image => ({
    id: imageEntity.id,
    link: imageEntity.link,
    name: imageEntity.name,
    description: imageEntity.description,
});

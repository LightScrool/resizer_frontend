import { RequestStatuses } from "./request-statuses";

export const uniteRequestStatuses = (...statuses: RequestStatuses[]) => {
    if (statuses.includes(RequestStatuses.FAILED)) {
        return RequestStatuses.FAILED;
    }

    if (statuses.includes(RequestStatuses.PENDING)) {
        return RequestStatuses.PENDING;
    }

    if (statuses.includes(RequestStatuses.IDLE)) {
        return RequestStatuses.IDLE;
    }

    return RequestStatuses.SUCCESS;
}
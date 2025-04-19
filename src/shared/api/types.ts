export type UserData = {
    name: string;
    avatarUrl: string;
}

export type ProjectListItem = {
    alias: string;
    name: string | null;
    description: string | null;
}

export type UserProjects = {
    projectsLimit: number,
    projects: ProjectListItem[],
}

export type CreateProject = {
    alias: string;
    name?: string;
    description?: string;
}

export type ProjectInfo = {
    alias: string;
    presetsLimit: number;
    imagesLimit: number;
    name: string | null;
    description: string | null;
};

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

export type Preset = {
    alias: string;
    size: number;
    isHorizontal: boolean;
    name?: string | null;
    description?: string | null;
};

export type Image = {
    id: string;
    link: string;
    name?: string | null;
    description?: string | null;
};

export type UploadImageBody = {
    file: File;
    name?: string | null;
    description?: string | null;
};

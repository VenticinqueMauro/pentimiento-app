import { Proyect } from "./project";

export type Colorist = {
    id: number;
    fullname: string;
    description?: string;
    profileImg?: string;
    portfolioImg?: string;
    projects: Proyect[];
};
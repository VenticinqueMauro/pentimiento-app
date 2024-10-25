import { Colorist } from "./colorist";
import { Gallery } from "./gallery";

export type Proyect = {
    id: number;
    title: string;
    mainImageUrl: string;
    type: string;
    subtype?: string;
    colorists: Colorist[];
    director?: string;
    producer?: string;
    cinematographer?: string;
    agency?: string;
    videoLink?: string;
    gallery: Gallery[];
    synopsis?: string;
    description?: string;
};
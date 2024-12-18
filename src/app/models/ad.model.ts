export interface Ad {
    id: number;
    title: string;
    category: string;
    description: string;
    imageUrl: string | ArrayBuffer | null;
    location: string;
    createdBy: string;
    createdAt: string;
}

export interface AdFormData {
    title: string;
    description: string;
    location: string;
    category: string;
    imageUrl: string | ArrayBuffer | null;

}
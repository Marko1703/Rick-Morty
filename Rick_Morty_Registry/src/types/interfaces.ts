export interface Character {
    id: string;
    name: string;
    status: string;
    species: string;
    gender: string;
    origin: {
        name: string;
    }
}

export interface CharacterFilter {
    status?: string;
    species?: string;
}

export interface SortOption {
    field: 'name' | 'origin.name';
    direction: 'asc' | 'desc';
}
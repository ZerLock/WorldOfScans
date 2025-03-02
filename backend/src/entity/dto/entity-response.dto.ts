export class ReadResponseDto {
    id: string;
    name: string;
    chapter: string;
}

export class EntityResponseDto {
    id: string;
    saved: string[];
    reads: ReadResponseDto[];
}

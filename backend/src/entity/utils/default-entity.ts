import { EntityResponseDto } from '../dto/entity-response.dto';

export const defaultEntity = (id: string): EntityResponseDto => ({
    id,
    saved: [],
    reads: [],
});

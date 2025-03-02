import { Injectable } from '@nestjs/common';
import { EntityRepository } from './entity.repository';
import { defaultEntity } from './utils/default-entity';
import { SaveDataDto } from './dto/save-data.dto';
import { EntityResponseDto } from './dto/entity-response.dto';

@Injectable()
export class EntityService {
    constructor(private readonly entityRepository: EntityRepository) {}

    toResponse(data: any): EntityResponseDto {
        return data as unknown as EntityResponseDto;
    }

    async getEntity(id: string): Promise<EntityResponseDto> {
        const entity = await this.entityRepository.findEntityWithReads(id);
        if (entity) return this.toResponse(entity);
        return defaultEntity(id);
    }

    async saveEntityData(id: string, body: SaveDataDto): Promise<EntityResponseDto> {
        let entity = await this.entityRepository.findEntity(id);
        if (!entity) {
            entity = await this.entityRepository.createEntity(id);
        }

        if (body.saved) {
            entity.saved = [...body.saved];
        }

        const reads = await this.entityRepository.findEntityReads(entity.id);
        if (body.reads?.length > 0) {
            if (reads.length > 0) {
                await this.entityRepository.deleteEntityReads(entity.id);
            }
            await this.entityRepository.createEntityReads(entity.id, body.reads);
        }

        const updated = await this.entityRepository.updateEntity(entity);
        return this.toResponse(updated);
    }
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EntityService } from './entity.service';
import { SaveDataDto } from './dto/save-data.dto';

@Controller('entity')
export class EntityController {
    constructor(private readonly entityService: EntityService) {}

    @Get(':id')
    async getEntityData(@Param('id') id: string) {
        return await this.entityService.getEntity(id);
    }

    @Post(':id')
    async saveEntityData(@Param('id') id: string, @Body() body: SaveDataDto) {
        return await this.entityService.saveEntityData(id, body);
    }
}

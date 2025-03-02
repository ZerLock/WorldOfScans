import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { EntityController } from './entity.controller';
import { EntityService } from './entity.service';
import { EntityRepository } from './entity.repository';

@Module({
    imports: [PrismaModule],
    controllers: [EntityController],
    providers: [EntityService, EntityRepository],
})
export class EntityModule {}

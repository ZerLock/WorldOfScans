import { Injectable } from '@nestjs/common';
import { Entity } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReadDto } from './dto/read.dto';

@Injectable()
export class EntityRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async findEntity(id: string) {
        return await this.prismaService.entity.findUnique({
            where: { id },
        });
    }

    async findEntityWithReads(id: string) {
        return await this.prismaService.entity.findUnique({
            where: { id },
            include: {
                reads: {
                    where: {
                        entityId: id,
                    },
                    select: {
                        id: true,
                        name: true,
                        chapter: true,
                    },
                },
            },
        });
    }

    async createEntity(id) {
        return await this.prismaService.entity.create({
            data: { id },
        });
    }

    async updateEntity(entity: Entity) {
        return await this.prismaService.entity.update({
            where: { id: entity.id },
            data: entity,
            include: {
                reads: {
                    where: {
                        entityId: entity.id,
                    },
                    select: {
                        id: true,
                        name: true,
                        chapter: true,
                    },
                },
            },
        });
    }

    async findEntityReads(id: string) {
        return await this.prismaService.read.findMany({
            where: { entityId: id },
        });
    }

    async createEntityReads(id: string, reads: ReadDto[]) {
        return await this.prismaService.read.createManyAndReturn({
            data: reads.map((read) => ({ entityId: id, ...read })),
        });
    }

    async deleteEntityReads(id: string) {
        return await this.prismaService.read.deleteMany({
            where: { entityId: id },
        });
    }
}

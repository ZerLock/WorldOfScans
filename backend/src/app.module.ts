import { Module } from '@nestjs/common';
import { EntityModule } from './entity/entity.module';

@Module({
    imports: [EntityModule],
})
export class AppModule {}

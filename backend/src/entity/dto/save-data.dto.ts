import { Optional } from '@nestjs/common';
import { IsArray } from 'class-validator';
import { ReadDto } from './read.dto';

export class SaveDataDto {
    @IsArray()
    @Optional()
    saved?: string[];

    @IsArray()
    @Optional()
    reads?: ReadDto[];
}

import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class ReadDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt()
    @IsPositive()
    chapter: number;
}

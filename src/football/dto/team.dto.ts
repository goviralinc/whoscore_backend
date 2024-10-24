import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TeamDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  shortName: string;

  @ApiProperty()
  @IsString()
  tla: string;

  @ApiProperty()
  @IsString()
  crest: string;
}
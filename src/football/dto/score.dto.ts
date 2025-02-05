import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ScoreTimeDto {
  @ApiProperty()
  @IsNumber()
  home: number;

  @ApiProperty()
  @IsNumber()
  away: number;
}

export class ScoreDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  winner?: string;

  @ApiProperty()
  @IsString()
  duration: string;

  @ApiProperty({
    type: ScoreTimeDto,
  })
  fullTime: ScoreTimeDto;

  @ApiProperty({
    type: ScoreTimeDto,
  })
  halfTime: ScoreTimeDto;
}

import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CompetitionDto {
  @ApiProperty({
    description: 'ID of the competition',
    example: 2000,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Name of the competition (e.g., FIFA World Cup)',
    example: 'FIFA World Cup',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Code of the competition (e.g., WC)',
    example: 'WC',
  })
  @IsString()
  code: string;

  @ApiProperty({
    description: 'Type of the competition (e.g., CUP or LEAGUE)',
    example: 'CUP',
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'URL of the competition emblem or logo',
    example: 'https://crests.football-data.org/qatar.png',
  })
  @IsString()
  emblem: string;
}

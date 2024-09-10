import { IsOptional, IsString, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBetDto {
  @ApiPropertyOptional({ description: 'Type of the odds', nullable: true })
  @IsString()
  @IsOptional()
  oddType?: string;

  @ApiPropertyOptional({ description: 'Home team', nullable: true })
  @IsString()
  @IsOptional()
  hometeam?: string;

  @ApiPropertyOptional({ description: 'Away team', nullable: true })
  @IsString()
  @IsOptional()
  awayteam?: string;

  @ApiPropertyOptional({ description: 'Type of the bet', nullable: true })
  @IsString()
  @IsOptional()
  betType?: string;

  @ApiPropertyOptional({ description: 'Time of the event', nullable: true })
  @IsString()
  @IsOptional()
  time?: string;

  @ApiPropertyOptional({ description: 'Odds for the bet', nullable: true })
  @IsString()
  @IsOptional()
  odds?: string;

  @ApiPropertyOptional({ description: 'Status of the bet', nullable: true })
  @IsString()
  @IsOptional()
  betStatus?: string;

  @ApiPropertyOptional({ description: 'Scores of the event', nullable: true })
  @IsString()
  @IsOptional()
  scores?: string;
}

export class BetDto {
  @ApiProperty({ description: 'Unique identifier of the bet' })
  @IsString()
  id: string;

  @ApiPropertyOptional({ description: 'Type of the odds', nullable: true })
  @IsString()
  @IsOptional()
  oddType?: string;

  @ApiPropertyOptional({ description: 'Home team', nullable: true })
  @IsString()
  @IsOptional()
  hometeam?: string;

  @ApiPropertyOptional({ description: 'Away team', nullable: true })
  @IsString()
  @IsOptional()
  awayteam?: string;

  @ApiPropertyOptional({ description: 'Type of the bet', nullable: true })
  @IsString()
  @IsOptional()
  betType?: string;

  @ApiPropertyOptional({ description: 'Time of the event', nullable: true })
  @IsString()
  @IsOptional()
  time?: string;

  @ApiPropertyOptional({ description: 'Odds for the bet', nullable: true })
  @IsString()
  @IsOptional()
  odds?: string;

  @ApiPropertyOptional({ description: 'Status of the bet', nullable: true })
  @IsString()
  @IsOptional()
  betStatus?: string;

  @ApiPropertyOptional({ description: 'Scores of the event', nullable: true })
  @IsString()
  @IsOptional()
  scores?: string;

  @ApiProperty({ description: 'Creation timestamp' })
  @IsDateString()
  createdAt: Date;

  @ApiPropertyOptional({ description: 'Last updated timestamp' })
  @IsDateString()
  @IsOptional()
  updatedAt?: Date;

  @ApiPropertyOptional({ description: 'Deleted timestamp', nullable: true })
  @IsDateString()
  @IsOptional()
  deletedDate?: Date;
}

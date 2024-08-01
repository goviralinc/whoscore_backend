import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum } from 'class-validator';
import { BetPlatform } from 'src/utils/enums';

export class GetTicketInfoDto {
  @ApiProperty()
  @IsString()
  ticketId: string;

  @ApiProperty({ enum: BetPlatform })
  @IsEnum({ type: BetPlatform })
  betPlatform: BetPlatform;
}

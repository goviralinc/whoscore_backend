import { Controller } from '@nestjs/common';
import { LivescoreService } from './livescore.service';

@Controller('livescore')
export class LivescoreController {
  constructor(private readonly livescoreService: LivescoreService) {}
}

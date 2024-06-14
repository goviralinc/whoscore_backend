import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

export class SwaggerSetup {
  static setup(app: INestApplication, path: string) {
    const options = new DocumentBuilder()
      .setTitle('Whoscore documentation')
      .setDescription('Whoscore documentation')
      .addServer('http://localhost:3000', 'Local Server') // You can add multiple servers
      //.addServer('https://apidev.Whoscore.ng', 'Test Server') // You can add multiple servers
      //.addServer('https://api.Whoscore.ng', 'Production Server') // Set the addServer value
      .addBearerAuth()
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    const uiOptions: SwaggerCustomOptions = {
      customSiteTitle: 'Whoscore',
    };

    SwaggerModule.setup(path, app, document, uiOptions);
  }
}

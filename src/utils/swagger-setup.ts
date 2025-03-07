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
      .addServer('http://localhost:3001', 'Local Server') // You can add multiple servers
      .addServer('https://whoscore-backend-h8y0.onrender.com', 'Dev Server') // You can add multiple servers
      .addServer('https://devapi.whoscore.uk', 'Staging Server') // Set the addServer value
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

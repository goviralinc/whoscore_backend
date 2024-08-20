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
      .addServer('http://localhost:3001', 'Local Server')
      .addServer('https://whoscore-backend-h8y0.onrender.com', 'Test Server') // You can add multiple servers
      .addServer('https://sksm3sbwwu.us-east-1.awsapprunner.com/', 'dev Server')
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

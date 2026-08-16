import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Security
  app.use(helmet());
  app.use(compression());
  app.enableCors({
    origin: configService.get('CORS_ORIGIN') || true,
    credentials: true,
  });

  // API Versioning
  app.setGlobalPrefix('api/v1');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  // Validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }));

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Speak Up TMS API')
    .setDescription('Training Management System for Speak Up English Academy')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT')
    .addTag('Auth', 'Authentication endpoints')
    .addTag('Users', 'User management')
    .addTag('Branches', 'Branch management')
    .addTag('Roles', 'RBAC roles & permissions')
    .addTag('Leads', 'CRM lead management')
    .addTag('Students', 'Student management')
    .addTag('Courses', 'Course catalog')
    .addTag('Classrooms', 'Classroom management')
    .addTag('Groups', 'Group scheduling')
    .addTag('Sessions', 'Session & attendance')
    .addTag('Placement Tests', 'Placement test system')
    .addTag('Waitlists', 'Waitlist management')
    .addTag('Inventory', 'Training materials')
    .addTag('Public', 'Public website APIs')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
  console.log(`🚀 Application running on: http://localhost:${port}/api/v1`);
  console.log(`📚 Swagger docs: http://localhost:${port}/docs`);
}
bootstrap();

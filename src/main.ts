import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './shared/main/module/app.module';
import RabbitmqServer from './rabbitmq-server';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const server = new RabbitmqServer('amqp://admin:admin@localhost:5672');
  await server.start();

  // Habilitando o CORS na aplicação
  app.enableCors({
    credentials: true,
    allowedHeaders: '*',
    origin: '*',
  });

  // Configurando o mecanismo de visualização para o Handlebars
  app.setViewEngine('hbs');

  // Adicionando o ValidationPipe global à aplicação
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Documentação Swagger
  const config = new DocumentBuilder()
    .setTitle('Prova de Ciência')
    .setDescription('Avaliação - Ciência da Computação')
    .setVersion('1.0.0')
    .addTag('status')
    .addTag('author')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3333);

  const baseUrl = 'http://localhost:3333';
  console.log(`\n 🚀 Server is running on!  ${baseUrl}/docs`);
}

bootstrap();

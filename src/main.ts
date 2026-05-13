import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import * as fs from 'fs';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        httpsOptions: {
            cert: fs.readFileSync('./certs/cert.pem'),
            key: fs.readFileSync('./certs/key.pem'),
        },
    });

    app.enableCors({
        origin: process.env.FRONT_APP_URL,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    app.use(cookieParser());
    const config = new DocumentBuilder()
        .setTitle('Budget API')
        .setDescription('API for managing budgets and expenses')
        .setVersion('1.0')
        .addTag('budget')
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

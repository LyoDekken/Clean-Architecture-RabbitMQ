import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from '../service/app.service';
import { AppController } from '../http/app.controller';
import { DataServicesModule } from 'src/database/services/database.services.module';
import { AuthorUseCasesModule } from 'src/use-cases/author/author.use-case.module';
import { AuthorController } from 'src/http/author.http';

@Module({
  imports: [
    AuthorUseCasesModule,
    DataServicesModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController, AuthorController],
  providers: [AppService],
})
export class AppModule {}

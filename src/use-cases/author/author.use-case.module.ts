import { Module } from '@nestjs/common';
import { AuthorUseCases } from './author.use-case';
import { DataServicesModule } from 'src/database/services/database.services.module';
import { AuthorService } from './author.use-case.service';

@Module({
  imports: [DataServicesModule],
  providers: [AuthorService, AuthorUseCases],
  exports: [AuthorService, AuthorUseCases],
})
export class AuthorUseCasesModule {}

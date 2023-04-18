import { Module } from '@nestjs/common';
import { MongoDataServicesModule } from '../mongo-data.module';

@Module({
  imports: [MongoDataServicesModule],
  exports: [MongoDataServicesModule],
})
export class DataServicesModule {}

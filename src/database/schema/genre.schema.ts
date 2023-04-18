import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BookGenre } from 'src/core/entities';

export type GenreDocument = Genre & Document;

@Schema()
export class Genre {
  @Prop({ required: true, unique: true })
  name: BookGenre;
}

export const GenreSchema = SchemaFactory.createForClass(Genre);

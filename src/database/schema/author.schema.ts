import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthorDocument = Author & Document;

@Schema()
export class Author {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  avatar_url: string;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);

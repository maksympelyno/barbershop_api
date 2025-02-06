import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types } from 'mongoose';

export type ClientDocument = HydratedDocument<Client>;

@Schema()
export class Client {
  @ApiProperty({ example: 'string', description: 'Client ID' })
  _id: Types.ObjectId;

  @ApiProperty({ example: 'string', description: 'Client last name' })
  @Prop({ required: true })
  lastName: string;

  @ApiProperty({ example: 'string', description: 'Client first name' })
  @Prop({ required: true })
  firstName: string;

  @ApiProperty({
    example: 'string',
    description: 'Client middle name',
    required: false,
  })
  @Prop()
  middleName?: string;

  @ApiProperty({
    example: 'string',
    description: 'Client phone number',
    uniqueItems: true,
  })
  @Prop({
    required: true,
    match: /^[0-9]{10}$/,
    unique: true,
  })
  phoneNumber: string;

  @ApiProperty({
    example: 'string',
    description: 'Client gender',
    enum: ['male', 'female'],
  })
  @Prop({ required: true, enum: ['male', 'female'] })
  gender: string;

  @ApiProperty({
    example: true,
    description: 'Indicates if the client is a regular customer',
    required: false,
  })
  @Prop({ default: false })
  isRegular: boolean;
}

export const ClientSchema = SchemaFactory.createForClass(Client);

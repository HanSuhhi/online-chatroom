import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop()
  @ApiProperty({
    default: "normalUser",
  })
  username: string;

  @Prop()
  @ApiProperty({
    default: "123456",
  })
  password: String;
}

export const UserSchema = SchemaFactory.createForClass(User);

import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';

const MONGO_MODEL = MongooseModule.forFeature([
    {
        name: "USER_MODEL",
        schema: UserSchema,
        collection: "user"
    }
])

@Global()
@Module({
    imports: [
        MongooseModule.forRoot("mongodb://admin:123456@127.0.0.1:27017/chat?authSource=admin"),
        MONGO_MODEL
    ],
    exports: [MONGO_MODEL]
})
export class DbModule { }

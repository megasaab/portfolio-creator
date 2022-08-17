import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { MONGO_PASS, MONGO_URL, MONGO_USER } from "../constants";

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URL,
      {
        auth: {
          password: MONGO_PASS,
          username: MONGO_USER,
        },
        authSource: 'admin',
        useNewUrlParser: true,
      }),
  ]
})
export class SharedModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { TreeModule } from './tree/tree.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest'), // Ensure this URI is correct
    UserModule,
    TreeModule,
  ],
  controllers: [AppController], // Include the AppController here
})
export class AppModule {}

import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JWTStrategy } from './auth/strategy/auth.strategy';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    AuthModule,
    PostsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/blognest'),
    PassportModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
      driver: ApolloDriver,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, JWTStrategy],
})
export class AppModule {}

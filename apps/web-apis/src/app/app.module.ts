import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'apps/web-apis/src/schem.gql',
      path: '/api',
      context: (...req) => ({ ...req })
    }),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

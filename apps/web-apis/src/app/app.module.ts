import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from '../environments/environment';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...environment.database,
      autoLoadEntities: true,
      synchronize: true,
      ssl: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'apps/web-apis/src/schem.gql',
      path: '/api',
      context: (...req) => ({ ...req }),
      debug: environment.debug
    }),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

import { MailerModule } from '@nestjs-modules/mailer';
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
      // context: (...req) => ({ ...req }),
      context: ({ req }) => ({ req }),
      debug: environment.debug
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mailtrap.io',
        port: 2525,
        ignoreTLS: true,
        secure: false,
        auth: { ...environment.mailTrap },
      },
      defaults: {
        from: '"No Reply" <no-reply@localhost>',
      },
    }),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

import { PciModule } from './pci/pci.module';
import { AddressModule } from './address/address.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from '../environments/environment';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PciModule,
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
    AddressModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

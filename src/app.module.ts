import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HaircutModule } from './haircut/haircut.module';
import { ClientModule } from './client/client.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { BranchModule } from './branch/branch.module';
import { VisitModule } from './visit/visit.module';
import { StatisticsModule } from './statistics/statistics.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validatePredefined: false,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    HaircutModule,
    ClientModule,
    BranchModule,
    VisitModule,
    StatisticsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

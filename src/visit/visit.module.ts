import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Visit, VisitSchema } from './schemas/visit.schema';
import { ClientModule } from 'src/client/client.module';
import { HaircutModule } from 'src/haircut/haircut.module';
import { VisitService } from './visit.service';
import { VisitController } from './visit.controller';
import { BranchModule } from 'src/branch/branch.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Visit.name, schema: VisitSchema }]),
    ClientModule,
    HaircutModule,
    BranchModule,
  ],
  exports: [MongooseModule],
  providers: [VisitService],
  controllers: [VisitController],
})
export class VisitModule {}

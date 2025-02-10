import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BranchModule } from 'src/branch/branch.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    BranchModule,
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

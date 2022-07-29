import { Module } from '@nestjs/common';
import { VerifyService } from './verify.service';
import { VerifyResolver } from './verify.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Verify, VerifySchema } from './entities/verify.entity';
import { User, UserSchema } from 'src/auth/entities/auth.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Verify.name, schema: VerifySchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [VerifyResolver, VerifyService],
})
export class VerifyModule {}

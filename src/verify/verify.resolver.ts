import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { VerifyService } from './verify.service';
import { Verify } from './entities/verify.entity';
import { TriggerResponse } from './entities/response.entity';
import {
  GeneralTriggerInput,
  TriggerPhoneBvnInput,
  TriggerWorkEmailInput,
} from './dto/tigger.input';
import { ConfirmVerifyInput } from './dto/verify.input';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';
import { UseGuards } from '@nestjs/common';

@UseGuards(JwtAuthGuard)
@Resolver(() => Verify)
export class VerifyResolver {
  constructor(private readonly verifyService: VerifyService) {}

  @Mutation(() => TriggerResponse)
  async triggerBvnPhoneConfirmation(
    @Args('input') input: TriggerPhoneBvnInput,
  ) {
    return await this.verifyService.triggerBvnVerifcation(input);
  }

  @Mutation(() => TriggerResponse)
  async triggerWorkEmailConfirmation(
    @Args('input') input: TriggerWorkEmailInput,
  ) {
    return await this.verifyService.triggerWorkEmailVerifcation(input);
  }

  @Mutation(() => TriggerResponse)
  async triggerPhoneConfirmation(@Args('input') input: GeneralTriggerInput) {
    input.type = 'phone';
    return await this.verifyService.generalTriggerVerifcation(input);
  }

  @Mutation(() => TriggerResponse)
  async triggerPersonalEmailConfirmation(@Context() context: any) {
    const input: GeneralTriggerInput = {
      userId: context.req.user._id,
      type: 'email',
    };
    return await this.verifyService.generalTriggerVerifcation(input);
  }

  @Mutation(() => TriggerResponse)
  async confirmPhone(@Args('input') input: ConfirmVerifyInput) {
    input.type = 'phone';
    return await this.verifyService.generalConfirmCode(input);
  }

  @Mutation(() => TriggerResponse)
  async confirmPersonalEmail(
    @Args('input') input: ConfirmVerifyInput,
    @Context() context: any,
  ) {
    input.type = 'email';
    input.userId = context.req.user._id;
    return await this.verifyService.generalConfirmCode(input);
  }
}

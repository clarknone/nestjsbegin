import { Injectable } from '@nestjs/common';
import {
  GeneralTriggerInput,
  TriggerPhoneBvnInput,
  TriggerWorkEmailInput,
} from './dto/tigger.input';
import { TriggerResponse } from './entities/response.entity';
import * as crypto from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Verify, VerifyDocument } from './entities/verify.entity';
import { ConfirmVerifyInput } from './dto/verify.input';
// import { User } from 'src/auth/entities/auth.entity';

function generateCode(): string {
  const code = crypto.randomInt(10000, 99999);
  return code.toString();
}

// function sendOtp(input: GeneralTriggerInput, user: User) {
//   switch (input.type) {
//     case 'phone':
//       //call sendOTPPhone(user.phone)
//       break;
//     case 'email':
//       //call sendOTPMail(user.mail)
//       break;
//   }
//   return true;
// }

@Injectable()
export class VerifyService {
  constructor(
    @InjectModel(Verify.name) private verifyModel: Model<VerifyDocument>,
  ) {}

  async generalTriggerVerifcation(
    input: GeneralTriggerInput,
  ): Promise<TriggerResponse> {
    const response: TriggerResponse = { ok: false };

    const code: string = generateCode();
    const model: Verify = await this.verifyModel.create({
      user: input.userId,
      type: input.type,
      code: code,
    });

    //call sendOtp()
    response.ok = !!model?._id;
    response.message = model._id ? ' ' : 'invalid userid';
    return response;
  }

  async generalConfirmCode(
    input: ConfirmVerifyInput,
  ): Promise<TriggerResponse> {
    const response: TriggerResponse = { ok: false };
    const model: VerifyDocument = await this.verifyModel.findOne({
      user: input.userId,
      type: input.type,
    });
    if (!model) {
      response.message = 'invalid code';
      return response;
    }

    // model.isExpired = model.isExpired || checkCodeExpire(model);
    if (model.isExpired) {
      response.message = 'code has expired';
    } else if (model.code != input.code) {
      response.message = 'code does not match';
    } else {
      response.ok = true;
      //update customer model
    }
    await model.save();

    return response;
  }

  async triggerBvnVerifcation(
    input: TriggerPhoneBvnInput,
  ): Promise<TriggerResponse> {
    const response: TriggerResponse = { ok: false };

    const code: string = generateCode();
    const model: Verify = await this.verifyModel.create({
      user: input.userId,
      type: 'bvn',
      extra: input.bvnPhoneDigits,
      code: code,
    });
    response.ok = !!model._id;
    response.message = model._id ? ' ' : 'invalid userid';
    return response;
  }

  async triggerWorkEmailVerifcation(
    input: TriggerWorkEmailInput,
  ): Promise<TriggerResponse> {
    const response: TriggerResponse = { ok: false };

    const code: string = generateCode();
    const model: Verify = await this.verifyModel.create({
      user: input.clientId,
      type: 'work_email',
      extra: input.workEmail,
      code: code,
    });
    response.ok = !!model._id;
    response.message = model._id ? ' ' : 'invalid userid';
    return response;
  }
}

// function checkCodeExpire(model: VerifyDocument): boolean {
//   // model.createdAt;
//   // implement code expiration check
//   return false;
// }

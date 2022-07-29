import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountLoginInput, SignupInput } from './dto/create-auth.input';
import { User, UserDocument } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';

function generatePasswordHash(password: string) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

function confirmPassword(password1: string, password2: string) {
  const isPassword = bcrypt.compareSync(password1, password2);
  return isPassword;
}

function userToJson(user: UserDocument) {
  const result = user.toJSON();
  delete result.password;
  return result;
}

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(signupInput: SignupInput) {
    const user = await this.userModel.create({
      ...signupInput,
      password: generatePasswordHash(signupInput.password),
    });
    return userToJson(user);
  }

  async login(loginInput: AccountLoginInput) {
    const user = await this.userModel.findOne({ email: loginInput.username });
    if (!(user && confirmPassword(loginInput.password, user.password))) {
      throw new Error('username or password is incorect');
    }
    return userToJson(user);
  }

  async getUser(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) return null;
    return userToJson(user);
  }
}

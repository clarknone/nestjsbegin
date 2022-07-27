import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from './entities/auth.entity';
import { LoginInput, SignupInput } from './dto/create-auth.input';
import { AuthDTO } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import JWTConfig from 'src/config/jwt.conf';
// import { AuthDTO } from './dto/auth.dto';

@Resolver(() => User)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Mutation(() => AuthDTO)
  async register(@Args('data') singupInput: SignupInput) {
    const user = await this.authService.create(singupInput);
    user.token = this.jwtService.sign(user, { secret: JWTConfig.secret });
    return user;
  }

  @Mutation(() => AuthDTO)
  async login(@Args('data') loginInput: LoginInput) {
    const user = await this.authService.login(loginInput);
    user.token = this.jwtService.sign(user, { secret: JWTConfig.secret });
    return user;
  }
}

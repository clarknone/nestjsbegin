import { Test, TestingModule } from '@nestjs/testing';
import { VerifyResolver } from './verify.resolver';
import { VerifyService } from './verify.service';

describe('VerifyResolver', () => {
  let resolver: VerifyResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerifyResolver, VerifyService],
    }).compile();

    resolver = module.get<VerifyResolver>(VerifyResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

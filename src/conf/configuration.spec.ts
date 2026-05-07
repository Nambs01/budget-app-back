import { Test, TestingModule } from '@nestjs/testing';
import { Configuration } from './configuration';

describe('Configuration', () => {
  let provider: Configuration;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Configuration],
    }).compile();

    provider = module.get<Configuration>(Configuration);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

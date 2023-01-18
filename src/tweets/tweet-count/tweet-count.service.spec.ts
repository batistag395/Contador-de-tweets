import { Test, TestingModule } from '@nestjs/testing';
import { TweetCountService } from './tweet-count.service';

describe('TweetCountService', () => {
  let service: TweetCountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TweetCountService],
    }).compile();

    service = module.get<TweetCountService>(TweetCountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

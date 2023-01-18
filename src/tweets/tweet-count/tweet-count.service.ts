import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/sequelize';
import { Cache } from 'cache-manager';
import console from 'console';
import { Tweet } from '../entities/tweet.entity';

@Injectable()
export class TweetCountService {
    private limit = 10;
    constructor(
        @InjectModel(Tweet)
        private tweetModel: typeof Tweet,
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache,   
    ){}
    @Interval(5000)
    async countTweets(){
        let offset = await this.cacheManager.get<number>('tweet-offset');
        offset = offset === undefined ? 0 : offset;
        const tweets = await this.tweetModel.findAll({
            offset,
            limit: this.limit,
        });
        if(tweets.length === this.limit)
        {
            this.cacheManager.set('tweet-offset', offset + this.limit,);
            console.log(`Achou + ${this.limit} tweets.`);
        }
    }
}
// ttl nao funciona
// constante de tweets aparentemente nao retornando nada do banco

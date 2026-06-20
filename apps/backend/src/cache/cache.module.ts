import KeyvRedis from '@keyv/redis';
import { Module } from '@nestjs/common';
import { Cacheable } from 'cacheable';

@Module({
  providers: [
    {
      provide: 'CACHE_INSTANCE',
      useFactory: () => {
        const secondary = new KeyvRedis({
          url: 'redis://localhost:6379',
        });
        return new Cacheable({ secondary, ttl: '4h' });
      },
    },
  ],
  exports: ['CACHE_INSTANCE'],
})
export class CacheModule {}

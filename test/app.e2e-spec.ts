import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { SupabaseService } from './../src/supabase/supabase.service';

describe('Activities API (e2e)', () => {
  let app: INestApplication<App>;

  const mockActivities = [
    {
      id: 1,
      activity_date: '2023-01-01',
      name: 'Test Activity',
      budget_item: [],
    },
  ];

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(SupabaseService)
      .useValue({
        getClient: () => ({
          from: () => ({
            select: jest
              .fn()
              .mockResolvedValue({ data: mockActivities, error: null }),
          }),
        }),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  it('/api/activities (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/activities')
      .expect(200)
      .expect(mockActivities);
  });
});

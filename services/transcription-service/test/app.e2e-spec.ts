import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(404)
  });

  it('/graphql (GET)', () => {
    return request(app.getHttpServer())
      .get('/graphql')
      .expect(400)
  });

  it('/metrics (GET)', () => {
    return request(app.getHttpServer())
      .get('/metrics')
      .expect(200)
  });
});

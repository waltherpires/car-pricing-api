import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Authentication System (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', () => {
    const sendEmail = 'asidj01j231@asdf.com'
    return request(app.getHttpServer())
        .post('/auth/signup')
        .send({ email: sendEmail, password: 'asdf' })
        .expect(201)
        .then((res) => {
            const { id, email } = res.body;
            expect(id).toBeDefined();
            expect(email).toEqual(sendEmail)
        })
  });

  it('signup as a new user then get the currently logged user', async () => {
    const email = 'asdf@asdf.com';

    const agent = request.agent(app.getHttpServer());

    await agent
        .post('/auth/signup')
        .send({ email, password: 'asdf' })
        .expect(201);

    const { body } = await agent
        .get('/auth/whoami')
        .expect(200);

    expect(body.email).toEqual(email);
  });
});

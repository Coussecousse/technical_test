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

  afterAll(done => {
    app.close();
    done()
  })

  describe('Ticket', function () {
    it('should create a ticket', async () => {
      await request(app.getHttpServer())
        .get('/create-ticket')
        .expect(200)
    });
    
    it('should create a ticket with a place selected', async () =>  {
      await request(app.getHttpServer())
        .get('/create-ticket')
        .send({parking_place_id : '5'})
        .expect(200)
    });

    it('should give an error if wrong value', async () => {
      await request(app.getHttpServer())
      .post('/create-ticket')
      .send({parking_place_id : 'abc'})
      .expect(400)
    })

    it('should give an error if place is taken', async () => {
      await request(app.getHttpServer())
      .post('/create-ticket')
      .send({parking_place_id : '1'})
      .expect(400)
    })

    it('should delete ticket', async () => {
      await request(app.getHttpServer())
        .post('/leave-parking')
        .send({unique_id : '37923'})
        .expect(201)
    })
    
    it('should update ticket', async () => {
      await request(app.getHttpServer())
        .post('/update-ticket')
        .send({unique_id : '37923', place : '5'})
        .expect(200)
    }) 
    
    it('should fail if place already taken', async () => {
      await request(app.getHttpServer())
        .post('/update-ticket')
        .send({unique_id : '37923', place : '8'})
        .expect(400)
    })
  });

  describe('Parking', function() {
    it('should get all parking places', async () => {
      await request(app.getHttpServer())
        .get('/get-places')
        .expect(200)
    })
  })
});

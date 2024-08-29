import { expect } from 'chai';
import supertest from "supertest";

const request = supertest('http://localhost:3000/')

describe('POST /', () => {
  it('should return 400 if required params are missing', (done) => {
    request.post('efficientRouteFinder')
      .send({})
      .expect(400)
      .expect((res) => JSON.parse(res.text))
      .end((err, res) => {
        const result = JSON.parse(res.text);
        expect(result.success).to.be.false;
        expect(result.err).to.equal("Missing required params origin or destination");
        done();
      });
  });

  it('should return 400 if anyone required params are missing', (done) => {
    request.post('efficientRouteFinder')
      .send({
        "origin": "PEK",
        "destination": "",
        "sort_by": "cheapest"
      })
      .expect(400)
      .expect((res) => JSON.parse(res.text))
      .end((err, res) => {
        const result = JSON.parse(res.text);
        expect(result.success).to.be.false;
        expect(result.err).to.equal("Missing required params origin or destination");
        done();
      });
  });

  it('should return 200 if required params are given', (done) => {
    request.post('efficientRouteFinder')
      .send({
        "origin": "PEK",
        "destination": "JFK",
        "sort_by": "cheapest"
    })
      .expect(200)
      .expect((res) => JSON.parse(res.text))
      .end((err, res) => {
        const result = JSON.parse(res.text);
        expect(result).to.be.an('object');
        expect(result.success).to.be.true;
        expect(result).has.property("tripAPIResult");
        expect(result.tripAPIResult).to.be.an('array');
        done();
      });
  });

  it('should return 200 and must have sorting by duration for fastest in sort_by', (done) => {
    request.post('efficientRouteFinder')
      .send({
        "origin": "PEK",
        "destination": "JFK",
        "sort_by": "fastest"
    })
      .expect(200)
      .expect((res) => JSON.parse(res.text))
      .end((err, res) => {
        const result = JSON.parse(res.text);
        expect(result).to.be.an('object');
        expect(result.success).to.be.true;
        expect(result).has.property("tripAPIResult");
        expect(result.tripAPIResult).to.be.an('array');

        for (let i = 0; i < result.tripAPIResult.length - 1; i++) {
          expect(result.tripAPIResult[i].duration).to.be.at.most(result.tripAPIResult[i + 1].duration);
        }
        done();
      });
  });

  it('should return 200 and must have sorting by duration for cheaprest in sort_by', (done) => {
    request.post('efficientRouteFinder')
      .send({
        "origin": "PEK",
        "destination": "JFK",
        "sort_by": "cheapest"
    })
      .expect(200)
      .expect((res) => JSON.parse(res.text))
      .end((err, res) => {
        const result = JSON.parse(res.text);
        expect(result).to.be.an('object');
        expect(result.success).to.be.true;
        expect(result).has.property("tripAPIResult");
        expect(result.tripAPIResult).to.be.an('array');

        for (let i = 0; i < result.tripAPIResult.length - 1; i++) {
          expect(result.tripAPIResult[i].cost).to.be.at.most(result.tripAPIResult[i + 1].cost);
        }
        done();
      });
  });
});
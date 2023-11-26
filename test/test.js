import chai from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../index.js';

chai.use(chaiHttp);

const { expect } = chai;

before(function (done) {
    if (server.listening) {
        done();
    }
});

it('should return an error for non-numeric input', function (done) {
    const data = {
        a2Value: 'abc',
        b2Value: 'def',
    };

    chai.request('http://localhost:8000')
        .post('/result')
        .send(data)
        .end(function (error, response) {
            if (error) {
                done(error);
            } else if ('status' in response) {
                expect(response).to.have.status(200);
                expect(response.text).to.include('You must use only numbers');
                done();
            } else {
                done(new Error('Response object is undefined or does not have a status property.'));
            }
        });
});

before(function (done) {
    if (server.listening) {
        done();
    }
});

it('should return a result for numeric input', function (done) {
    const data = {
        a2Value: '3',
        b2Value: '4',
    };

    chai.request('http://localhost:8000')
        .post('/result')
        .send(data)
        .end(function (error, response) {
            if (error) {
                done(error);
            } else if ('status' in response) {
                expect(response).to.have.status(200);
                expect(response.text).to.not.include('You must use only numbers');
                done();
            } else {
                done(new Error('Response object is undefined or does not have a status property.'));
            }
        });
});


after(function (done) {
    server.close(done);
});

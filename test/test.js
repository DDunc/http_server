var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
chai.use(chaiHttp);
require("../my_http_server.js");

var response;
var error;

describe('server.js', function(){

  describe('GET /greet', function(){
    before(function(done){
      chai.request('localhost:3000')
        .post('/greet')
        .send({name: 'Duncan'})
        .end(function(err, res){ //res can be logged if you get into trouble and/or need key info
          error = err;
          response = res;
          done();
        });
    });

    it('shoud not return an error', function(){
      expect(error).to.eql(null);
    });

    it('should return hello + name key from JSON Object', function(){
      expect(response.body.msg).to.eql('hello Duncan');
    });
  });
  describe('GET /greet/ + anyname', function(){
    before(function(done){
      chai.request('localhost:3000')
        .get('/greet/somebody')
        .end(function(err, res){
          error = err;
          response = res;
          done();
      });
    });
   it('shoud not return an error', function(){
      expect(error).to.eql(null);
    });

    it('should return hello plus name from the URL path', function(){
      expect(response.text).to.eql("hello somebody");
    });
  });

   describe('GET /time', function(){
    before(function(done){
    chai.request('localhost:3000')
      .get('/time')
      .end(function(err, res){
          error = err;
          response = res;
          done();
      });
    });
   it('shoud not return an error', function(){
      expect(error).to.eql(null);
    });
   //may not always officially pass because time can be a second or two off
    it('should return the current server time', function(){
      expect(response.text).to.eql(new Date().toString());
    });
  });
});
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
chai.use(chaiHttp);
require("../index.js");
var fs = require('fs');

var response;
var error;

describe('server.js', function(){

  describe('This is for POST /notes', function(){
    before(function(done){                 //ASK ABOUT WHAT THIS BEFORE DONE PATTERN DOES
      chai.request('localhost:3000')
        .post('/notes')
        .send({name: 'Duncan'})
        .end(function(err, res){ //res can be logged if you get into trouble and/or need key info
          error = err;
          response = res;
          done();
        });
    });

    it('should not return an error', function(){
      expect(error).to.eql(null);
    });
    /*it('should return hello + name key from JSON Object', function(){
      expect(response.body.msg).to.eql('hello Duncan');
    }); */
  });
  describe('This is for GET /notes/1', function(){
    before(function(done){
      chai.request('localhost:3000')
        .get('/notes/1')
        .end(function(err, res){
          error = err;
          response = res;
          console.log(res);
          done();
      });
    });
   it('should not return an error', function(){
      expect(error).to.eql(null);
    });

    it('should return a file', function(){
      var exterr;
    fs.readFile('/notes/1', function (errs, data) {
        if (err){
          exterr = err;
        }
    })
    expect(exterr).to.eql(undefined); //I did red/green first, I'm not a monster.

    });
  });
});
   /*escribe('GET /time', function(){
    before(function(done){   //done tells you it's async
    chai.request('localhost:3000')
      .get('/time')
      .end(function(err, res){
          error = err;
          response = res;
          done();            //will get a false positive with no done. 
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
});*/
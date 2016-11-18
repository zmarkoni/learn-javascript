
var should = require("chai").should(),
    _      = require("underscore"),
    evento = require("../../lib/evento");

describe("evento", function(){

    beforeEach(function(){
        evento.clear();
    });

    describe("hasEvent", function(){

        it("should return true if event is registered", function(){

            evento.on("eventName", function(){});
            evento.hasEvent("eventName").should.be.true;
        });

        it("should retur false if event is not registered", function(){

            evento.hasEvent("eventName").should.be.false;
        });
    });

    describe("clear", function(){

        it("should remove all rgistered events", function(){

            evento.on("eventName", function(){});
            evento.clear();
            _.isEmpty(evento.events).should.be.true;
        });
    });

    describe("off", function(){

        it("should unbined registered event", function(){

            evento.on("eventName", function(){});
            evento.off("eventName");
            evento.hasEvent("eventName").should.be.false;
        });
    });

    describe("on", function(){

        it("should register event", function(){

            evento.on("eventName", function(){});
            evento.hasEvent("eventName").should.be.true;
        });
    });

    describe("trigger", function(){

        it("should call registered event callback", function(done){

            evento.on("eventName", function(){
                "test".should.be.ok;
                done();
            });
            evento.trigger("eventName");
        });

        it("should pass args to event callback function", function(done){

            evento.on("eventName", function(arg){
                arg.should.equal("argument");
                done();
            });
            evento.trigger("eventName", "argument")
        });
    });
});
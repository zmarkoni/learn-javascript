evento
======

> Observer pattern implementation - [nodejs](http://nodejs.org) library

[![NPM](https://nodei.co/npm/evento.png)](https://nodei.co/npm/evento/)

## Install

    $ npm install evento

    $ bower install evento

## Usage

    var evento = require("evento");

### Attach event listener

    evento.on("someEvent", function(){
        console.log("this is callback");
    });

Attach event - callback with arguments

    evento.on("otherEvent", function(argument){
        console.log("this is callback with argument: " + argument);
    });

### Trigger event

    evento.trigger("someEvent");

Trigger event with argument

    evento.trigger("otherEvent", "argument");

### Remove event listener

    evento.off("someEvent");

### Remove all event listeners

    evento.clear();

### Check if event is attached

    evento.hasEvent("someEvent");

### View all attached events

    evento.getEvents();


## Development

### Install dependencies

    $ make install

### Run tests

    $ make test

## License

(The MIT License)

Copyright (c) 2013 Drasko Gomboc <drasko.gomboc@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


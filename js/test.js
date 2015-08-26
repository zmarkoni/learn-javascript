var myObj = {
    value:0,
    increment:function(inc){
        this.value += typeof inc ==='number' ? inc : 1;
    }
};

//myObj.increment(3);

myObj.double = function() {
    var that = this;
    var helper = function() {
        that.value = that.value + that.value;
    }
    helper();
};

myObj.double(5);
print(myObj.value);

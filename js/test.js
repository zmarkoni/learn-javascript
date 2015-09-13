var name = "The Window";

var obj = {
 name:"My Object",

 getName: function(){
    var that = this;
     return function(){
         return that.name;
     };
 }
};

print(obj.getName()()); //”The Window” (in non-strict mode)

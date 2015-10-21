/* Sync */
function addSync(x,y){
    console.log("[Service] processing ", x ," and ", y);
    var result = x + y;
    console.log("[Service] returning result");
    return result;
}

function addSyncClient(x,y){
    console.log("[Client] triggering add");
    var result = addSync(x,y);
    console.log("[Client] result = ", result);
}

/* Async - Using callbacks*/
function addAsync(x,y, onResult){
    console.log("[Service] processing ", x ," and ", y);
    setTimeout(function(){
        var result = x + y;
        console.log("[Service] returning result");
        if (typeof onResult === 'function') onResult(result);
    },3000);
}

function addAsyncClient(x,y){
    console.log("[Client] triggering add");
    addAsync(x,y, function(result){
        console.log("[Client] result = ", result);
    });
}

/* Async - Using Events */
function getAdder(){
    var _callbacks = [];
    function subscribe(callback){
        _callbacks.push(callback);
    }
    function add(x,y){
        console.log("[Service] processing ", x ," and ", y);
        setTimeout(function(){
            var result = x + y;
            console.log("[Service] returning result");
            _callbacks.forEach(function(callback){
                callback(result);
            });
        }, 3000);
    }
    return {
        add : add,
        subscribe : subscribe
    }
}

//client
var adder = getAdder();
adder.subscribe(function(result){
   console.log("[Client] result = ", result);
});
console.log("[Client] triggering add");
adder.add(100,200);


/* Async - Using Promise */

function addAsyc(x,y){
    var promise = new Promise(function(resolve, reject){
        console.log("[Service] processing ", x ," and ", y);
        setTimeout(function(){
            var result = x + y;
            console.log("[Service] returning result");
            resolve(result);
        },3000);
    });
    return promise;
}

























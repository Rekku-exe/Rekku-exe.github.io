onmessage = function (event) {
    var mainData = event.data;

    event = JSON.parse(JSON.stringify(event));
    
    console.log(mainData)
    parent.postMessage({"posY":2});
};
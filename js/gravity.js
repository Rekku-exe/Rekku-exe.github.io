var parent = new Worker("js/main.js");
onmessage = function (event) {
    var mainData = event.data;

    event = JSON.parse(JSON.stringify(event));
    
    console.log(mainData)
    parent.postMessage({"posY":2});
};
onmessage = function (event) {
    var mainData = event.data;

    event = JSON.parse(JSON.stringify(event));
    
    console.log(event)
    postMessage(event);
};
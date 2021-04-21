onmessage = function (event) {
    var mainData = event.data;

    event = JSON.parse(JSON.stringify(event));
    
    postMessage(event);
};
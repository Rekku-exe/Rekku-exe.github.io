onmessage = function (event) {
    var mainData = event.data;
    
    postMessage(mainData);
};
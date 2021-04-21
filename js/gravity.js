onmessage = function (event) {
    var mainThreadData = event.data;
    postMessage(event);
    
    setTimeout(
        function () {
            postMessage(event);
        },
        100
    );
};
onmessage = function (event) {
    var mainThreadData = event.data;
    postMessage(mainThreadData);
    
    setTimeout(
        function () {
            postMessage(mainThreadData);
        },
        100
    );
};
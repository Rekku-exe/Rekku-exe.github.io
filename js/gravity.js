onmessage = function (event) {
    var mainThreadData = event.data;
    
    setTimeout(
        function () {
            postMessage(mainThreadData);
        },
        1000
    );
};
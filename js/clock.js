var main = new Worker("js/main.js");
const date = Date.now();
let currentDate = null;
onmessage = function () {
    currentDate = Date.now().seconde;
    main.postMessage(currentDate);
}
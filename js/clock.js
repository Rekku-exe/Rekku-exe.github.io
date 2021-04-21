var main = new Worker("js/main.js");
const date = Date.now();
let currentDate = null;
while(true){
    while (currentDate - date < 1000) {
        currentDate = Date.now();
    }
    main.postMessage(currentDate);
}
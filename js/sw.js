if("serviceWorker" in navigator){
    window.addEventListener("load", function(){
        navigator.serviceWorker.register("/serviceWorker.js", {scope: "/"}).then(function(registration){
            console.log("Service worker registed");
        }).catch(function(){
            console.log("Service worker register failed");
        })
    })
}



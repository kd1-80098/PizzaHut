export const constants ={
    MAILJS_SERVICE_ID: "service_fr6eqy7",
    MAILJS_TEMPLATE_ID: "template_z9ustqt",
    MAILJS_PUBLIC_KEY: "JX9jRsQr6H1E1BEes",
    ADMIN_PASSWORD: "YOUR_ADMIN_PASSWORD"
}

export function createurl(path){
    return 'http://localhost:9999/api' + path;
}

// to show/hide the internal responses from server on the browser console. so writing the centralise log method in the centralise env file. if dont want to show the logs in every users console regarding the internal responses getting printed then simply cut-out the console,log statement inside the log method.
export function log(message){
    console.log(message);
}
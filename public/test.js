function loadScript(src, someArgOne, someArgTwo, callback) {
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => callback(null, script, someArgOne, someArgTwo);
    script.onerror = () => callback(new Error(`Ошибка загрузки скрипта ${src}`));
    document.head.append(script);
}
function promisify(f, manyArgs = false) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            function callback(err, ...results) { // наш специальный колбэк для f
                if (err) {
                    return reject(err);
                } else {
                    // делаем resolve для всех results колбэка, если задано manyArgs
                    resolve(manyArgs ? results : results[0]);
                }
            }
            args.push(callback);
            f.call(this, ...args);
        });
    };
};

//вызов
let loadScriptPromise = promisify(loadScript, true);
loadScriptPromise('my_script.js', 'mySomeStr1', 'mySomeStr2')
    .then(arrayOfResults => {
        console.log(arrayOfResults[0].src);
        console.log(arrayOfResults[1]); // mySomeStr1
        console.log(arrayOfResults[2]); // mySomeStr2
        console.log(user.name);
    })
    .catch(err => console.log(err));
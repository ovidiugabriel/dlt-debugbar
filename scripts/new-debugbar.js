 var debugbar = {
    addMessage: function (message, type) {
        var ul_list = document.querySelector('.phpdebugbar-widgets-list');
        var li = document.createElement('li');
        li.setAttribute('class', 'phpdebugbar-widgets-list-item');

        var text = document.createElement('span');
        var label = document.createElement('span');

        text.setAttribute('class', 'phpdebugbar-widgets-value phpdebugbar-widgets-' + type);
        text.innerHTML = message;
        label.setAttribute('class', 'phpdebugbar-widgets-label');
        label.innerHTML = type;

        li.appendChild(text);
        li.appendChild(label);

        if (ul_list) {
            ul_list.appendChild(li);    
        }

        var badge = document.querySelector('.phpdebugbar-badge');
        if (badge) {
            badge.innerText = parseInt(badge.innerText) + 1;
        }               

        var panel = document.querySelector(".phpdebugbar-panel");
        if (panel) {
            panel.scrollTop = panel.scrollHeight;   
        }               
    }
};

console.log = function(message) {
    debugbar.addMessage('<span style="color: gray;">' + message + '</span>', 'log');
};

console.info = function(message) {
    debugbar.addMessage(message, 'info');
};

console.error = function(message) {
    debugbar.addMessage(message, 'error');
};

console.warn = function(message) {
    debugbar.addMessage(message, 'warning');    
};

console.debug = function(message) {
    debugbar.addMessage('<span style="color: blue;">' + message + '</span>', 'debug');  
};

console.assert = function(value, message) {
    if (! value) {
        if (!message) { message = 'console.assert'; }
        debugbar.addMessage('Assertion failed: ' + message, 'error');
        var err = new Error();
        debugbar.addMessage('> ' + err.stack, 'error');
    }
};

console.showToolbar = function() {
    document.querySelector('.phpdebugbar-widgets-toolbar').style.display = 'block';
};

console.hideToolbar = function() {
    document.querySelector('.phpdebugbar-widgets-toolbar').style.display = 'none';
};
        
console.setHeight = function(height) {
    var body = document.querySelector('.phpdebugbar-body');
    if (body) {
        body.style.height = height + 'px';
    }           
};

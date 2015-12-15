// Library for binding shortcuts in websites
// Developed by Matheus Nogueira, 2015.
"use strict"

// Add custom array function that checks if a key is inside the array
Array.prototype.has = function(string) {
    for (var i in this) {
        if (this[i].name == string)
            return true;
    }
    return false;
}

// Library namespace
var Shortcuts = Shortcuts || {};

// Binds a combination of keys to an action.
// @param array array of combination of keys that trigger the action
// @param action function that will be called when the action is triggered.
Shortcuts.bind = function(array, action) {
    // If is array, iterates it and add all of its entries
    if (Array.isArray(array)) {
        for (var i in array) {
            var normalizedStr = this.normalize(array[i]);
            this.actions[normalizedStr] = action;
        }
    } else {
        this.actions[this.normalize(array)] = action;
    }
};

// Normalize a string.
// It removes all the blank spaces and set all the chars as lowercase
// @param str string to be normalized.
// @return normalized string.
Shortcuts.normalize = function(str) {
    return str.toLowerCase().replace(/ /g, "");
};

// Start listening for keyboard events
// After calling this function, the library will trigger all the actions
// that are waiting keys combinations that the user uses.
Shortcuts.start = function() {
    // Add keyboard key down and up event listeners
    // when a key is pressed, its code is added to the active keys
    // and it is removed when the key is released.
    window.onkeydown = this.addActiveKey;
    window.onkeyup = this.removeActiveKey;
};

// Function used to add a key to the array of active keys.
// Active keys are the keys that are currently pressed by the user.
Shortcuts.addActiveKey = function(event) {
    // Get the key that was pressed.
    var key = Shortcuts.getKeyByCode(event.keyCode);
    // Set it as pressed
    key.pressed = true;
    // Tells the library that the state has changed
    return Shortcuts.changedState(event);
};

// Function used to remove a key from the array of active keys.
// That means that the user is no longer pressing that key.
Shortcuts.removeActiveKey = function(event) {
    // Get the key that was released.
    var key = Shortcuts.getKeyByCode(event.keyCode);
    // Set as not pressed.
    key.pressed = false;
};

// Function that gets the keys that are being pressed by the user.
// @return array of pressed keys.
Shortcuts.getPressedKeys = function() {
    var keys = [];
    for (var i in Shortcuts.keys) {
        if (Shortcuts.keys[i].pressed)
            keys.push(Shortcuts.keys[i]);
    }
    return keys;
}

// Function that will make the library to check for the entered
// input and check if any action must be called.
Shortcuts.changedState = function(event) {
    // Get all keys that are pressed at the moment.
    var keys = [];
    for (var i in Shortcuts.keys) {
        if (Shortcuts.keys[i].pressed)
            keys.push(Shortcuts.keys[i].name);
    }
    // Get the string that represents the shortcut
    var shortcut = Shortcuts.normalize(keys.join(" + "));
    // Call the callback for that shortcut, if it exists
    if (Shortcuts.actions[shortcut])
        return Shortcuts.actions[shortcut](event);
    else {
        // Get the pressed keys and check if ctrl is pressed and other key
        // is pressed. Normally, all the native shortcuts use ctrl [+shift] + letter.
        // Shift in this case is optional.
        // So, if we get a combination of letters that have control and other key diferent
        // of shift and alt, reset the keys.
        var pressedKeys = Shortcuts.getPressedKeys();
        if (pressedKeys.length >= 2) {
            // Check if control is a key that is pressed
            if (pressedKeys.has("ctrl")) {
                if (pressedKeys.length == 2 &&
                    (pressedKeys.has("alt")) || pressedKeys.has("shift"))
                    return true;
            }
            // Reset the memory
            for (var i in pressedKeys) {
                pressedKeys[i].pressed = false;
            }
        }
    }
    return true;
};

// Function that get the key based on its code.
// @param keyCode code of the key
// @return object that represents that key.
Shortcuts.getKeyByCode = function(keyCode) {
    for (var i in Shortcuts.keys) {
        if (Shortcuts.keys[i].code == keyCode)
            return Shortcuts.keys[i];
    }
};

// Set array of actions
Shortcuts.actions = [];

// List of all the keys (name and code)
Shortcuts.keys = [
    { name: "backspace", code: 8 },
    { name: "tab", code: 9 },
    { name: "enter", code: 13 },
    { name: "shift", code: 16 },
    { name: "ctrl", code: 17 },
    { name: "alt", code: 18 },
    { name: "pause", code: 19 },
    { name: "caps_lock", code: 20 },
    { name: "escape", code: 27 },
    { name: "page up", code: 33 },
    { name: "page down", code: 34 },
    { name: "end", code: 35 },
    { name: "home", code: 36 },
    { name: "left_arrow", code: 37 },
    { name: "up_arrow", code: 38 },
    { name: "right_arrow", code: 39 },
    { name: "down_arrow", code: 40 },
    { name: "insert", code: 45 },
    { name: "delete", code: 46 },
    { name: ";", code: 186 },
    { name: "/", code: 191 },
];

// Add systematicly all the missing keys
// Numbers [0-9]
for (var i = 0; i < 10; ++i) {
    Shortcuts.keys.push({ name: ""+i, code: (48+i) });
}
// Letters [a-z]
for (var i = 0; i < 26; ++i) {
    Shortcuts.keys.push( { name: String.fromCharCode(65 + i), code: (65 + i) });
}

// Function keys F[1-12]
for (var i = 0; i < 12; i++) {
    Shortcuts.keys.push( { name: "F" + (i+1), code: (112 + i) });
}

// Add a new property to all keys (pressed)
for (var i in Shortcuts.keys) {
    Shortcuts.keys[i].pressed = false;
}


// Library for binding shortcuts in websites
// Developed by Matheus Nogueira, 2015.

// Library namespace
var Shortcuts = Shortcuts || {};

// Set array of actions
Shortcuts.actions = [];
Shortcuts.activeKeys = [];

// Binds a combination of keys to an action.
// @param array array of combination of keys that trigger the action
// @param action function that will be called when the action is triggered.
Shortcuts.bind = function(array, action) {
    // If is array, iterates it and add all of its entries
    if (Array.isArray(array)) {
        for (var i in array) {
            this.actions[array[i]] = action;
        }
    } else {
        this.actions[array] = action;
    }
}

// Start listening for keyboard events
// After calling this function, the library will trigger all the actions
// that are waiting keys combinations that the user uses.
Shortcuts.start = function() {
    // Add keyboard key down and up event listeners
    // when a key is pressed, its code is added to the active keys
    // and it is removed when the key is released.
    window.onkeydown = this.addActiveKey;
    window.onkeyup = this.removeActiveKey;
}

// Function used to add a key to the array of active keys.
// Active keys are the keys that are currently pressed by the user.
Shortcuts.addActiveKey = function(event) {
    // Add key to the array of active keys
    Shortcuts.activeKeys.push(event.keyCode);
    // Tells the library that the state has changed
    Shortcuts.changedState();
    console.log(String.fromCharCode(event.keyCode));
}

// Function used to remove a key from the array of active keys.
// That means that the user is no longer pressing that key.
Shortcuts.removeActiveKey = function(event) {
    // Search key in the array
    for (var i in this.activeKeys) {
        if (this.activeKeys[i] == event.keyCode)
            this.activeKeys.splice(i, 1);
    }
    // Tells the library that the state has changed
    Shortcuts.changedState();
}

// Function that will make the library to check for the entered
// input and check if any action must be called.
Shortcuts.changedState = function() {
}

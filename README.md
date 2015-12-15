# Shortcuts
## Lightweight library to handle shortcuts in a web application
[![Code Climate](https://codeclimate.com/github/mathnogueira/Shortcuts/badges/gpa.svg)](https://codeclimate.com/github/mathnogueira/Shortcuts)

This library aims to provide an easy way to use shortcuts in a web application. It has no external dependecies.[

### HOW TO USE
```javascript
<script>
// Bind a shortcut to a function
Shortcuts.bind("Ctrl + P", function(e) {
    alert("Hahaha I will not allow you to print this amazing website =P");
    // If you return false, you are preventing the browser to do the default operation for that shortcut
    // if you use return true; or if you dont return anything; it will execute the
    // default operation for the shortcut.
    // You also can use e.preventDefault() as an alternative to return false;
    return false;
});

// You must indicate to the library that you are over with adding shortcuts,
// so it can start listening for events.
Shortcuts.start();
</script>
```

You also can add multiple shortcuts to the same function. It is as easy as:

```javascript
<script>
// You can pass any number of shortcuts inside the array
// and all of them will be associated with the function.
Shortcuts.bind(["Ctrl + P", "Ctrl + K"], function(e) {
    alert("Look, you can use multiple shortcuts to the same function");
    return false;
});

// Start listening for the keyboard events.
Shortcuts.start();
</script>
```

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
    // This prevents the browser to execute the default operation of that
    // shortcut.
    e.preventDefault();
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
    e.preventDefault();
});

// Start listening for the keyboard events.
Shortcuts.start();
</script>
```

You can also unbind a shortcut in a easy way:

```javascript
<script>
    // Some awesome code here...
    // If you have defined a shortcut to the keys Ctrl + P, the statement bellow
    // will undo it. So, the shortcut will no longer exist.
    Shortcuts.unbind("Ctrl + P");
    // More of awesome code here...
</script>
```
You can unbind several shortcuts at the same time passing them inside an array to the unbind function,
like this:

```javascript
<script>
    // Some code here...
    // Unbind several shortcuts at the same time
    Shortcuts.unbind(["Ctrl + P", "Ctrl + K", "Alt + G"]);
    // How did you do that?
    // Answer: http://i.imgur.com/gBKH3cj.gif
</script>
```

### Multiple scopes

Usually, we want to be able to add new shortcuts for different screens of our application, but we do not
want to add shortcuts in the whole application, just in a tiny part of it. In those cases, you can create
a new scope for your shortcuts and add new shortcuts or override the existing ones.

The advantages of using scopes for your application is that you avoid filling up your app
with tons of shortcuts that are useless at most parts of your app. And when you create a new
scope, your old shortcuts still work.

To create a new scope is as simple as:

```javascript
<script>
    // your code here...
    // This will create a new scope that will be accessible in your application.
    // Here you can add and override shortcuts and still access the old ones.
    Shortcuts.stackScope();
    // your code here...
    // This statement will destroy the latest scope that was created
    // So, all the changes done in the scope are destroyed.
    Shortcuts.popScope();
    // Continue your code.
</script>
```

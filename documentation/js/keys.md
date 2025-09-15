# Keys documentation
### This is my solution to make using the keyboard easier, [keys.js](../../libs/js/keys.js)
## How to use?
### You can access it with the ```keys``` constant variable, or you can rename it in the file
### No need for any fancy things like NodeJS, it's built on plain JavaScript

## Variables
### Accessable by running ```keys.<var>```, e.g: ```keys.anyKeysDown```

### - anyKeysDown       |       Returns true, if any keys is pressed down
### - allKeysDown       |       Returns all, currently pressed keys, only the keys
### logKeysDown         |       You can set it, if it's true, it's gonna log every key held down at every keypress

### **Important! Do not edit**
### - keysDown          |       stores the keys being pressed, format: key||frames, e.g: KeyW||69
### - keysBound         |       stores the info for the keys bound (bindkey)
### - cooldown          |       stores the info for the keys on cooldown
### - updateID          |       stores the id needed to start running a new update cycle, exists for backwards compatibility

## Commands / Functions
### Accessable by running ```keys.<function>(<args>)```, e.g: ```keys.hPress("KeyW")```
### I use key.code, so you'll need to provide keys like "KeyW", "ShiftLeft", etc.
### If you set ```keys.logKeysDown``` to true, you'll be able to see the keycodes in the console
#
### - isKeyPressed(key, time=1)     |       Returns true if the given key has been pressed down for exactly ```time``` amount of frames
### - hasBeenDownFor(key, time=1)   |       Returns true, if the given key has been pressed down for exactly or more than ```time``` frames
### - hPress(key)                   |       Returns true, if the given key has been pressed for 1 frames OR more than 19 frames
### - isKeyDown(key)                |       Returns true, if the given key is currently pressed down
### - add(key)                      |       Don't use it. It's used for handling new keypresses
### - remove(key)                   |       Don't use it. It's used for handling removing no longer pressed keys
### - bindkey(key, func, type="keydown", cooldown=0)
###     - examples: 
```
keys.bindkey("KeyW", () => { console.log("W has just been pressed"); }, "press", 10);
keys.bindkey("KeyA", () => { console.log("A is being held down"); }, "down", 0);
keys.bindkey("KeyS", () => { console.log("S has just been released"); }, "up", 52);
keys.bindkey("KeyD", () => { console.log("D... is active"); }, "hpress", 7);
```
### - unbindkey(key, type=null)     |       Unbinds the given key, if type is given, only key>type will be removed
### - isKeyActive(key, type="down") |       Is the key active in the way of ```type```. Doesn't accept keyup and up
### - update()                      |       Don't use it. Starts the update loop, automatically ran.
### - isOnCooldown()                |       Returns true if key is on cooldown
### - handleCooldowns()             |       Handles cooldowns

## Bound key types
### - keydown, down: uses the ```isKeyDown()``` function
### - keypress, press: uses the ```isKeyPressed()``` function
### - keyup, up: runs in the ```remove()``` function
### - keyhpress, hpress: uses the ```hPress()``` function
### A key can be bound to all of these types once, e.g.
```
keys.bindkey("KeyA", () => { console.log("A has just been pressed down"); }, "press");
keys.bindkey("KeyA", () => { console.log("A was released"); }, "up");
```
### But binding a key again will rebind it, e.g.
```
keys.bindkey("KeyA", () => { console.log("A has just been pressed down"); }, "press");
keys.bindkey("KeyA", () => { console.log("A is very much pressed"); }, "press");
```
## Use the cooldown feature
### It's an optional argument, it can be set when binding a key with bindkey as the 4th variable
### If the cooldown is set to 1 or less it's instant, so it won't even be added to the cooldown list
### Examples:
```
keys.bindkey("KeyW", () => {
    console.log("Hell yeah");
}, "down", 10);  // While you're holding the W key, it's gonna print "Hell yeah" to the console, then put itself on a cooldown for 10 frames
keys.bindkey("KeyW", () => {
    console.log("Horses");
}, "up");  // When the W key is released, it's gonna print "Horses" to the console, no cooldown
```
## Classes:
### keysKey: used for stored keys
### keysClass: the main class of this library
### keysKeyBind: used for saving bound keys
### keysKeyCooldown: used for saving keys on cooldown
## Plans:
### remove keysKey class or stay with the string format, but stop runtime conversion between the two, it's unnecessary.



# Keys documentation
### This is my solution to make using the keyboard easier, [keys.js](../libs/keys.js)

## How to use?
### You can access it, by the ```keys``` constant variable, or you can rename it in the file
### I highly recommend you adding ```keys.update()``` inside your update function, because this library needs to count frames in order to work properly
### No need for any fancy things like NodeJS, it runs on plain JavaScript

## Variables
### Accessable by running ```keys.<var>```, e.g: ```keys.anyKeysDown```

### - anyKeysDown       |       Returns true, if any keys is pressed down
### - allKeysDown       |       Returns all, currently pressed keys, only the keys
### logKeysDown         |       You can set it, if it's true, it's gonna log every key held down at every keypress

### **Important! Do not edit**
### - keysDown          |       stores the keys being pressed, format: key||frames, e.g: KeyW||69
### - keysBound         |       stores the info for the keys bound (bindkey)

## Commands / Functions
### Accessable by running ```keys.<function>(<args>)```, e.g: ```keys.hPress("KeyW")```
### I use key.code, so you need to provide keys like "KeyW", "ShiftLeft", etc.
### If you set ```keys.logKeysDown``` to true, you'll be able to see the keycodes in the console
#
### - isKeyPressed(key, time=1)     |       Returns true if the given key has been pressed down for exactly ```time``` amount of frames
### - hasBeenDownFor(key, time=1)   |       Returns true, if the given key has been pressed down for exactly or more than ```time``` frames
### - hPress(key)                   |       Returns true, if the given key has been pressed for 1 frames OR more than 19 frames
### - isKeyDown(key)                |       Returns true, if the given key is currently pressed down
### - add(key)                      |       Don't use it. It's used for handling new keypresses
### - remove(key)                      |       Don't use it. It's used for handling removing no longer pressed keys
### - bindkey(key, func, type="keydown")
###     - examples: 
```
keys.bindkey("KeyW", () => { console.log("W has just been pressed"); }, "press");
keys.bindkey("KeyA", () => { console.log("A is being held down"); }, "down");
keys.bindkey("KeyS", () => { console.log("S has just been released"); }, "up");
keys.bindkey("KeyD", () => { console.log("D... is active"); }, "hpress");
```
### - unbindkey(key, type=null)     |       Unbinds the given key, if type is given, only key>type will be removed
### - isKeyActive(key, type="down") |       Is the key active in the way of ```type```. Doesn't accept keyup and up
### - update()                      |       I highly recommend you adding this to your Update() cycle. Needed for: binding keys, .hPress(), .hasBeenDownFor(), .isKeyPressed()
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
## Classes:
### keysKey: used for stored keys
### keysClass: the main class of this library
### keysKeyBind: used for saving bound keys

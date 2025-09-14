# Vector documentation
### My library to make using 2D Vector a TON easier
## How to use?
### Accessible by the Vector class
### Important: fok = degrees (e.g. 45°, 60°, 90°, 420°)
### The in-file explanation is half-Hungarian, half-English, if you wanna know stuff, either learn Hungarian (easy) or just read this documentation
### There are multiple ways to create variables with this class, here are all of them:
```js
let v1 = new Vector(6, 9);
let v2 = Vector.as(4, 20);
let v3 = Vector.grid(2);  // x = 2, y = 2
let v4 = Vector.parseJSON({"x": 3, "y": 4});  // Or .fromJSON
let v5 = Vector.parseJSON("{\"x\": 3, \"y\": 4}");  // Or .fromJSON
let v6 = Vector.parseFok(69);  // Or .fromFok, creates a vector from degrees with a length of 1
let v7 = Vector.parseRad(Math.PI);  // Or .fromRad, creates a vector from radians with a length of 1
```
## Static variables
### You can call them using the `Vector.<var>` syntax (e.g. Vector.null)
#### Set vectors
- null | returns a Vector with both x and y being 0
#### Directions
- up | returns a Vector facing upwards
- down | returns a Vector facing downwards
- left | returns a Vector facing left
- right | returns a Vector facing right
#### Fok, radian conversion
- fok1rad | returns 1 degrees in radians (~0.017)
- fok15rad | returns 15 degrees in radians (~0.262)
- fok30rad | returns 30 degrees in radians (~0.524)
- fok45rad | returns 45 degrees in radians (~0.785)
- fok90rad | returns 90 degrees in radians (~1.571)
- fok135rad | returns 135 degrees in radians (~2.356)
- fok180rad | returns 180 degrees in radians (~3.142, PI)
- fokToRad | multiply by this to convert degrees to radians (e.g. 180 * Vector.fokToRad => PI)
- fokToRadDev | devide by this to convert degrees to radians (e.g. 180 / Vector.fokToRadDev => PI)
- radToFok | multiply by this to convert radians to degrees (e.g. PI * Vector.radToFok => 180)
- radToFokDev | devide by this to convert radians to degrees (e.g. PI / Vector.radToFokDev => 180)

# More documentation incoming later, I got school tmrw

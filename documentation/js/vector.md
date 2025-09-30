# Vector documentation
### My library to make using 2D Vector a TON easier, [vector.js](../../libs/js/vector.js)
### Current version: 1.6
## How to use?
### Accessible via the Vector class
### Important: fok = degrees (e.g. 45°, 60°, 90°, 420°)
### The in-file explanation is half-Hungarian, half-English, if you wanna know stuff, either learn Hungarian (easy) or just read this documentation
### There are multiple ways to define variables with this class
### Examples for each of them
```js
let v1 = new Vector(6, 9);
let v2 = Vector.as(4, 20);
let v3 = Vector.grid(2);  // x = 2, y = 2, !DEPRECATED! the base class can do the same: new Vector(3) -> 3;3
let v4 = Vector.parseJSON({"x": 3, "y": 4});  // Or .fromJSON
let v5 = Vector.parseJSON("{\"x\": 3, \"y\": 4}");  // Or .fromJSON
let v6 = Vector.parseFok(69);  // Or .fromFok, creates a vector from degrees with a length of 1
let v7 = Vector.parseRad(Math.PI);  // Or .fromRad, creates a vector from radians with a length of 1
let v8 = Vector.x(10);
let v9 = Vector.y(10);
let v10 = Vector.random(5, 10);
let v11 = Vector.randomX(5, 10);
let v12 = Vector.randomY(5, 10);
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
## Static functions
### You can call them using the `Vector.<function>(<?args>)` syntax (e.g. Vector.as(69, 420))
#### Vector declaration
- as(x=0, y=0)               |        returns a new Vector with the given values
- grid(n=0)                  |        returns a new Vector with both values equal to `n`, !DEPRECATED! the base class does the same if only 1 value is present since version 1.6
- x(x=0)                     |        returns a new Vector with it's X value being `x` and Y value being 0
- y(y=0)                     |        returns a new Vector with it's Y value being `y` and X value being 0
- random(min=0, max=1)       |        returns a new Vector with both values being a random number between `min` and `max`. The values are different
- randomX(min=0, max=1)      |        returns a new Vector with it's X value being a random number between `min` and `max`, Y is 1
- randomY(min=0, max=1)      |        returns a new Vector with it's Y value being a random number between `min` and `max`, X is 1
- fokToRadian(fok=0)         |        returns the degrees (`fok`) in radians
- radianToFok(radian=0)      |        returns the radians in degrees
- fromJSON(json="")          |        alias for parseJSON(json="")
- parseJSON(json="")         |        returns a new Vector from the given values in `json`. `json` may be an object, or a string
- fromFok(fok=0, ztz=false)  |        alias for parseFok
- parseFok(fok=0, ztz=false) |        returns a new, normalized Vector that points in the given direction. If ztz is true, fok == 0 -> return Vector.null
- fromRad(rad=0, ztz=false)  |        alias for parseRad
- parseRad(rad=0, ztz=false) |        returns a new, normalized Vector that points in the given direction. If ztz is true, rad == 0 -> return Vector.null
#### Conversion
- fokToRadian(fok=0)      |        returns the given degrees in radians
- radianToFok(radian=0)   |        returns the given radians in degrees
## Variables
### You can call them using the `v.<var>` syntax, where v is an already defined Vector and \<var\> is the variable name (e.g. Vector.as(5, 6).x)
#### Constructor
- x    |    the `x` value of the Vector
- y    |    the `y` value of the Vector
#### Calculated in runtime
- length        |    returns the length of the Vector
- normalized    |    returns the normalized value of the Vector
- rounded       |    returns a new Vector with it's own values rounded to the nearest integer
- int           |    alias for rounded
- floor         |    returns a new Vector with it's own values rounded down
- ceil          |    returns a new Vector with it's own values rounded up
- self          |    returns a copy of itself
- radian        |    returns it's direction in radians
- fok           |    returns it's direction in degrees
- down          |    returns a Vector relatively downwards from itself, 1 step
- up            |    returns a Vector relatively upwards from itself, 1 step
- left          |    returns a Vector relatively to the left from itself, 1 step
- right         |    returns a Vector relatively to the right from itself, 1 step
- isNull        |    returns true if it's values are the same as Vector.null's
- dforward      |    returns the direction forward in radians
- dleft         |    returns the direction to it's left (forward - 90 degrees)
## Functions
### You can call them using the `v.<function>(<?args>)` syntax, where v is an already defined Vector and \<function\> is the function name (e.g. Vector.as(5, 6).scale(72))
#### Self targeting functions
##### All of them return `this`, so you can chain them together, e.g. this is valid:
```js
console.log(Vector.as(6, 7).normalized.parseFok(45).normalize().scale(720).dev(Vector.grid(42)).toString("♥"));
```
Output:
```js
12.121830534626529♥12.121830534626529
```
- parseJSON(json="")   |    same as Vector.parseJSON, but it sets the values on itself
- parseFok(fok=0)      |    same as Vector.parseFok, but it sets the values on itself
- parseRad(rad=0)      |    same as Vector.parseRad, but it sets the values on itself
- flip(x=true, y=true) |    flips the values of X and Y, if the corresponding variable is true
- flipX()              |    flips the X value
- flipY()              |    flips the Y value
- noramlize()          |    sets itself to it's normalized value
- setLength(n=1)       |    sets the length to `n`
- scale(n=1)           |    multiplies both of it's values by `n`
- move(x=0, y=0)       |    moves itself by the given amount
- movev(v2)            |    moves itself by the given amount
- rotate(val, rad=true)    |    rotates itself by `val` units, if rad is true, units is radians, otherwise it's degrees
- set(x=0, y=0)            |    sets it's own values to the given ones
- setv(v2=Vector.null)     |    sets it's own values to the given vector's values
- moveInDirection(v2)      |    moves in `v2`'s direction
- add(v2)                  |    adds `v2`'s values to it's own, `v2` may be a Vector, a Number or a String
- sub(v2)                  |    subtracts `v2`'s values from it's own, `v2` may be a Vector, a Number or a String
- mult(v2)                 |    multiplies it's own values by `v2`'s values, `v2` may be a Vector, a Number or a String
- dev(v2)                  |    devides it's own values by `v2`'s values, `v2` may be a Vector, a Number or a String
- modulo(v2)               |    uses the modulo operation, own values % `v2`'s values, `v2` may be a Vector, a Number or a String
- roundToDivision(n=16)    |    rounds itself to the nearest X and Y values, which are divisible by `n`
#### Complex self targeting functions
##### Most of them won't work if you only call it once, because they're designed to look cool, if you do call them, I'd recommend doing so in a loop
- moveTowards(v2, speed=5, enableTeleport=true)    |    moves towards `v2` by `speed` steps. If `enableTeleport` is true and it would overshoot `v2` with the next step, it teleports to `v2`
- lockWithDistance(v2, speed=10, distance=5, min=NaN, max=NaN)    |    it sets it's position, so that it's exactly `distance` steps away from `v2`. The `speed` is how fast it get's there. The `min` and `max` are the values that set the maximum- and minimum- speed after calculation. Example usage: rotating mouse cursor
- followWithDistance(v2, distance=5)    |    if the distance between itself and `v2` is greater than `distance`, it goes towards `v2` until the distance between the 2 is equal to `distance`. Example usage: cool chains
#### What if functions
- scaled(n=1)              |    returns a new Vector, as if the given one was scaled up by `n`
- added(v2)                |    returns a new Vector, as if .add(v2) was called on itself
- subbed(v2)               |    returns a new Vector, as if .sub(v2) was called on itself
- multed(v2)               |    returns a new Vector, as if .mult(v2) was called on itself
- deved(v2)                |    returns a new Vector, as if .dev(v2) was called on itself
- moduloed(v2)             |    returns a new Vector, as if .modulo(v2) was called on itself
- withLength(n=1)          |    returns a new Vector, as if .setLength(n) was called on itself
- rotated(val, rad=true)   |    returns a new Vector, as if .rotate(val, rad) was called on itself
#### Info functions
- distanceTo(v2=Vector.null)               |    returns the distance between itself and the given vector
- directionTo(v2=Vector.null, rad=true)    |    returns the direction between itself and the given vector. By default, it returns radians.
- directionToLeft(fok=0)                   |    returns the rotation by `fok` degrees to it's left
- directionToRight(fok=0)                  |    returns the rotation by `fok` degrees to it's right
- similar(v2, threshold=0)                 |    returns true, if the difference between the given vector and itself is less than or equal to `threshold`
- isSameAs(v2=this.copy())                 |    returns true, if the given vector's values are equal to it's values
- copy()                                   |    returns a copy of itself
- isDivisibleBy(n=2)                       |    returns true, if both of it's values are divisable by `n`
- placeInGrid(n=16)                        |    within a grid where the size of the cells is `n`, returns the position of the cell in which this would be
- toString(split=";")                      |    returns a string with the syntax: `"${x}${split}${y}"`, `split` is the separator
#### Visual functions
- visualizev(pos=Vector.null)              |    draws a circle with a line on the inside in the direction that the vector points in, with the length of the vector in the position of `pos`
- visualize(x, y)                          |    same as .visualizev(), but with a different input

## If you've got questions or something doesn't work, create an Issue and I'll look at it

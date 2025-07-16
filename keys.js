class keysKey {
    constructor(name="", time=-1) {
        this.name = name;
        this.time = time;
    }
    str() {
        return `${this.name}||${this.time}`;
    }
    static from(str) {
        return new keysKey(...str.split("||"));
    }
}
/**
 * @description Az update ciklusodhoz add hozzá ennek az update functionjét
 * @description Ha nem adod hozzá, akkor semmi sem fog működni, ami frame-eket számol
 * @example
 * keys.update()
 */
class keysClass {
    constructor(logKeysDown=false) {
        this.keysDown = new Set();
        this.keysBound = {};
        this.logKeysDown = logKeysDown;
    }
    get anyKeyDown() {
        return this.keysDown.size > 0;
    }
    get allKeysDown() {
        return Array.from(this.keysDown).map(x => x.split("||")[0]);
    }
    /**
     * Has the key been pressed for exactly {time} frames
     * @param {Number} time frames
     */
    isKeyPressed(key, time=1) {
        let keys = [...this.keysDown], f = false
        keys.forEach(k => {
            if (f) return;
            let keyw = keysKey.from(k)
            if (keyw.name == key && keyw.time <= time) f = true;
        })
        return f;
    }
    /**
     * @param {Number} time frames
     */
    hasBeenDownFor(key, time=1) {
        let keys = [...this.keysDown], f = false
        keys.forEach(k => {
            if (f) return;
            let keyw = keysKey.from(k)
            if (keyw.name == key && keyw.time >= time) f = true;
        })
        return f;
    }
    /**
     * Key has been down for either 1 frame, or 19<
     */
    hPress(key) {
        return this.isKeyPressed(key, 1) || this.hasBeenDownFor(key, 20)
    }
    /**
     * Is key currently down
     */
    isKeyDown(key) {
        let keys = [...this.keysDown], f = false
        keys.forEach(k => {
            if (f) return;
            if (k.split("||")[0] == key) f = true;
        })
        return f;
    }
    add(key) {
        let keys = [...this.keysDown]
        let names = keys.map(x => x.split("||")[0])
        if (!names.includes(key.name))
            keys.push(key.str())
        this.keysDown = new Set(keys);
    }
    remove(key) {
        let keys = [...this.keysDown], t = [...keys], r = []
        t.forEach((x, i) => {
            let kname = x.split("||")[0];
            if (kname == key.name) {
                if (kname in this.keysBound) {
                    let boundKey = this.keysBound[kname];
                    boundKey.forEach(ak => {
                        if (["up", "keysup"].includes(ak.type.toLowerCase()))
                            ak.func();
                    })
                }
                keys.splice(i, 1)
                r.push(x)
            }
        })
        this.keysDown = new Set(keys);
    }
    /**
     * 
     * @param {String} key KeyA, KeyW
     * @param {Function} func Bound function
     * @param {String} type keydown, down, keypress, press, keyup, up, keyhpress, hpress
     */
    bindkey(key, func, type="keydown") {
        let place = this.keysBound[key];
        if (place) {
            let dirs = place.map(x => x.type);
            if (dirs.includes(type)) {
                let found = place.filter(x => x.type == type)[0];
                place[place.indexOf(found)].func = func;
            }
            else
                place.push(keysKeyBind.as(func, type));
            return;
        }
        this.keysBound[key] = [keysKeyBind.as(func, type)];
    }
    unbindkey(key, type=null) {
        if (type == null) delete this.keysBound[key];
        else {
            let foundTypes = this.keysBound[key].filter(x => x.type == type);
            foundTypes.forEach(q => {
                this.keysBound[key].splice(this.keysBound[key].indexOf(q), 1);
            })
            if (this.keysBound[key].length == 0) delete this.keysBound[key];
        }
    }
    /**
     * 
     * @param {String} key KeyA, KeyW (key.code)
     * @param {String} type press, down, hpress
     */
    isKeyActive(key, type="down") {
        if (["press", "keypress"].includes(type.toLowerCase())) {
            return this.isKeyPressed(key);
        } else if (["hpress", "keyhpress"].includes(type.toLowerCase())) {
            return this.hPress(key);
        } else {
            return this.isKeyDown(key);
        }
    }
    update() {
        let keys = [...this.keysDown].map(x => { 
            let y = x.split("||"); 
            return new keysKey(y[0], parseInt(y[1]) + 1).str()
        })
        this.keysDown = new Set(keys);
        keys.forEach(key => {
            key = key.split("||")[0];
            if (key in this.keysBound) {
                let boundKey = this.keysBound[key];
                boundKey.forEach(ak => {
                    if (ak.type.toLowerCase().includes("up")) return;
                    if (this.isKeyActive(key, ak.type))
                        ak.func();
                })
            }
        })
        if (this.logKeysDown) console.log(keys);
    }
}
class keysKeyBind {
    constructor(func=() => {}, type="keydown") {
        this.func = func;
        this.type = type;
    }
    static as(func, type="keydown") {
        return new keysKeyBind(func, type);
    }
}
/**
 * Frame számoláshoz
 * @example keys.update()
 */
const keys = new keysClass();

document.addEventListener("keydown", function(k) { keys.add(new keysKey(k.code, 0)); })
document.addEventListener("keyup", function(k) { keys.remove(new keysKey(k.code)); })
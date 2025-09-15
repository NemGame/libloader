// 2025. 07. 17. ; 12:01
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
class keysClass {
    constructor(logKeysDown=false) {
        this.keysDown = new Set();
        this.cooldown = [];
        this.keysBound = {};
        this.logKeysDown = logKeysDown;
        this.updateID = -69;  // Makes sure that only 1 update cycle is running
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
                        if (!this.isOnCooldown(kname) && ["up", "keyup"].includes(ak.type.toLowerCase())) {
                            ak.func();
                            if (ak.cooldown > 1) {
                                this.cooldown.push(new keysKeyCooldown(kname, ak.cooldown, ak.type));
                                if (this.logKeysDown) console.log(`${kname} has been put on cooldown for ${ak.cooldown} frames`);
                            }
                        }
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
    bindkey(key, func, type="down", cooldown=0) {
        let place = this.keysBound[key];
        if (place) {
            let dirs = place.map(x => x.type);
            if (dirs.includes(type)) {
                let found = place.filter(x => x.type == type)[0];
                place[place.indexOf(found)].func = func;
            }
            else
                place.push(keysKeyBind.as(func, type, cooldown));
            return;
        }
        this.keysBound[key] = [keysKeyBind.as(func, type, cooldown)];
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
    isOnCooldown(key="KeyW") {
        for (let i = 0; i < this.cooldown.length; i++) {
            if (this.cooldown[i].key == key) return true;
        }
        return false;
    }
    handleCooldowns() {
        let removeIndexes = [];
        this.cooldown.forEach((x, i) => {
            x.cooldown -= 1;
            if (x.cooldown > 0) return;
            removeIndexes.push(i);
        });
        removeIndexes.reverse().forEach(i => {
            if (this.logKeysDown) console.log(`${this.cooldown[i].key} removed from cooldown list`);
            this.cooldown.splice(i, 1);
        });
    }
    update(id=0) {
        if (id != this.updateID) return;
        this.handleCooldowns();
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
                    if (!this.isOnCooldown(key) && this.isKeyActive(key, ak.type)) {
                        ak.func();
                        if (ak.cooldown > 1) {
                            this.cooldown.push(new keysKeyCooldown(key, ak.cooldown, ak.type));
                            if (this.logKeysDown) console.log(`${key} has been put on cooldown for ${ak.cooldown} frames`);
                        }
                    }
                })
            }
        })
        if (this.logKeysDown) console.log(keys);
        requestAnimationFrame(() => { this.update(id); });
    }
}
class keysKeyBind {
    /**
     * 
     * @param {Function} func The function that runs
     * @param {string} type keydown, down, keypress, press, keyup, up, keyhpress, hpress
     * @param {Number} cooldown The cooldown between registering actions
     */
    constructor(func=() => {}, type="keydown", cooldown=0) {
        this.func = func;
        this.type = type;
        /** Time between registering as pressed in frames */
        this.cooldown = cooldown;
    }
    static as(func, type="keydown", cooldown=0) {
        return new keysKeyBind(func, type, cooldown);
    }
}
class keysKeyCooldown {
    constructor(key="", cooldown=0, type="down") {
        this.key = key;
        this.cooldown = cooldown;
        this.type = type;
    }
}
/**
 * Put this in your Update() loop:
 * @example keys.update()
 */
const keys = new keysClass();

keys.update(keys.updateID);  // Starts the update cycle

document.addEventListener("keydown", function(k) { keys.add(new keysKey(k.code, 0)); })
document.addEventListener("keyup", function(k) { keys.remove(new keysKey(k.code)); })


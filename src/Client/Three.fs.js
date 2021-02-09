import { Union } from "./.fable/fable-library.3.1.1/Types.js";
import { union_type } from "./.fable/fable-library.3.1.1/Reflection.js";

export class Curve$1 extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["Curve"];
    }
}

export function Curve$1$reflection(gen0) {
    return union_type("Three.Curve`1", [gen0], Curve$1, () => [[["Item", gen0]]]);
}

export class Record$2 extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["Record"];
    }
}

export function Record$2$reflection(gen0, gen1) {
    return union_type("Three.Record`2", [gen0, gen1], Record$2, () => [[["Item1", gen0], ["Item2", gen1]]]);
}


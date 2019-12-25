function XorShift32() {
    this.sa = 1;
    this.sb = 2;
}

XorShift128p.prototype.randint = function() {
    var t = this.sa;
    var s = this.sb;
    this.sa = s;
    t ^= t << 23;       // a
    t ^= t >> 17;       // b
    t ^= s ^ (s >> 26); // c
    this.sb = t;
    return t + s;
}

XorShift128p.prototype.seed = function(a, b) {
    this.sa = a;
    this.sb = b;
}

export {XorShift128p};

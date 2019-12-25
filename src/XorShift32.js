function XorShift32() {
    this.sa = new Uint32Array(1);  
}

XorShift32.prototype.randint = function() {
    var x = new Uint32Array(1);
    x[0] = this.sa[0];
    x[0] ^= x[0] << 13;
    x[0] ^= x[0] >> 17;
    x[0] ^= x[0] << 5;
    return this.sa[0] = x[0]; 
}

XorShift32.prototype.seed = function(a) {
    this.sa[0] = a;
}

export {XorShift32};

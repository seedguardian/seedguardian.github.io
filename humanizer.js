// humanizer.js - by Mathieu Gorichon - released under MIT License

var humanizer = (function () {
 
    var module = {};
 
    // private
    function padLeft(n, width) {
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    }

    function dec2bin(num) {
        var bin = '';
        if(isNaN(num)){
                throw new Error('Invalid dec character.')
        } 
        return num.toString(2);
    }

    function bin2dec(str) {
        var dec = '';
        dec = parseInt(str, 2);
        if(isNaN(dec)){
            throw new Error('Invalid binary character.')
        }
        return dec;
    }

    // From secrets.js
    function hex2bin(str){
        var bin = '', num;
        for(var i=str.length - 1; i>=0; i--){
            num = parseInt(str[i], 16)
            if(isNaN(num)){
                throw new Error('Invalid hex character.')
            }
            bin = padLeft(num.toString(2), 4) + bin;
        }
        return bin;
    }

    function bin2hex(str){
        var hex = '', num;
        str = padLeft(str, 4);
        for(var i=str.length; i>=4; i-=4){
            num = parseInt(str.slice(i-4, i), 2);
            if(isNaN(num)){
                throw new Error('Invalid binary character.')
            }
            hex = num.toString(16) + hex;
        }
        return hex;
    }
    // End of secrets.js

    function getPrefix(sharesCount, threshold) {
        return bin2hex(padLeft(dec2bin(sharesCount),6)+padLeft(dec2bin(threshold),6));
    }
       
    module.split = function (seed, sharesCount, threshold) {
        // Converts seed to 4-byte aligned string
        var seedHex = mn_decode(seed);

        // Share the seed
        var shares = secrets.share(seedHex, sharesCount, threshold)

        // Add prefix at the beginning of each share
        for (var i = 0; i < shares.length; i += 1) {
            shares[i] = getPrefix(sharesCount, threshold) + shares[i]
        }
        
        // Make Human readable shares
        var sharesHuman = [];
        for (var i = 0; i < shares.length; i += 1) {
            sharesHuman[i] = mn_encode(shares[i]);
            console.log('Human share ' + i + ': ' + sharesHuman[i]);
        }

        return sharesHuman;
    };
  
    module.reconstruct = function (shares) {
        // Convert back human readable shares
        var sharesHex = [];
        for (var i = 0; i < shares.length; i += 1) {
            sharesHex[i] = mn_decode(shares[i]);
        }
        console.log('Shares: ' + sharesHex);

        // Remove prefix
        for (var i = 0; i < sharesHex.length; i += 1) {
            sharesHex[i] = sharesHex[i].substring(3, sharesHex[i].length);
        }

        // Combine shares
        var newSeedHex = secrets.combine(sharesHex.slice(0,2));
        console.log('Hex seed: ' + newSeedHex);

        // Convert back to human readable seed
        return mn_encode(newSeedHex);
    };

    module.getSharesCount = function(share) {
        var hex = mn_decode(share);
        var prefix = hex.substring(0,3);
        var bin = hex2bin(prefix).substring(0,6)
        return bin2dec(bin);
    }

    module.getSharesThreshold = function(share) {
        var hex = mn_decode(share);
        var prefix = hex.substring(0,3);
        var bin = hex2bin(prefix).substring(6,12);
        return bin2dec(bin);
    }

    return module;
})();

//Tests

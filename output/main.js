"use strict";
exports.__esModule = true;
//import  from 'crypto-js/sha256';
var crypto = require("crypto-js");
var Block = /** @class */ (function () {
    function Block(index, timestamp, data, previousHash) {
        if (previousHash === void 0) { previousHash = ''; }
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }
    Block.prototype.calculateHash = function () {
        return crypto.SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    };
    return Block;
}());
var BlockChain = /** @class */ (function () {
    function BlockChain() {
        this.chain = [this.createGenesisBlock()];
    }
    BlockChain.prototype.createGenesisBlock = function () {
        return new Block(0, '01/01/2017', 'Genesis Block', '0');
    };
    BlockChain.prototype.getLatestBlock = function () {
        return this.chain[this.chain.length - 1];
    };
    BlockChain.prototype.addBlock = function (newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    };
    return BlockChain;
}());
var myBlockChain = new BlockChain();
myBlockChain.addBlock(new Block(1, '01/10/2017', { amount: 14 }));
myBlockChain.addBlock(new Block(2, '02/20/2017', { amount: 54 }));
//myBlockChain.addBlock(new Block(2, '03/25/2017', {amount: 75}));
console.log(JSON.stringify(myBlockChain, null, 4));
//# sourceMappingURL=main.js.map
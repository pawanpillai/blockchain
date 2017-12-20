//import  from 'crypto-js/sha256';
import * as crypto from "crypto-js";

class Block{
    index: number;
    timestamp: string;
    data: any;
    previousHash: string;
    hash: string;
  
    constructor(index, timestamp, data, previousHash = ''){
      this.index = index;
      this.timestamp = timestamp;
      this.data = data;
      this.previousHash = previousHash; 
      this.hash = this.calculateHash()
    }
  
    calculateHash(){
        return crypto.SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class BlockChain{
    chain: Block[];
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, '01/01/2017', 'Genesis Block', '0')
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock: Block){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash()
        this.chain.push(newBlock);
    }
}

let myBlockChain = new BlockChain();
myBlockChain.addBlock(new Block(1, '01/10/2017', {amount: 14}));
myBlockChain.addBlock(new Block(2, '02/20/2017', {amount: 54}));
//myBlockChain.addBlock(new Block(2, '03/25/2017', {amount: 75}));

console.log(JSON.stringify(myBlockChain, null, 4));

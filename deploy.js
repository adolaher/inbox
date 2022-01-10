require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const {interface, bytecode} = require('./compile')

const provider = new HDWalletProvider(
  process.env.MNEMONIC_PHRASE,
  'https://rinkeby.infura.io/v3/ac644ddf4c1145c79e6c4fd564e5a60e'
);
const web3 = new Web3(provider);

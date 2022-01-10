const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {interface, bytecode } = require('../compile')

let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  // initialize inbox contract, parse interface json for bytecode + arguments
  inbox = await new web3.eth.Contract(JSON.parse(interface))
  //.deploy to create contract with initial args
  .deploy({ data: bytecode, arguments: ['Hi there!']})
  //.send to deploy contract and send transaction
  .send({ from: accounts[0], gas: '1000000'});
});

describe('Inbox', () => {
  it('deploy contract', () => {
    // confirm contract creation by checking for address
  assert.ok(inbox.options.address);
  });

  it('shows default message',async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi there!');
  });

  it('message can change',async () => {
    await inbox.methods.setMessage('Message is changed').send({from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message,'Message is changed');
  });
});

const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./compile');

const provider = new HDWalletProvider(
  'visa broccoli fragile broken action stereo tortoise own utility tube pumpkin about',
  // remember to change this to your own phrase!
  'https://goerli.infura.io/v3/20352ac1aa574fbba026b336aa92863f'
  // remember to change this to your own endpoint!
);

const web3 = new Web3(provider);

const deploy = async () => {
  try{
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[1]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ gas: '1000000', from: accounts[1] });

  console.log(JSON.stringify(abi));
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
}catch(error){
  console.log(error);
}
};
deploy();
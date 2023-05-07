const ethers = require('ethers');
const prompt = require('prompt-sync')({sigint: true});
const secret = require('./secret')
//npm install ethers
//node snipe.js

// START OF MODIFICATION
const privateKey = secret[]//enter your Privatekey
const myAddress = secret[]//enter your Adress

const token = "0x04068da6c83afcfa0e13ba15a6696662335d5b75" // Token to swap 
const amountToSwap = '0.015' // En ETh
const gwei = '10'    //enter gwei 
const slippage = 0    // 0 = NOT IMPORTANT
// END OF MODIFICATION



const addresses = {
Wrappedeth: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",   // Must have Wrapped eth
router: "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F", // Router Sushiswap
target:  myAddress                                    
}
const WETHAmount = ethers.utils.parseEther(amountToSwap).toHexString();
const gasPrice = ethers.utils.parseUnits(gwei, 'gwei');
const gas = {
  gasPrice: gasPrice,
  gasLimit: 250000
}

const WETHprovider = new ethers.providers.JsonRpcProvider("https://arbitrum.public-rpc.com");
const account = new ethers.Wallet(privateKey, WETHprovider); 
const router = new ethers.Contract( 
  addresses.router,
  [
    'function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint256[] memory amounts)'
  ],
  account
);
console.log
  
  const snipe = async (token) => {
 
  const tx = await router.swapExactETHForTokens(
    slippage, // Degen ape don't give a fuxk about slippage
    [addresses.WETH, token],
    addresses.target,
    Math.floor(Date.now() / 1000) + 60 * 20, // 10 minutes from now
    {
        ...gas,
        value: WETHAmount
    }
  );
  console.log(`Swapping FTM for tokens...`);
  const receipt = await tx.wait();
  console.log(`Transaction hash: ${receipt.transactionHash}`);
}

//const token = prompt('Input token address:');

(async () => {
  await snipe(token);
})();

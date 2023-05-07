const ethers = require('ethers');
const prompt = require('prompt-sync')({sigint: true});
const secret = require('./secret')
//npm install ethers
//node snipe.js

// CHOSES A CHANGER
const privateKey = secret["private_key"]
const myAddress = secret["public_key"]

const token = "0x04068da6c83afcfa0e13ba15a6696662335d5b75" // Token to swap (ADDRESSE DU SHITCOIN MWAHAHA)
const amountToSwap = '0.1' // En FTM
const gwei = '550'     
const slippage = 0    // 0 = on s'en fout du slippage juste donne moi mes shitcoins
// FIN CHOSES A CHANGER



const addresses = {
FTM: "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83",   // Must have FTM
router: "0xF491e7B69E4244ad4002BC14e878a34207E38c29", // Router SpookySwap
target:  myAddress                                    
}
const FTMAmount = ethers.utils.parseEther(amountToSwap).toHexString();
const gasPrice = ethers.utils.parseUnits(gwei, 'gwei');
const gas = {
  gasPrice: gasPrice,
  gasLimit: 250000
}

const FTMprovider = new ethers.providers.JsonRpcProvider("https://rpc.ftm.tools/");
const account = new ethers.Wallet(privateKey, FTMprovider); 
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
    [addresses.FTM, token],
    addresses.target,
    Math.floor(Date.now() / 1000) + 60 * 20, // 10 minutes from now
    {
        ...gas,
        value: FTMAmount
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
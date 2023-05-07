const ethers = require('ethers');
const prompt = require('prompt-sync')({sigint: true});
const secret = require('./secret')
//npm install ethers
//node snipe.js

// CHOSES A CHANGER
const privateKey = secret["private_key"]
const myAddress = secret["public_key"]

const token = "0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664" // Token to swap (ADDRESSE DU SHITCOIN MWAHAHA)
const amountToSwap = '0.01' // En avax
const gwei = '75'     
const slippage = 0    // 0 = on s'en fout du slippage juste donne moi mes shitcoins
// FIN CHOSES A CHANGER



const addresses = {
AVAX: "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7",   // Must have AVAX
router: "0x60aE616a2155Ee3d9A68541Ba4544862310933d4", // Router Traderjoe
target:  myAddress                                    
}
const AVAXAmount = ethers.utils.parseEther(amountToSwap).toHexString();
const gasPrice = ethers.utils.parseUnits(gwei, 'gwei');
const gas = {
  gasPrice: gasPrice,
  gasLimit: 150000
}

const AVAXprovider = new ethers.providers.JsonRpcProvider("https://api.avax.network/ext/bc/C/rpc");
const account = new ethers.Wallet(privateKey, AVAXprovider); 
const router = new ethers.Contract( 
  addresses.router,
  [
    'function swapExactAVAXForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint256[] memory amounts)'
  ],
  account
);
console.log
  
  const snipe = async (token) => {
 
  const tx = await router.swapExactAVAXForTokens(
    slippage, // Degen ape don't give a fuxk about slippage
    [addresses.AVAX, token],
    addresses.target,
    Math.floor(Date.now() / 1000) + 60 * 20, // 10 minutes from now
    {
        ...gas,
        value: AVAXAmount
    }
  );
  console.log(`Swapping AVAX for tokens...`);
  const receipt = await tx.wait();
  console.log(`Transaction hash: ${receipt.transactionHash}`);
}

//const token = prompt('Input token address:');

(async () => {
  await snipe(token);
})();
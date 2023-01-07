import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import UAuth from "@uauth/js"


const CoinbaseWallet = new WalletLinkConnector({
  url: `https://goerli.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`,
  appName: "Change",
  supportedChainIds: [5],
 });
 
 const Injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
 });

 const Uauth = new UAuth({
  clientID: process.env.REACT_APP_CLIENT_ID,
  redirectUri: process.env.REACT_APP_REDIRECT_URI,
  scope:"openid wallet email profile"
})

export  {CoinbaseWallet, Injected, Uauth};
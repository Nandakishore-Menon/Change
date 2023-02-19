import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import WalletConnectProvider from "@maticnetwork/walletconnect-provider"
import UAuth from "@uauth/js"


const CoinbaseWallet = new WalletLinkConnector({
  url: `https://sparkling-necessary-feather.matic-testnet.discover.quiknode.pro/262dc78b6fd8cd788e6dd860e2aa30602272238b/`,
  appName: "Change",
  supportedChainIds: [80001],
 });
 
 const Injected = new InjectedConnector({
  supportedChainIds: [80001]
 });

 const Uauth = new UAuth({
  clientID: process.env.REACT_APP_CLIENT_ID,
  redirectUri: process.env.REACT_APP_REDIRECT_URI,
  scope:"openid wallet email profile"
})

export  {CoinbaseWallet, Injected, Uauth};
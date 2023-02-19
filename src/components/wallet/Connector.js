import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import WalletConnectProvider from "@maticnetwork/walletconnect-provider"
import UAuth from "@uauth/js"


const CoinbaseWallet = new WalletLinkConnector({
  url: `${process.env.REACT_APP_POLYGON_RPC}`,
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
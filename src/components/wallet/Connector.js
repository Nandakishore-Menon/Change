import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { InjectedConnector } from "@web3-react/injected-connector";


const CoinbaseWallet = new WalletLinkConnector({
  // url: `https://goerli.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`,
  url: `https://goerli.infura.io/v3/d9d8e0ab2d754e81acc0d6076e4878be`,
  appName: "Change",
  supportedChainIds: [1, 3, 4, 5, 42],
 });
 
 const Injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
 });

export  {CoinbaseWallet, Injected};
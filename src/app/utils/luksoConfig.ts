import { Chain } from 'wagmi';

export const luksoTestnet = {
  id: 4201,
  name: 'Lukso Testnet',
  network: 'lukso-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'LYX',
    symbol: 'LYXt',
  },
  rpcUrls: {
    public: { http: ['https://rpc.testnet.lukso.network'] },
    default: { http: ['https://rpc.testnet.lukso.network'] },
  },
  blockExplorers: {
    etherscan: { name: 'Explorer', url: 'https://explorer.execution.testnet.lukso.network' },
    default: { name: 'Explorer', url: 'https://explorer.execution.testnet.lukso.network' },
  },
} as const satisfies Chain
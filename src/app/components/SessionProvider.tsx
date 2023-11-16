'use client'
import { w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from "wagmi/providers/public";

import { mainnet, goerli, sepolia } from 'wagmi/chains';

const chains = [mainnet, goerli, sepolia]

/// get projectId from the getStaticProps function

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ? process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID : '';

const { publicClient } = configureChains(chains,[publicProvider()])


const wagmiConfig = createConfig({
    autoConnect: true,
    publicClient
})

export default function SessionProvider({
    children,
  }: {
    children: React.ReactNode
  }) { 
    return (
      <>
        <WagmiConfig config={wagmiConfig}>
            {children}
        </WagmiConfig>
      </>
    )
}

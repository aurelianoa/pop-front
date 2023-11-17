'use client'
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { luksoConector } from '@/app/utils/luksoConnector';
import { luksoTestnet } from '@/app/utils/luksoConfig';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

const chains = [luksoTestnet]

const { publicClient } = configureChains(chains,[
  jsonRpcProvider({
    rpc: (luksoTestnet) => ({
      http: luksoTestnet.rpcUrls.public.http[0],
    }),
  })
])

const wagmiConfig = createConfig({
    autoConnect: true,
    publicClient,
    connectors: [luksoConector()],
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

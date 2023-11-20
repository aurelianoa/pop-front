'use client'
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { luksoConector } from '@/app/utils/luksoConnector';
import { luksoTestnet } from '@/app/utils/luksoConfig';
import { publicProvider } from 'wagmi/providers/public'



const chains = [luksoTestnet]

const { publicClient } = configureChains(chains,[
 publicProvider()
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

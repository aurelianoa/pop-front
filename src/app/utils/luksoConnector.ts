declare var window: any
import { InjectedConnector } from 'wagmi/connectors/injected';
import { luksoTestnet } from './luksoConfig';
  
export function luksoConector() {
  const chains = [luksoTestnet]
  
  const connector = new InjectedConnector({
    chains: chains,
    options: {
        name: 'My Injected UP',
        getProvider: () =>
          typeof window !== 'undefined' ? window.lukso : undefined,
      },
  })
  return connector;
}
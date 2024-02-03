'use client';

import { WagmiProvider, createConfig, http } from 'wagmi';
import { blastSepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [blastSepolia],
    transports: {
      [blastSepolia.id]: http(blastSepolia.rpcUrls.default.http[0]),
    },

    // Required API Keys
    walletConnectProjectId: '',

    // Required App Info
    appName: 'Your App Name',

    // Optional App Info
    appDescription: 'MineBlast',
    appUrl: 'https://mineblast.co', // your app's url
    appIcon: 'https://mineblast.co/logo.png', // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: any) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider options={{ enforceSupportedChains: false }}>
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

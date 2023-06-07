"use client";

import "./globals.css";

import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { WalletConnectLegacyConnector } from "wagmi/connectors/walletConnectLegacy";
import { mainnet, bsc, bscTestnet, polygon, cronos } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { Component } from "react";
import { AppProps } from "next/app";
import Link from "next/link";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, bsc, bscTestnet, polygon, cronos],
  [publicProvider()]
);
const config = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: {
        projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "",
      },
    }),
    new WalletConnectLegacyConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),

    new InjectedConnector({
      chains,
      options: {
        name: (detectedName) =>
          `Injected (${
            typeof detectedName === "string"
              ? detectedName
              : detectedName.join(", ")
          })`,
        shimDisconnect: true,
      },
    }),
  ],

  publicClient,
  webSocketPublicClient,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WagmiConfig config={config}>
          <div className="flex gap-20 m-11">
            <Link href="/demo">demo</Link>
            <Link href="/">home</Link>
          </div>
          <div className="m-11">{children}</div>
        </WagmiConfig>
      </body>
    </html>
  );
}

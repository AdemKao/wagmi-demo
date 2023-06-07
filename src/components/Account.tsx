"use client";
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";

import { SignMessage } from "./SignMessage";

export const Account = () => {
  const account = useAccount({
    onConnect: (data) => console.log("connected", data),
    onDisconnect: () => console.log("disconnected"),
  });
  const { data: ensName } = useEnsName({
    address: account?.address,
    chainId: 1,
  });
  const { data: ensAvatar } = useEnsAvatar({
    name: ensName,
    chainId: 1,
  });
  const disconnect = useDisconnect();

  return (
    <div className="flex flex-col gap-5">
      <div className="">
        {ensName ?? account?.address}
        {ensName ? ` (${account?.address})` : null}
      </div>

      {ensAvatar && (
        <img
          alt="ENS avatar"
          src={ensAvatar}
          style={{ height: 40, width: 40 }}
        />
      )}

      <div className="flex flex-col gap-5">
        {account?.address && (
          <button
            type="button"
            onClick={() => disconnect.disconnect()}
            className=" border-gray-200 border p-2 rounded-xl"
          >
            Disconnect
          </button>
        )}
        {account?.connector?.name && (
          <span>Connected to {account.connector.name}</span>
        )}
      </div>

      {true && (
        <>
          {true && <></>}

          {/* <h4>Read Contract</h4>
          <ReadContract />

          <h4>Read Contracts</h4>
          <ReadContracts />

          <h4>Read Contracts Infinite</h4>
          <ReadContractsInfinite />

          <h4>Watch Pending Transactions</h4>
          <WatchPendingTransactions />

          <h4>Write Contract</h4>
          <WriteContract />

          <h4>Write Contract Prepared</h4>
          <WriteContractPrepared />

          <h4>Contract Events</h4>
          <WatchContractEvents /> */}

          {true && (
            <>
              <h4>Sign Message</h4>
              <SignMessage />

              {/* <h4>Sign Typed Data</h4>
              <SignTypedData /> */}

              {/* <h4>Token</h4>
              <Token /> */}
            </>
          )}
        </>
      )}
    </div>
  );
};

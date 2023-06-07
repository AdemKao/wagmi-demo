"use client";
import * as React from "react";
import { recoverMessageAddress } from "viem";
import type { Address } from "wagmi";
import { useSignMessage } from "wagmi";

export const SignMessage = () => {
  const [recoveredAddress, setRecoveredAddress] = React.useState<Address>();
  const {
    data: signature,
    variables,
    error,
    isLoading,
    signMessage,
  } = useSignMessage();

  React.useEffect(() => {
    (async () => {
      if (variables?.message && signature) {
        const recoveredAddress = await recoverMessageAddress({
          message: variables?.message,
          signature,
        });
        setRecoveredAddress(recoveredAddress);
      }
    })();
  }, [signature, variables?.message]);

  return (
    <div className="flex flex-col ">
      <h2 className="m-5 text-3xl">Sign</h2>

      <form
        onSubmit={(event) => {
          console.log("event", event);
          event.preventDefault();
          const element = event.target as HTMLFormElement;
          const formData = new FormData(element);
          const message = formData.get("message") as string;
          console.log("message", message);
          signMessage({ message });
        }}
        className="flex flex-col gap-4"
      >
        <input
          name="message"
          type="text"
          required
          className="bg-black border-gray-200 border p-2"
        />
        <button
          type="submit"
          disabled={isLoading}
          className=" border-gray-200 border p-2 rounded-xl"
        >
          {isLoading ? "Check Wallet" : "Sign Message"}
        </button>
      </form>

      {signature && (
        <div className="flex flex-col gap-10 break-words mt-4">
          <div className="max-w-full ">signature {signature}</div>
          <div>recovered address {recoveredAddress}</div>
        </div>
      )}

      <div>{error && (error?.message ?? "Failed to sign message")}</div>
    </div>
  );
};

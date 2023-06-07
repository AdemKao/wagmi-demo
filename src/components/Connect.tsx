"use client";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useAccount, useConnect } from "wagmi";

export const Connect = () => {
  const isMounted = useIsMounted();
  const { connector, isReconnecting } = useAccount();
  const { connect, connectors, isLoading, error, pendingConnector } =
    useConnect();

  return (
    <div>
      <div className="flex flex-col items-center gap-4 ">
        {connectors.map((x) => (
          <button
            disabled={!x.ready || isReconnecting || connector?.id === x.id}
            type="button"
            key={x.name}
            onClick={() => connect({ connector: x })}
            className=" border-gray-200 border p-2 rounded-xl"
          >
            {x.id === "injected" ? (isMounted ? x.name : x.id) : x.name}
            {isMounted && !x.ready && " (unsupported)"}
            {isLoading && x.id === pendingConnector?.id && "…"}
          </button>
        ))}
      </div>

      <div>{error?.message}</div>
    </div>
  );
};

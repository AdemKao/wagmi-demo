import { Account } from "@/components/Account";
import { Connect } from "@/components/Connect";
import { SignMessage } from "@/components/SignMessage";
import React from "react";

function Demo() {
  return (
    <div className="flex flex-col gap-10">
      <Connect />
      <Account />
      {/* <SignMessage /> */}
    </div>
  );
}

export default Demo;

"use client";

import { useState } from "react";
import { getRpcServerUrl } from "@/utils/env";
import jsonRpc from "@/utils/jsonRpc";

const RPC_SERVER_URL = getRpcServerUrl();

export default function Dashboard() {
  const [resolution, setResolution] = useState("");
  const [rpc, setRpc] = useState<Awaited<ReturnType<typeof jsonRpc>> | null>(null);

  const connectRpc = async () => {
    try {
      console.log(rpc);

      if (rpc) {
        rpc.close();
        setRpc(null);
        console.log("RPC connection closed.");
        return;
      }

      const response = await jsonRpc({
        onnotification: (msg) => console.log("Received notification:", JSON.stringify(msg)),
      });

      if (!response) {
        console.error("Failed to establish RPC connection.");
        setRpc(null);
        return;
      }

      console.log("RPC connection established:", response);
      setRpc(response);
    } catch (err) {
      console.log("err :>> ", err);
    }
  };

  const rpc_sum = (a: number, b: number) => {
    try {
      if (!rpc) return;
      rpc.call("sum", [a, b]);
    } catch (err) {
      console.log("err :>> ", err);
    }
  };

  const rpc_mul = (a: number, b: number) => {
    try {
      if (!rpc) return;
      rpc.call("mul", [a, b]);
    } catch (err) {
      console.log("err :>> ", err);
    }
  };

  const rpc_resolution = (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (resolution) {
        const [width, height] = resolution.split("x");
        if (!rpc) return;
        rpc.call("resolution", [height, width]);
      }
    } catch (err) {
      console.log("err :>> ", err);
    }
  };

  return (
    <>
      <div className="mt-5">
        <div className="p-1 bg-red-500 rounded my-5"></div>

        <div>
          <h1 className="text-lg font-bold mb-2">JSON-RPC over Websocket demo</h1>
          <input defaultValue={RPC_SERVER_URL} className="w-80 p-3 rounded mr-3" readOnly />
          <button id="connect" className="p-2 ring-1 rounded" onClick={connectRpc}>
            connect
          </button>
        </div>

        <div className="p-1 bg-red-500 rounded my-5"></div>

        <div>
          <button className="bg-green-300 p-2 me-3 rounded" onClick={() => rpc_sum(4, 2)}>
            Add 4 & 2
          </button>
          <button className="bg-green-300 p-2 me-3 rounded" onClick={() => rpc_mul(3, 5)}>
            Mul 3 & 5
          </button>
        </div>

        <div className="p-1 bg-red-500 rounded my-5"></div>

        <form onSubmit={rpc_resolution}>
          <label htmlFor="resolution">Resolution:</label>
          <select
            id="resolution"
            value={resolution}
            className="mx-5 p-2 rounded"
            onChange={(e) => setResolution(e.target.value)}
          >
            <option value="" disabled>
              Select a resolution
            </option>
            <option value="1280x720">1280x720</option>
            <option value="640x480">640x480</option>
          </select>

          <button
            type="submit"
            className="ring-1 px-3 py-1 rounded disabled:cursor-not-allowed disabled:hover:bg-transparent hover:bg-blue-500 disabled:hover:text-black hover:text-white"
            disabled={!resolution}
          >
            Submit
          </button>
        </form>

        <div className="p-1 bg-red-500 rounded my-5"></div>
      </div>
    </>
  );
}

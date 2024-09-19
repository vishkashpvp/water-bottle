// JSON-RPC over Websocket implementation

import { getJsonRpcTimeout, getRpcServerUrl } from "./env";

const RPC_SERVER_URL = getRpcServerUrl();
const JSONRPC_TIMEOUT_MS = getJsonRpcTimeout();

type JsonRpcOptions = {
  onopen?: () => void;
  onclose?: () => void;
  onnotification: (data: any) => void;
};

export default function jsonRpc({ onopen, onclose, onnotification }: JsonRpcOptions) {
  let rpcid = 0;
  const pending: { [key: number]: (response: any) => void } = {};

  const ws = new WebSocket(RPC_SERVER_URL);

  return new Promise<{
    close: () => void;
    call: (method: string, params: any) => Promise<unknown>;
  }>((resolve, reject) => {
    ws.onopen = () => {
      console.log("WebSocket connection established.");
      if (onopen) onopen();

      resolve({
        close: () => ws.close(),
        call: (method: string, params: any) => {
          const id = rpcid++;
          const request = { id, method, params };
          ws.send(JSON.stringify(request));
          console.log("Sent:", request);

          return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
              console.log("Timing out frame:", JSON.stringify(request));
              delete pending[id];
              reject(new Error("Request timed out."));
            }, Number(JSONRPC_TIMEOUT_MS));

            pending[id] = (response) => {
              clearTimeout(timeoutId);
              resolve(response);
            };
          });
        },
      });
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      reject(new Error("Failed to connect to WebSocket server."));
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
      if (onclose) onclose();
      reject(new Error("WebSocket connection closed."));
    };

    ws.onmessage = (ev) => {
      const frame = JSON.parse(ev.data);
      console.log("Frame received:", frame);
      console.log("Pending requests:", pending);

      if (frame.id !== undefined) {
        const resolve = pending[frame.id];
        if (resolve) {
          resolve(frame);
          delete pending[frame.id];
        }
      } else {
        if (onnotification) onnotification(frame);
      }
    };
  });
}

export const getRpcServerUrl = (): string => {
  const RPC_SERVER_URL = process.env.NEXT_PUBLIC_RPC_SERVER_URL;
  if (!RPC_SERVER_URL) {
    throw new Error("'NEXT_PUBLIC_RPC_SERVER_URL' is not defined in environment variables");
  }
  return RPC_SERVER_URL;
};

export const getJsonRpcTimeout = (): number => {
  const JSONRPC_TIMEOUT_MS = process.env.NEXT_PUBLIC_JSONRPC_TIMEOUT_MS;
  if (!JSONRPC_TIMEOUT_MS) {
    throw new Error("'NEXT_PUBLIC_JSONRPC_TIMEOUT_MS' is not defined in environment variables");
  }
  const timeout = parseInt(JSONRPC_TIMEOUT_MS, 10);
  if (isNaN(timeout)) throw new Error("'NEXT_PUBLIC_JSONRPC_TIMEOUT_MS' should be a number.");
  return timeout;
};

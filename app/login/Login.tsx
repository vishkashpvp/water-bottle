"use client";

import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const onSubmit = (e: any) => {
    console.log("e :>> ", e);

    router.push("/");
  };

  return (
    <div className="min-h-screen p-3">
      <h1 className="text-3xl">login form goes here</h1>

      <div className="flex flex-col mt-5">
        <input
          className="w-80 p-3 ring-1 ring-gray-500 mb-5 rounded"
          type="text"
          name="username"
          id="username"
        />
        <input
          className="w-80 p-3 ring-1 ring-gray-500 mb-5 rounded"
          type="password"
          name="password"
          id="password"
        />

        <button
          className="w-80 ring-1 ring-blue-400 hover:bg-blue-400 hover:text-white p-3 rounded"
          type="submit"
          onClick={onSubmit}
        >
          submit
        </button>
      </div>
    </div>
  );
}

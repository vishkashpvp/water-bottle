"use client";

import { useState } from "react";

export default function Dashboard() {
  const [resolution, setResolution] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (resolution) {
      const [width, height] = resolution.split("x");
      console.log(`Width: ${width}, Height: ${height}`);
    }
  };

  return (
    <>
      <div className="mt-5">
        <form onSubmit={handleSubmit}>
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
            <option value="1920x1080">1920x1080</option>
            <option value="1366x768">1366x768</option>
            <option value="1280x720">1280x720</option>
            <option value="1024x768">1024x768</option>
          </select>

          <button
            type="submit"
            className="ring-1 px-3 py-1 rounded disabled:cursor-not-allowed disabled:hover:bg-transparent hover:bg-blue-500 disabled:hover:text-black hover:text-white"
            disabled={!resolution}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

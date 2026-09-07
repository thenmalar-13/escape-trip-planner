import React from "react";

export default function SearchForm() {
  return (
    <form>
      <label>
        Origin:
        <input type="text" aria-label="origin" />
      </label>
      <label>
        Budget:
        <input type="number" aria-label="budget" />
      </label>
      <button type="submit">Plan Trip</button>
    </form>
  );
}
import React from "react";
import css from "./App.module.css";
import Table from "../Table/Table";
export default function App() {
  return (
    <div className={css.app}>
      <header className={css.header}>
        <h1>Placement Diary</h1>
      </header>
      <Table />
    </div>
  );
}

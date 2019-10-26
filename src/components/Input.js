import React, { useState } from "react";
import Data from "./Data";
import Card from "./Card";

const styleInput = {
  display: "flex",
  justifyContent: "center"
};
const styleListCard = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap"
};

let titles = "";
let contents = "";
let addData = [];

const Input = () => {
  const [List, setList] = useState(Data);
  const handleChangeTitle = e => {
    titles = e.target.value;
  };
  const handleChangeContent = e => {
    contents = e.target.value;
  };

  const handleSubmit = e => {
    e.preventDefault();
    addData = [{ judul: titles, isi: contents }];
    setList(addData.concat(List));
  };

  const listCard = List.map(item => (
    <Card key={Math.random()} title={item.judul} content={item.isi} />
  ));

  return (
    <div>
      <div style={styleInput}>
        <form onSubmit={handleSubmit}>
          <input placeholder="judul" onChange={handleChangeTitle} />
          <input placeholder="isi" onChange={handleChangeContent} />
          <button>Add</button>
        </form>
      </div>
      <div style={styleListCard}>{listCard}</div>
    </div>
  );
};

export default Input;

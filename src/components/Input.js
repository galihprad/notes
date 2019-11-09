import React, { useState, useEffect } from "react";
// import Data from "./Data";
import Card from "./Card";
import firebase from "../config/fbConfig";

const styleInput = {
  display: "flex",
  justifyContent: "center"
};
const styleListCard = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap"
};

const Input = () => {
  let titles = "";
  let contents = "";
  let addData = [];
  let dbArray = [];
  const [List, setList] = useState(dbArray);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let dbArray = List;
    async function result() {
      const getData = await firebase
        .firestore()
        .collection("notes1")
        .get()
        .then(snapsho => {
          snapsho.docs.forEach(item => {
            dbArray.push(item.data());
          });
        });
      setIsLoading(false);
      setList(dbArray);
    }
    result();
  }, [List]);

  const handleChangeTitle = e => {
    titles = e.target.value;
  };
  const handleChangeContent = e => {
    contents = e.target.value;
  };

  const handleSubmit = e => {
    e.preventDefault();
    addData = [{ judul: titles, isi: contents }];
    console.log("DAT", addData, List);
    setList(addData.concat(List));
  };

  const ListCard = isLoading
    ? "tunggu dilit..."
    : List.map(item => (
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

      <div style={styleListCard}>{ListCard}</div>
    </div>
  );
};

export default Input;

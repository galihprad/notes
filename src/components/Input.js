import React, { useState, useEffect } from "react";
import Card from "./Card";
import firebase from "../config/fbConfig";
const uuidv4 = require("uuid/v4");

const styleInput = {
  display: "flex",
  justifyContent: "center"
};
const styleListCard = {
  justifyContent: "center",
  flexWrap: "wrap"
};

const db = firebase.firestore().collection("notes1");
let titles = "";
let contents = "";

const Input = () => {

  const [List, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refetch, setRefetch] = useState(true);

  useEffect(() => {
    console.log("FETCH");
    const ListDB = [];
    async function result() {
      await db.get().then(snapshot => {
        snapshot.docs.forEach(item => {
          ListDB.push({
            title: item.data().title,
            content: item.data().content,
            id: item.id
          });
        });
      });
      console.log("listdb", ListDB);
      setIsLoading(false);
      setList(ListDB);
    }
    result();
  }, [refetch]);

  const RefetchData = () => setRefetch(!refetch);

  const handleChangeTitle = e => {
    titles = e.target.value;
  };

  const handleChangeContent = e => {
    contents = e.target.value;
  };

  const handleAddData = e => {
    e.preventDefault();
    const ids = uuidv4();
    let addData = [{ id: ids, title: titles, content: contents }];
    setList(addData.concat(List));
    db.doc(ids).set({ title: titles, content: contents });
  };


  const handleDelete = id => {
    console.log("delete");
    let newList = List.filter(item => item.id !== id);
    setList(newList);
    db.doc(id).delete();
  };


  const ListCard = isLoading
    ? "tunggu dilit..."
    : List.map(item => (
        <>
          <Card
            db={db}
            handleDelete={handleDelete}
            RefetchData={RefetchData}
            id={item.id}
            key={item.id}
            title={item.title}
            content={item.content}
          />
        </>
      ));

  console.log("RENDER", List);

  return (
    <div>
      <div style={styleInput}>
        <form onSubmit={handleAddData}>
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

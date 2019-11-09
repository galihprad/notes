import React, { useState, useEffect } from "react";
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

const db = firebase.firestore().collection("notes1");

const Input = () => {
  let titles = "";
  let contents = "";
  let addData = [];

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
            judul: item.data().judul,
            isi: item.data().isi,
            id: item.id
          });
        });
      });
      setIsLoading(false);
      setList(ListDB);
      console.log("lis", List);
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

  const handleSubmit = e => {
    e.preventDefault();
    addData = [{ judul: titles, isi: contents }];
    setList(addData.concat(List));
    db.add({ judul: titles, isi: contents });
    RefetchData();
  };

  const handleDelete = e => {
    db.doc(e.target.id).delete();
    RefetchData();
  };

  console.log("lis", List);

  const ListCard = isLoading
    ? "tunggu dilit..."
    : List.map(item => (
        <>
          <div onClick={handleDelete} id={item.id}>
            X
          </div>
          <Card key={item.id} title={item.judul} content={item.isi} />
        </>
      ));

  console.log("RENDER");

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

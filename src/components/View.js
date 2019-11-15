import React, { useState, useEffect } from "react";
import Card from "./Card";
import Input from "./Input";
import firebase from "../config/fbConfig";

const styleInput = {
  display: "flex",
  justifyContent: "center"
};
const styleListCard = {
  justifyContent: "center",
  flexWrap: "wrap"
};

const db = firebase.firestore().collection("notes1");

const View = () => {
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

  const ListCard = isLoading
    ? "tunggu dilit..."
    : List.map(item => (
        <>
          <Card
            db={db}
            id={item.id}
            key={item.id}
            List={List}
            setList={setList}
            title={item.title}
            content={item.content}
          />
        </>
      ));

  console.log("RENDER", List);

  return (
    <div>
      <div style={styleInput}>
        <Input List={List} db={db} setList={setList} />
      </div>
      <div style={styleListCard}>{ListCard}</div>
    </div>
  );
};

export default View;

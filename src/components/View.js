import React, { useState, useEffect } from "react";
import Card from "./Card";
import Input from "./Input";
import firebase from "../config/fbConfig";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const styleView = css`
  width: 75%;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const styleInput = css`
  margin-top: 100px;
`;

const styleListCard = css`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
  flex-wrap: wrap;
`;


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
    <div css={styleView}>
      <div css={styleInput}>
        <Input List={List} db={db} setList={setList} />
      </div>
      <div css={styleListCard}>{ListCard}</div>
    </div>
  );
};

export default View;

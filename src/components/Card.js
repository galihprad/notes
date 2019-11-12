import React, { useState } from "react";
import firebase from "../config/fbConfig";
import EditCard from "./EditCard";

const styleCard = {
  height: "100px",
  width: "100px",
  backgroundColor: "yellow",
  margin: "50px",
  padding: "10px"
};

const styleCardTitle = {
  margin: "0 0 10px 0",
  fontSize: "14px"
};

const styleCardContent = {
  fontSize: "12px"
};

const db = firebase.firestore().collection("notes1");

const Card = props => {
  const [refetch, setRefetch] = useState(true);
  const { title, content, id, list, RefetchData } = props;
  const [titleVal, setTitleVal] = useState(title);
  const [contentVal, setContentVal] = useState(content);
  const [isEdit, setIsEdit] = useState(false);
  const [listNew, setListNew] = useState(list);
  let titles = "";
  let contents = "";
  let addData = [];
  const handleChangeTitle = e => {
    setTitleVal(e.target.value);
    titles = e.target.value;
  };
  const handleChangeContent = e => {
    setContentVal(e.target.value);
    contents = e.target.value;
  };

  const handleSubmit = e => {
    // e.preventDefault();
    // addData = [{ judul: titles, isi: contents }];
    // setList(addData.concat(List));
    // db.add({ judul: titles, isi: contents });
    // RefetchData();
  };
  // const RefetchData = () => setRefetch(!refetch);
  const handleDelete = e => {
    console.log(id);
    db.doc(id).delete();
    RefetchData();
  };

  const handleEdit = e => {
    setIsEdit(!isEdit);
    setListNew([]);
    RefetchData();
    console.log("EDIT", listNew, list);
  };

  const renderCard = () => {
    return isEdit ? (
      <div style={styleCard}>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="judul"
            onChange={handleChangeTitle}
            value={titleVal}
          />
          <input
            placeholder="isi"
            onChange={handleChangeContent}
            value={contentVal}
          />
          <button>Save</button>
        </form>
      </div>
    ) : (
      <div style={styleCard}>
        <div style={styleCardTitle}>{title}</div>
        <div style={styleCardContent}>{content}</div>
      </div>
    );
  };

  return (
    <div>
      <button onClick={handleDelete} id={id}>
        X
      </button>
      <button onClick={handleEdit} id={id}>
        E
      </button>
      {renderCard()}
    </div>
  );
};

export default Card;

import React, { useState } from "react";
import firebase from "../config/fbConfig";

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
let titles = "";
let contents = "";

const Card = props => {
  const { title, content, id, RefetchData } = props;
  const [titleVal, setTitleVal] = useState(title);
  const [contentVal, setContentVal] = useState(content);
  const [isEdit, setIsEdit] = useState(false);

  const handleChangeTitle = e => {
    setTitleVal(e.target.value);
    titles = e.target.value;
  };
  const handleChangeContent = e => {
    setContentVal(e.target.value);
    contents = e.target.value;
  };

  const handleSubmit = e => {
    e.preventDefault();
    db.doc(id).update({
      judul: titles,
      isi: contents
    });
    RefetchData();
    setIsEdit(false);
  };

  const handleDelete = e => {
    db.doc(id).delete();
    RefetchData();
  };

  const handleEdit = e => {
    setIsEdit(true);
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

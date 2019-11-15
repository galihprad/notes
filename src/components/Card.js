import React, { useState } from "react";

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

const Card = props => {
  const { title, content, id, setList, List, db } = props;
  const [titleVal, setTitleVal] = useState(title);
  const [contentVal, setContentVal] = useState(content);
  const [isEdit, setIsEdit] = useState(false);

  const handleUpdate = e => {
    e.preventDefault();

    // update locally
    let editedList = List.find(item => item.id === id);
    editedList.title = titleVal;
    editedList.content = contentVal;
    setIsEdit(false);

    // update on DB
    db.doc(id).update({
      title: titleVal,
      content: contentVal
    });
  };

  const handleDelete = id => {
    // delete locally
    let newList = List.filter(item => item.id !== id);
    setList(newList);

    // delete on DB
    db.doc(id).delete();
  };

  const renderCard = () => {
    return isEdit ? (
      <div style={styleCard}>
        <form onSubmit={handleUpdate}>
          <input
            placeholder="judul"
            onChange={e => setTitleVal(e.target.value)}
            value={titleVal}
          />
          <input
            placeholder="isi"
            onChange={e => setContentVal(e.target.value)}
            value={contentVal}
          />
          <button>Save</button>
        </form>
      </div>
    ) : (
      <div style={styleCard}>
        <div style={styleCardTitle}>{titleVal}</div>
        <div style={styleCardContent}>{contentVal}</div>
      </div>
    );
  };
  console.log("RENDER-CARD");
  return (
    <div>
      <button onClick={() => handleDelete(id)}>X</button>
      <button onClick={() => setIsEdit(true)}>E</button>
      {renderCard()}
    </div>
  );
};

export default Card;

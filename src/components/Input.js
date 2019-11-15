import React, { useState } from "react";
const uuidv4 = require("uuid/v4");

const Input = props => {
  const { List, setList, db } = props;
  const [titleVals, setTitleVals] = useState("");
  const [contentVals, setContentVals] = useState("");

  const handleAddData = e => {
    e.preventDefault();
    if (titleVals === "" && contentVals === "") {
      return;
    }
    const ids = uuidv4();

    // add locally
    let newData = [{ id: ids, title: titleVals, content: contentVals }];
    setList(newData.concat(List));
    setTitleVals("");
    setContentVals("");

    // add to DB
    db.doc(ids).set({ title: titleVals, content: contentVals });
  };
  console.log("RENDER INPUT");
  return (
    <div>
      <form onSubmit={handleAddData}>
        <input
          placeholder="judul"
          onChange={e => setTitleVals(e.target.value)}
          value={titleVals}
        />
        <input
          placeholder="isi"
          onChange={e => setContentVals(e.target.value)}
          value={contentVals}
        />
        <button>Add</button>
      </form>
    </div>
  );
};

export default Input;

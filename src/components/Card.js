import React, { useState } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const styleCardContainer = css`
  width: 26%;
  background-color: yellow;
  padding: 10px;
  margin: 50px 20px 0 20px;
  :hover {
    #button-card {
      display: flex;
      margin-bottom: 10px;
    }
  }
`;

const styleCardTitle = css`
  margin: 0 0 10px 0;
  font-size: 16px;
  font-weight: 500;
`;

const styleCardContent = css`
  font-size: 12px;
`;

const styleCard = css`
  display: block;
`;
const styleButtonCard = css`
  height: 20px;
  justify-content: flex-end;
  display: none;
  margin-top: -30px;
`;
const styleButtonDelete = css`
  margin-top: 0px;
`;

const styleButtonEdit = css`
  margin-top: 0px;
`;

const styleInputTitle = css`
  width: 100%;
`;
const styleInputContent = css`
  width: 100%;
`;

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
      <div css={styleCard}>
        <form onSubmit={handleUpdate}>
          <input
            css={styleInputTitle}
            placeholder="judul"
            onChange={e => setTitleVal(e.target.value)}
            value={titleVal}
          />
          <textarea
            css={styleInputContent}
            placeholder="isi"
            onChange={e => setContentVal(e.target.value)}
            value={contentVal}
          />
          <button>Save</button>
        </form>
      </div>
    ) : (
      <div css={styleCard}>
        <div css={styleCardTitle}>{titleVal}</div>
        <div css={styleCardContent}>{contentVal}</div>
      </div>
    );
  };
  console.log("RENDER-CARD");
  return (
    <div css={styleCardContainer}>
      <div css={styleButtonCard} id="button-card">
        <button css={styleButtonEdit} onClick={() => setIsEdit(true)}>
          Edit
        </button>
        <button css={styleButtonDelete} onClick={() => handleDelete(id)}>
          X
        </button>
      </div>
      {renderCard()}
    </div>
  );
};

export default Card;

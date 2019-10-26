import React from "react";

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
  const { title, content } = props;
  return (
    <div style={styleCard}>
      <div style={styleCardTitle}>{title}</div>
      <div style={styleCardContent}>{content}</div>
    </div>
  );
};

export default Card;

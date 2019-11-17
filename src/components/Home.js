import React from "react";
import View from "./View";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const styleHome = css`
  background-color: #f5f5f5;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

const Home = () => {
  return (
    <div css={styleHome}>
      <View />
    </div>
  );
};

export default Home;

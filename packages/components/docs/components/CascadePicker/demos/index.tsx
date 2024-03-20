import React from "react";
import JsonSchema from "./json-schema";
import MarkupSchema from "./markup-schema";
import JSX from "./jsx";

function Index(props) {
  return (
    <>
      <MarkupSchema />

      <JsonSchema />
      <JSX />
    </>
  );
}

export default Index;

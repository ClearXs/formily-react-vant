import React from "react";
import JsonSchema from "./json-schema";
import MarkupSchema from "./markup-schema";

function Index(props) {
  return (
    <>
      <MarkupSchema />
      <JsonSchema />
    </>
  );
}

export default Index;

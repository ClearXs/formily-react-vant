import React from "react";
import { Field, isVoidField } from "@formily/core";
import { observer, useField } from "@formily/react";
import { Selector as VantSelector, Loading, SelectorProps } from "react-vant";
import { PreviewText } from "../preview-text";

export const Selector: React.FC<SelectorProps<any>> = observer((props) => {
  const field = useField<Field>();

  const dataSource: any[] = field?.dataSource?.length
    ? field.dataSource
    : props?.options?.length
    ? props.options
    : [];

  if (field.loading) {
    return <Loading />;
  }

  if (!isVoidField(field) && field?.pattern === "readPretty") {
    return <PreviewText.Selector {...props} />;
  }

  return <VantSelector {...props} options={dataSource} />;
});

export default Selector;

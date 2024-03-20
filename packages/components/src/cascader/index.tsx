import { connect, mapProps, mapReadPretty } from "@formily/react";
import { Cascader as VantCascader } from "react-vant";
import PreviewText from "../preview-text";

export const Cascader = connect(
  VantCascader,
  mapProps({
    dataSource: "columns",
  }),
  mapReadPretty(PreviewText.Cascader)
);

export default Cascader;

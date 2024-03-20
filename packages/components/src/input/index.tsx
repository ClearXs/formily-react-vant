import React from "react";
import { connect, mapProps, mapReadPretty } from "@formily/react";
import { InputProps, TextAreaProps, Input as VantInput } from "react-vant";
import { isValid } from "@formily/shared";
import { PreviewText } from "../preview-text";

type ComposedInput = React.FC<InputProps> & {
  TextArea?: React.FC<TextAreaProps>;
};

export const Input: ComposedInput = connect(
  VantInput,
  mapProps((props) => {
    return {
      value: isValid(props.value) ? props.value : "",
    };
  }),
  mapReadPretty(PreviewText.Input)
);

Input.TextArea = connect(
  VantInput.TextArea,
  mapProps((props) => {
    return {
      value: isValid(props.value) ? props.value : "",
    };
  }),
  mapReadPretty(PreviewText.Input)
);

export default Input;

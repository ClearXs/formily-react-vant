import React, { ReactNode, useEffect, useRef, useState } from "react";
import { connect, mapProps, mapReadPretty } from "@formily/react";
import { usePrefixCls, usePropsValue } from "../__builtins__";
import cls from "classnames";
import PreviewText from "../preview-text";
import { Close } from "@react-vant/icons";
import { Input, Picker, PickerProps } from "react-vant";
import {
  PickerColumnOption,
  PickerColumnProps,
  PickerValueExtend,
} from "react-vant/es/picker/PropsType";

export interface ICascadePickerProps extends PickerProps {
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  onChange?: (value: PickerColumnOption[], extend: PickerValueExtend) => void;
  clearable?: boolean;
  displayRender?: (
    label: ReactNode[],
    selectedOptions: (PickerColumnProps | null)[]
  ) => string;
}

const defaultDisplayRender = (
  label: ReactNode[]
  // selectedOptions: (PickerColumnItem | null)[]
) => label?.join(" / ");

export const BasePicker: React.FC<ICascadePickerProps> = ({
  placeholder,
  className,
  displayRender = defaultDisplayRender,
  value: propValue,
  onChange: propOnChange,
  clearable,
  style,
  ...props
}) => {
  const prefix = usePrefixCls("formily-cascade-picker");
  const inputRef = useRef<any>();
  const labelItems = useRef<PickerColumnProps[]>([]);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState<string | undefined>();
  const [value, onChange] = usePropsValue({
    defaultValue: propValue,
    onChange: propOnChange,
  });

  useEffect(() => {
    setLabel(
      displayRender(
        labelItems.current.map((item) => item.value),
        labelItems.current
      )
    );
  }, [labelItems.current]);

  const renderPicker = () => {
    const pickerProps = {
      getContainer: null,
      ...props,
      visible,
      value,
      onClose: () => {
        setVisible(false);
        inputRef.current.focus();
      },
      onConfirm: onChange,
      children: (items) => {
        labelItems.current = items;
        return null;
      },
    };
    return <Picker {...pickerProps} />;
  };

  return (
    <div className={cls(prefix, className)}>
      <Input
        placeholder={placeholder}
        value={label}
        ref={inputRef}
        style={{ "--caret-width": "1px", "--caret-color": "#666666", ...style }}
        onClick={() => {
          setVisible(true);
        }}
      />
      {clearable && value && value.length > 0 && (
        <div
          className={`${prefix}-clear`}
          onClick={() => {
            onChange?.([], { items: [], columns: [] });
            labelItems.current = [];
          }}
        >
          <Close />
        </div>
      )}
      {renderPicker()}
    </div>
  );
};

export const CascadePicker = connect(
  BasePicker,
  mapProps({
    dataSource: "columns",
  }),
  mapReadPretty(PreviewText.Cascader)
);

export default CascadePicker;

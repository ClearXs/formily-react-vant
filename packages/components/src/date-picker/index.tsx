import React, { useRef, useState } from "react";
import cls from "classnames";
import union from "lodash/union";
import moment from "moment";
import { connect, mapReadPretty } from "@formily/react";
import {
  DateTimePickerProps,
  Input,
  DatetimePicker as VantDatePicker,
} from "react-vant";

import { formatMomentValue, momentable, usePrefixCls } from "../__builtins__";
import { PreviewText } from "../preview-text";
import { Close } from "@react-vant/icons";

type PickerMode = "date" | "week" | "month" | "quarter" | "year";

export type IDatePickerProps<PickerProps> = Exclude<
  PickerProps,
  "value" | "onChange"
> & {
  placeholder?: string;
  clearable?: boolean;
  picker?: PickerMode;
  format?:
    | string
    | ((value: moment.Moment) => string)
    | (string | ((value: moment.Moment) => string)[]);
  showTime?: boolean;
  value: string;
  onChange: (value: string) => void;
};

export type RangePickerProps = {};

type ComposedDatePicker = React.FC<DateTimePickerProps> & {
  RangePicker?: React.FC<RangePickerProps>;
};

const mapDateFormat = function <T>() {
  const getDefaultFormat = (props: IDatePickerProps<T>) => {
    const picker = props.picker;
    if (picker === "month") {
      return "YYYY-MM";
    } else if (picker === "quarter") {
      return "YYYY-\\QQ";
    } else if (picker === "year") {
      return "YYYY";
    } else if (picker === "week") {
      return "gggg-wo";
    }
    return props["showTime"] ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD";
  };
  return (props: any): IDatePickerProps<T> => {
    const format = props["format"] || getDefaultFormat(props);
    const onChange = props.onChange;
    return {
      ...props,
      format: format,
      value: momentable(props.value, format === "gggg-wo" ? "gggg-ww" : format),
      onChange: (value: string) => {
        if (onChange) {
          onChange(formatMomentValue(value, format));
        }
      },
    } as IDatePickerProps<T>;
  };
};

export const BaseDatePicker: React.FC<IDatePickerProps<DateTimePickerProps>> = (
  props
) => {
  const prefix = usePrefixCls("formily-date-picker");
  const { onChange, placeholder, value, format, clearable, style, picker } =
    mapDateFormat<DateTimePickerProps>()(props);
  const inputRef = useRef();
  const [visible, setVisible] = useState(false);

  const onDateChange = (value: string) => {
    onChange?.(value);
  };

  const val = formatMomentValue(value, format, "");

  const renderDatePicker = () => {
    const precision = union([picker])?.[0];

    const props = {
      precision,
      visible,
      onCancel: () => {
        setVisible(false);
      },
      onConfirm: onDateChange,
    };

    return <VantDatePicker {...props} />;
  };

  return (
    <div className={cls(prefix)}>
      <Input
        placeholder={placeholder}
        value={Array.isArray(val) ? val.join("~") : val}
        ref={inputRef}
        style={{ "--caret-width": "1px", "--caret-color": "#666666", ...style }}
        onClick={() => {
          setVisible(true);
        }}
      />
      {clearable && value && (
        <div className={`${prefix}-clear`} onClick={() => onChange?.("")}>
          <Close />
        </div>
      )}
      {renderDatePicker()}
    </div>
  );
};

export const DatePicker: ComposedDatePicker = connect(
  BaseDatePicker,
  mapReadPretty(PreviewText.DatePicker)
);

/*
 DatePicker.RangePicker = connect(
 AntdDatePicker.RangePicker,
 mapProps(mapDateFormat()),
 mapReadPretty(PreviewText.DateRangePicker)
 )
 */

export default DatePicker;

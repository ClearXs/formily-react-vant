import { DataField } from "@formily/core";
import { connect, mapProps, observer, useField } from "@formily/react";
import React, { FunctionComponent } from "react";
import {
  Checkbox as VantCheckbox,
  Space,
  CheckboxProps,
  CheckboxGroupProps,
} from "react-vant";
import { useFormLayout } from "../form-layout";

export interface ICheckboxOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface Props {
  options?: string[] | ICheckboxOption[];
  layout?: "vertical" | "horizontal";
  layoutBlock?: boolean;
}

export interface ICheckboxProps extends Props, CheckboxProps {}

export interface ICheckboxGroupProps extends Props, CheckboxGroupProps {}

type ComposedCheckbox = React.FC<ICheckboxProps> & {
  Group?: React.FC<ICheckboxGroupProps>;
  __ANTD_MOBILE_CHECKBOX?: boolean;
};

const isCheckbox = (node: any) => {
  return (
    React.isValidElement(node) &&
    (node.type as FunctionComponent).displayName.indexOf("Checkbox") > -1
  );
};

export const BaseCheckbox: React.FC<ICheckboxProps> = ({
  children,
  options,
  ...props
}) => {
  const layout = useFormLayout();
  const field = useField<DataField>();

  const dataSource = field?.dataSource?.length
    ? field.dataSource
    : options?.length
    ? options
    : [];

  if (children) {
    //线jsx模式
    if (Array.isArray(children)) {
      return <>{children}</>;
    }
    return !isCheckbox(children) ? (
      <VantCheckbox {...props}>{children}</VantCheckbox>
    ) : (
      (children as any)
    );
  }

  if (dataSource.length === 0) {
    return <VantCheckbox {...props}>{field?.title || props.name}</VantCheckbox>;
  }

  return (
    <Space
      direction={props.layout ?? layout.layout ?? "vertical"}
      block={props.layoutBlock}
      wrap={true}
    >
      {dataSource.map((item) => {
        const option =
          typeof item === "string" ? { label: item, value: item } : item;
        return (
          <VantCheckbox
            {...props}
            disabled={option.disabled}
            name={option.name}
            key={option.name}
          >
            {option.label}
          </VantCheckbox>
        );
      })}
    </Space>
  );
};

BaseCheckbox.defaultProps = {
  block: true,
};

export const CheckboxGroup: React.FC<ICheckboxGroupProps> = observer(
  ({ value, defaultValue, disabled, onChange, ...props }) => {
    return (
      <VantCheckbox.Group
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={onChange}
      >
        <BaseCheckbox {...props} />
      </VantCheckbox.Group>
    );
  }
);
export const Checkbox: ComposedCheckbox = connect(BaseCheckbox, mapProps({}));

Checkbox.displayName = "Checkbox";
Checkbox.__ANTD_MOBILE_CHECKBOX = true;
Checkbox.Group = CheckboxGroup;
Checkbox.Group.displayName = "Checkbox.Group";

export default Checkbox;

import React from "react";
import {
  observer,
  RecursionField,
  useField,
  useFieldSchema,
} from "@formily/react";
import { ArrayField } from "@formily/core";
import { Cell, CellProps, ListProps, List as VantList } from "react-vant";
import { usePrefixCls } from "../__builtins__";
import {
  ArrayBase,
  ArrayBaseMixins,
  useArrayItemComponent,
  isArrayItemComponent,
} from "../array-base";
import cls from "classnames";

export interface IListProps extends Omit<ListProps, "style" | "className"> {
  renderHeader?: React.ReactNode;
  renderFooter?: React.ReactNode;
  title?: string;
}

export type IListItemProps = CellProps;

enum listPropsMap {
  title = "ItemTitle",
  prefix = "ItemPrefix",
  description = "ItemDescription",
  extra = "ItemExtra",
  children = "ItemChildren",
}

const listComponentMap = {
  [listPropsMap.title]: "ItemTitle",
  [listPropsMap.prefix]: "ItemPrefix",
  [listPropsMap.description]: "ItemDescription",
  [listPropsMap.extra]: "ItemExtra",
  [listPropsMap.children]: "ItemChildren",
};

type ComposedList = React.FC<IListProps> &
  ArrayBaseMixins & {
    Item?: React.FC<IListItemProps>;
    ItemTitle?: React.FC<IListItemProps["title"]>;
    ItemPrefix?: React.FC<IListItemProps["prefix"]>;
    ItemDescription?: React.FC<IListItemProps["description"]>;
    ItemExtra?: React.FC<IListItemProps["extra"]>;
    ItemChildren?: React.FC<IListItemProps["children"]>;
  };

export const List: ComposedList = observer(
  ({ className, style, title, renderFooter, renderHeader, ...props }) => {
    const field = useField<ArrayField>();
    const schema = useFieldSchema();
    const options = Array.isArray(field?.value) ? field?.value : [];
    const prefixCls = usePrefixCls("formily-list");

    const renderTitle = () => {
      if (!title && !renderHeader) {
        return null;
      }
      const innerHeader = title || renderHeader;
      return <div className={`${prefixCls}-header`}>{innerHeader}</div>;
    };

    const renderChildren = () => {
      if (props.children) {
        // jsx模式
        return props.children;
      }
      return options?.map((item, index) => {
        const items = Array.isArray(schema.items)
          ? schema.items[index] || schema.items[0]
          : schema.items;

        return (
          <ArrayBase.Item key={index} index={index} record={item}>
            <RecursionField
              schema={items}
              name={index}
              filterProperties={(sc) => {
                return !isArrayItemComponent(
                  sc,
                  Object.values(listComponentMap)
                );
              }}
            />
          </ArrayBase.Item>
        );
      });
    };

    return (
      <ArrayBase>
        <div className={cls(prefixCls, className)} style={style}>
          {renderTitle()}
          <VantList>{renderChildren()}</VantList>
          {renderFooter && (
            <div className={`${prefixCls}-footer`}>{renderFooter}</div>
          )}
        </div>
      </ArrayBase>
    );
  }
);
List.Item = observer((props) => {
  const schema = useFieldSchema();
  const components = useArrayItemComponent(
    schema,
    Object.values(listComponentMap)
  );
  return (
    <Cell
      title={components?.get(listPropsMap.title)}
      prefix={components?.get(listPropsMap.prefix)}
      description={components?.get(listPropsMap.description)}
      extra={components?.get(listPropsMap.extra)}
      {...props}
    >
      {components?.get(listPropsMap.children) || props.children}
    </Cell>
  );
});

const baseItemComponent = () => {
  return null;
};

List.ItemPrefix = baseItemComponent;
List.ItemTitle = baseItemComponent;
List.ItemDescription = baseItemComponent;
List.ItemChildren = baseItemComponent;
List.ItemExtra = baseItemComponent;

List.displayName = "List";

export default List;

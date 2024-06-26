import React from "react";
// @ts-ignore
import {
  Input,
  FormLayout,
  FormItem,
  List,
  FormButtonGroup,
  Submit,
} from "@formily/react-vant";
import { Dialog, Image } from "react-vant";
import { createForm } from "@formily/core";
import { FormProvider, createSchemaField, ISchema } from "@formily/react";

const Text = (props) => props.value;

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    List,
    Image,
    Text,
  },
});

const users = [
  {
    avatar:
      "https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
    name: "Novalee Spicer",
    description: "Deserunt dolor ea eaque eos",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9",
    name: "Sara Koivisto",
    description: "Animi eius expedita, explicabo",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1542624937-8d1e9f53c1b9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
    name: "Marco Gregg",
    description: "Ab animi cumque eveniet ex harum nam odio omnis",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
    name: "Edith Koenig",
    description: "Commodi earum exercitationem id numquam vitae",
  },
];

const form = createForm();
const schema: ISchema = {
  type: "object",
  properties: {
    list: {
      type: "array",
      title: "基础列表",
      "x-component": "List",
      default: users,
      items: {
        type: "object",
        "x-component": "List.Item",
        "x-component-props": {
          description: "{{$record.description}}",
          children: "{{$record.name}}",
        },
        properties: {
          prefix: {
            type: "void",
            "x-component": "List.ItemPrefix",
            properties: {
              avatar: {
                type: "string",
                "x-component": "Image",
                "x-component-props": {
                  src: "{{$record.avatar}}",
                  fit: "cover",
                  width: 40,
                  height: 40,
                  style: { borderRadius: 20 },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default () => {
  const onSubmit = (values: any) => {
    Dialog.alert({
      message: JSON.stringify(values),
    });
  };

  return (
    <FormProvider form={form}>
      <FormLayout>
        <SchemaField schema={schema} />
      </FormLayout>
      <FormButtonGroup>
        <Submit onSubmit={onSubmit}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  );
};

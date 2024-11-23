import { Form, Input, Tabs } from "antd";
import React, { useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { currentLanguage } from "../../recoil/atom";
import useCreateTabItem from "./hooks/useCreateTabItem";

const initialItems = [
  {
    label: "Tab 1",
    children: "Content of Tab 1",
    key: "1",
  },
  {
    label: "Tab 2",
    children: "Content of Tab 2",
    key: "2",
  },
  {
    label: "Tab 3",
    children: "Content of Tab 3",
    key: "3",
  },
];

function RealProjects({ form }) {
  
  const { items, activeKey, onChangeActiveTab, onEdit} = useCreateTabItem(form);

  return (
    <Tabs
      type="editable-card"
      onChange={onChangeActiveTab}
      activeKey={activeKey}
      onEdit={onEdit}
      items={items}
    />
  );
}



export default RealProjects;

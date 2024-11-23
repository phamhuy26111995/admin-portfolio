import React, { useState, useRef } from "react";
import TabContent from "../TabContent";

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

function useCreateTabItem(form) {
  const [activeKey, setActiveKey] = useState(initialItems[0].key);

  const [items, setItems] = useState(initialItems);
  const newTabIndex = useRef(0);

  function onChangeActiveTab(key) {
    setActiveKey(key);
  }

  function onEdit(targetKey, action) {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  }

  function remove(targetKey) {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  }

  function add() {
    const newActiveKey = `project_${newTabIndex.current++}`;
    const newPanes = [...items];
    newPanes.push({
      label: newActiveKey,
      children: <TabContent key={newActiveKey} form={form} />,
      key: newActiveKey,
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
  }

  return { activeKey, items, onChangeActiveTab, onEdit, remove, add };
}

export default useCreateTabItem;

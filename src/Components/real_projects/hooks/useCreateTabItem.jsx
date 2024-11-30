import React, { useState, useRef, useEffect } from "react";
import TabContent from "../TabContent";
import { database } from "../../../firebaseConfig";
import { getData } from "../../../firebaseFunctions";
import { useRecoilValue } from "recoil";
import { currentLanguage } from "../../../recoil/atom";

function useCreateTabItem(form) {
  const [activeKey, setActiveKey] = useState(0);
  const language = useRecoilValue(currentLanguage);
  const [items, setItems] = useState([]);
  const newTabIndex = useRef(0);


  useEffect(() => {
    getRealProjects();
  },[])

  async function getRealProjects() {
    const data = await getData(database, 'realProjects');

    if(!data) return
    
    Object.keys(data).forEach((key) => {
      const item = {
        key: key,
        label: data[key][language]['projectInfo']['title'],
        children: <TabContent key={key} tabName={key}  />,
      };
      setItems((prevItems) => [...prevItems, item]);

      
    })

    const maxProjectNumber = getMaxProjectNumber(data);

    newTabIndex.current = maxProjectNumber;

    form.setFieldsValue({ realProjects: data });
  }

  function getMaxProjectNumber(data) {
    // Lấy các key từ object
    const keys = Object.keys(data);
  
    // Tách số từ key và tìm số lớn nhất
    const maxNumber = keys
      .map(key => parseInt(key.replace("project_", ""), 10)) // Tách số từ key
      .filter(num => !isNaN(num)) // Lọc các giá trị hợp lệ (không phải NaN)
      .reduce((max, current) => Math.max(max, current), 0); // Tìm số lớn nhất
  
    return maxNumber;
  }
  
 
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
      label: 'New Project',
      children: (
        <TabContent key={newActiveKey} tabName={newActiveKey} />
      ),
      key: newActiveKey,
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
  }

  return { activeKey, items, onChangeActiveTab, onEdit, remove, add };
}

export default useCreateTabItem;

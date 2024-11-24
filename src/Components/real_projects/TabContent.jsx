import React from "react";
import { DatePicker, Form, Input } from "antd";
import { currentLanguage } from "../../recoil/atom";
import { useRecoilValue } from "recoil";
import DescriptionDetail from "./DescriptionDetail";

function TabContent() {
  const language = useRecoilValue(currentLanguage);

  return (
    <>
      
        <Form.Item label="Description" name={['realProjects',language, "description"]}>
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="My Role" name={['realProjects',language, "myRole"]}>
          <Input />
        </Form.Item>

        <Form.Item label="Number of Member" name={['realProjects',language, "projectInfo", "numberOfMember"]}>
          <Input type="number" />
        </Form.Item>

        <Form.Item label="Period" name={['realProjects',language, "projectInfo", "period"]}>
          <DatePicker />
        </Form.Item>

        <Form.Item label="Role" name={['realProjects',language, "projectInfo", "role"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Title" name={['realProjects',language, "projectInfo", "title"]}>
          <Input />
        </Form.Item>

        <Form.Item  label="Technologies" name={['realProjects',language, "projectInfo", "technologies"]}>
          <Input />
        </Form.Item>

        <Form.Item noStyle label="Description Details" name={['realProjects',language, "projectInfo", "descriptionDetail"]}>
          <DescriptionDetail />
        </Form.Item>
    </>
  );
}

export default TabContent;

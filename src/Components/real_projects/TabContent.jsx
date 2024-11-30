import React, { useEffect } from "react";
import { DatePicker, Divider, Form, Input } from "antd";
import { currentLanguage } from "../../recoil/atom";
import { useRecoilValue } from "recoil";
import DescriptionDetail from "./DescriptionDetail";

function TabContent({ tabName }) {
  const language = useRecoilValue(currentLanguage);

  return (
    <>
      <Form.Item
        label="Description"
        rules={[{required : true, message : "Please enter description"}]}
        name={["realProjects", tabName, language, "description"]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label="My Role"
        rules={[{required : true, message : "Please enter my role"}]}
        name={["realProjects", tabName, language, "myRole"]}
      >
        <Input />
      </Form.Item>

      <Divider
      style={{
        borderColor: '#7cb305',
      }}
    >
      Project Information
    </Divider>
      <Form.Item
        label="Number of Member"
        rules={[{required : true, message : "Please enter number of member"}]}
        name={[
          "realProjects",
          tabName,
          language,
          "projectInfo",
          "numberOfMember",
        ]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="Period"
        rules={[{required : true, message : "Please enter period"}]}
        name={["realProjects", tabName, language, "projectInfo", "period"]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="Role"
        rules={[{required : true, message : "Please enter role"}]}
        name={["realProjects", tabName, language, "projectInfo", "role"]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Title"
        rules={[{required : true, message : "Please enter title"}]}
        name={["realProjects", tabName, language, "projectInfo", "title"]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Technologies"
        rules={[{required : true, message : "Please enter technologies"}]}
        name={[
          "realProjects",
          tabName,
          language,
          "projectInfo",
          "technologies",
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        noStyle
        label="Description Details"
        name={[
          "realProjects",
          tabName,
          language,
          "projectInfo",
          "descriptionDetail",
        ]}
      >
        <DescriptionDetail />
      </Form.Item>
    </>
  );
}

export default TabContent;

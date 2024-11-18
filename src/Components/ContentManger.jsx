import React, {useState} from 'react';
import {Button, Dropdown, Form, Layout, message, Tabs} from 'antd';
import {DownOutlined, GlobalOutlined, UserOutlined} from '@ant-design/icons';
import AboutForm from './AboutForm.jsx';
import BannerForm from './BannerForm.jsx';
import HeaderForm from './HeaderForm.jsx';
import PersonalProjectsForm from "./ProjectForm.jsx";
import {updateData} from "../firebaseFunctions.js";
import {auth, database} from "../firebaseConfig.js";
import {getAuth, signOut} from "firebase/auth";

const { Header, Content } = Layout;
const logout = async (auth) => {
  try {
    await signOut(auth);
  } catch (error) {
  }
};
const ContentManager = () => {
  const [form] = Form.useForm();
  const [iframeKey, setIframeKey] = useState(0);
  const [language, setLanguage] = useState('en-US'); // Thêm trạng thái cho ngôn ngữ
  const [activeTab, setActiveTab] = useState('1'); // Thêm trạng thái cho tab hiện tại
  const currentUser = getAuth().currentUser;
  const onFinish = async (values) => {
    try {
      setIframeKey(iframeKey + 1); // This will force the iframe to reload

      // Cập nhật dữ liệu của tab hiện tại
      switch (activeTab) {
        case '1':
          await updateData(database, 'about', values.about);
          message.success('About tab updated successfully.');
          break;
        case '2':
          await updateData(database, 'banner', values.banner);
          message.success('Banner tab updated successfully.');
          break;
        case '3':
          await updateData(database, 'header', values.header);
          message.success('Header tab updated successfully.');
          break;
        case '4':
          await updateData(database, 'personalProjects', values.personalProjects);
          message.success('Personal Projects tab updated successfully.');
          break;
        default:
          break;
      }
    } catch (error) {
      message.error('Error updating data: ' + error.message);
    }
  };

  const handleLogout = () => {
    logout(auth)
    console.log('Logout');
  };

  const handleLanguageChange = ({ key }) => {
    setLanguage(key); // Cập nhật ngôn ngữ
  };

  const userItems = [
    {
      label: (
        <div>Profile</div>
      ),
      key: '0',
    },
    {
      label: (
        <div onClick={handleLogout}>Logout</div>
      ),
      key: '1',
    },
    {
      type: 'divider',
    }
  ];

  const languageItems = [
    {
      label: (
        <div onClick={() => handleLanguageChange({ key: 'en-US' })}>English</div>
      ),
      key: 'en-US',
    },
    {
      label: (
        <div onClick={() => handleLanguageChange({ key: 'vi-VN' })}>Tiếng Việt</div>
      ),
      key: 'vi-VN',
    },
    {
      type: 'divider',
    }
  ];

  const tabItems = [
    {
      key: '1',
      label: 'About',
      children: <AboutForm form={form} language={language} />, // Truyền ngôn ngữ hiện tại vào form
    },
    {
      key: '2',
      label: 'Banner',
      children: <BannerForm form={form} language={language} />,
    },
    {
      key: '3',
      label: 'Header',
      children: <HeaderForm form={form} language={language} />,
    },
    {
      key: '4',
      label: 'Personal Projects',
      children: <PersonalProjectsForm form={form} language={language} />,
    },
  ];

  return (
    <Layout>
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff' }}>
        <Dropdown menu={{ items: languageItems }} trigger={['click']}>
          <Button icon={<GlobalOutlined />}>
            Language <DownOutlined />
          </Button>
        </Dropdown>
        <Dropdown menu={{ items: userItems }} trigger={['click']}>
          <Button icon={<UserOutlined />}>
            {currentUser && currentUser.displayName} <DownOutlined />
          </Button>
        </Dropdown>
      </Header>
      <Content style={{ padding: '20px' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <Form form={form} onFinish={onFinish} layout="vertical">
              <Tabs
                defaultActiveKey="1"
                items={tabItems}
                onChange={(key) => setActiveTab(key)} // Cập nhật trạng thái khi tab thay đổi
              />
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default ContentManager;

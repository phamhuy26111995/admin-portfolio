import React, { useEffect, useState, useRef } from 'react';
import { Form, Button, Tabs, Layout, Menu, Dropdown } from 'antd';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { UserOutlined, DownOutlined, LogoutOutlined, GlobalOutlined } from '@ant-design/icons';
import { userState, aboutState, bannerState, headerState, personalProjectsState } from './recoil/state';
import AboutForm from './AboutForm';
import BannerForm from './BannerForm';
import HeaderForm from './HeaderForm';
import PersonalProjectsForm from "./ProjectForm";
import { database } from '../firebaseConfig.js';
import { updateData, getData } from '../firebaseFunctions.js';

const { Header, Content } = Layout;
import { message } from 'antd';

const ContentManager = () => {
  const [form] = Form.useForm();
  const [iframeKey, setIframeKey] = useState(0);
  const iframeRef = useRef(null);
  const [user, setUser] = useRecoilState(userState);


  const onFinish = async (values) => {
    try {
      setIframeKey(iframeKey + 1); // This will force the iframe to reload

      await updateData(database, 'about', values.about);
      message.success('About tab updated successfully.');

      await updateData(database, 'banner', values.banner);
      message.success('Banner tab updated successfully.');

      await updateData(database, 'header', values.header);
      message.success('Header tab updated successfully.');

      await updateData(database, 'personalProjects', values.personalProjects);
      message.success('Personal Projects tab updated successfully.');

    } catch (error) {
      message.error('Error updating data: ' + error.message);
    }
  };


  const handleLogout = () => {
    setUser(null);
    console.log('Logout');
  };

  const userItems = [ {
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
  ]


  const items = [ {
    label: (
      <div>English</div>
    ),
    key: '0',
  },
    {
      label: (
        <div>Tiếng Việt</div>

      ),
      key: '1',
    },
    {
      type: 'divider',
    }
  ]

  const tabItems = [
    {
      key: '1',
      label: 'About',
      children: <AboutForm form={form} />,
    },
    {
      key: '2',
      label: 'Banner',
      children: <BannerForm form={form} />,
    },
    {
      key: '3',
      label: 'Header',
      children: <HeaderForm form={form} />,
    },
    {
      key: '4',
      label: 'Personal Projects',
      children: <PersonalProjectsForm form={form} />,
    },
  ];

  return (
    <Layout>
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff' }}>
        <Dropdown menu={{ items: items }} trigger={['click']}>
          <Button icon={<GlobalOutlined />}>
            Language <DownOutlined />
          </Button>
        </Dropdown>
        <Dropdown menu={{ items: userItems }} trigger={['click']}>
          <Button icon={<UserOutlined />}>
            {user ? user.username : 'User'} <DownOutlined />
          </Button>
        </Dropdown>
      </Header>
      <Content style={{ padding: '20px' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <Form form={form} onFinish={onFinish} layout="vertical">
              <Tabs defaultActiveKey="1" items={tabItems} />
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Form>
          </div>
          {/*<div style={{ flex: 1, paddingLeft: '20px' }}>
            <iframe
              key={iframeKey}
              ref={iframeRef}
              src="http://localhost:5174/"
              width="100%"
              height="100%"
              title="External Content"
            />
          </div>*/}
        </div>
      </Content>
    </Layout>
  );
};

export default ContentManager;

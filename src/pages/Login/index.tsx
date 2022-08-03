import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { message } from 'antd';
import React from 'react';
import { ProFormText, LoginForm } from '@ant-design/pro-form';
import { history, useModel } from 'umi';
import { processLoginStaff } from '@/services/UserService/api';
import { setLocalStorage } from '@/utils/utils';
import { staff_info } from '@/conf/conf';
import styles from './index.less';

const goto = () => {
  if (!history) return;
  setTimeout(() => {
    const { query } = history.location;
    const { redirect } = query as {
      redirect: string;
    };
    history.push(redirect || '/');
  }, 10);
};

const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { updateBtnAuthList } = useModel('index');
  const fetchUserInfo = async () => {
    const staffInfo = await initialState?.fetchUserInfo?.();
    if (staffInfo) {
      await setInitialState({ ...initialState, currentUser: staffInfo });
    }
  };

  const handleSubmit = async (values: UserAPI.LoginParams) => {
    try {
      const res = await processLoginStaff(values);

      if (res) {
        const { data } = res || {};
        const { function: btnAuth } = data;
        setLocalStorage(staff_info, JSON.stringify(data));
        await fetchUserInfo();
        const btnAuthList = (btnAuth && btnAuth.split(',')) || []
        updateBtnAuthList(btnAuthList)
        message.success(`登陆成功`);
        goto();
      }
    } catch (e) {
      message.error(`登陆失败`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          title='BMS管理系统'
          onFinish={async (values) => {
            await handleSubmit(values as UserAPI.LoginParams);
          }}
        >
          <div
            style={{
              marginTop: 16,
            }}
          >
            <ProFormText
              name='phone'
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'请输入账号'}
              rules={[
                {
                  required: true,
                  message: '用户名是必填项！',
                },
              ]}
            />
            <ProFormText.Password
              name='password'
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'请输入密码'}
              rules={[
                {
                  required: true,
                  message: '密码是必填项！',
                },
              ]}
            />
          </div>
        </LoginForm>
      </div>
    </div>
  );
};

export default Login;

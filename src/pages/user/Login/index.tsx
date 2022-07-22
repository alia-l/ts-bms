import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { message } from 'antd';
import React from 'react';
import { ProFormText, LoginForm } from '@ant-design/pro-form';
import { useIntl, history, FormattedMessage, useModel } from 'umi';
import { processLoginStaff } from '@/services/ant-design-pro/user';
import { setLocalStorage } from '@/utils/utils';
import { staff_info } from '@/conf/conf';
import styles from './index.less';

const goto = () => {
  if (!history) return;
  setTimeout(() => {
    const { query } = history.location;
    const { redirect } = query as { redirect: string };
    history.push(redirect || '/');
  }, 10);
};

const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const intl = useIntl();
  const fetchUserInfo = async () => {
    const staffInfo = await initialState?.fetchUserInfo?.();
    if (staffInfo) {
      await setInitialState({
        ...initialState,
        currentUser: staffInfo,
      });
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      const res = await processLoginStaff(values);
      if (res) {
        const { data } = res || {};
        setLocalStorage(staff_info, JSON.stringify(data));
        await fetchUserInfo();
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
          title="BMS管理系统"
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <div style={{ marginTop: 16 }}>
            <ProFormText
              name="phone"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.username.placeholder',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="请输入用户名!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.password.placeholder',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="请输入密码！"
                    />
                  ),
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

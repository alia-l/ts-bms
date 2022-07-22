import React, { useCallback } from 'react';
import { LogoutOutlined, RightOutlined } from '@ant-design/icons';
import { Menu, Spin } from 'antd';
import { history, useModel } from 'umi';
import { stringify } from 'querystring';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { removeLocalStorage } from '@/utils/utils';
import { staff_info, STAFF_ROLE } from '@/conf/conf';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = () => {
  removeLocalStorage(staff_info);
  const { query = {}, pathname } = history.location;
  const { redirect } = query;
  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: pathname,
      }),
    });
  }
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const onMenuClick = useCallback(
    (event) => {
      const { key } = event;
      if (key === 'logout' && initialState) {
        setInitialState({ ...initialState, currentUser: null });
        loginOut();
      }
    },
    [initialState, setInitialState],
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;
  const { staffVo } = currentUser;

  if (!staffVo?.id) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu
      className={styles.menu}
      selectedKeys={[]}
      items={[
        {
          key: 'logout',
          label: '退出登录',
          icon: <LogoutOutlined />,
          onClick: (event) => onMenuClick(event),
        },
      ]}
    ></Menu>
  );
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <span className={`${styles.action} ${styles.account}`}>
        <span className={`${styles.name} anticon`}>欢迎，</span>
        <span className={`${styles.name} anticon`}>
          {STAFF_ROLE.find((it) => it.value === staffVo?.roleId)?.label}
        </span>
        <span className={`${styles.name} anticon`}>{staffVo?.name}</span>
      </span>
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <div className={styles.outBtn}>
          <RightOutlined />
        </div>
      </HeaderDropdown>
    </div>
  );
};

export default AvatarDropdown;

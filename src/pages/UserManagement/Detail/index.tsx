import { ProCard } from '@ant-design/pro-components';
import { Tag, Tabs, Button, Dropdown, Menu, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import { useModel } from '@@/plugin-model/useModel';
import Info from '@/components/Info';
import { LEAD_LEVEL } from '@/conf/conf';
import SubscribeTabPane from '../components/SubscribeTabPane';
import RelationTabPane from '../components/RelationTabPane';
import PointTabPane from '../components/PointTabPane';
import CouponTabPane from '../components/CouponTabPane';
import LotteryDrawTabPane from '../components/LotteryDrawTabPane';
import BagTabPane from '@/pages/UserManagement/components/BagTabPane';
import moment from 'moment';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { checkBtnAuth } from '@/utils/utils';

const TAB_LIST = [
  { value: '1', label: '书袋订单' },
  { value: '2', label: '订阅信息' },
  { value: '3', label: '关系记录' },
  { value: '4', label: '积分记录' },
  { value: '5', label: '优惠券记录' },
  { value: '6', label: '抽奖记录' },
];
const { TabPane } = Tabs;

/**
 * @description 获取level子项
 * @param detail
 */
const getLevelItem = (detail: UserAPI.UserDetailData) => {
  return LEAD_LEVEL.find((it) => it.value === detail?.referLevel) || {};
};

/**
 * @description 获取TabPane子项
 * @param v
 * @param id
 * @param phone
 */
const getTabPane = (v: any, id: number, phone: string) => {
  let tabPane;
  switch (v) {
    case '1':
      tabPane = <BagTabPane id={id} phone={phone} />;
      break;
    case '2':
      tabPane = <SubscribeTabPane id={id} phone={phone} />;
      break;
    case '3':
      tabPane = <RelationTabPane id={id} phone={phone} />;
      break;
    case '4':
      tabPane = <PointTabPane id={id} phone={phone} />;
      break;
    case '5':
      tabPane = <CouponTabPane id={id} phone={phone} />;
      break;
    case '6':
      tabPane = <LotteryDrawTabPane id={id} phone={phone} />;
      break;
    default:
      break;
  }
  return tabPane;
};

const UserDetail: React.FC = (props) => {
  const {
    detailInfoLoading,
    fetchGetUserDetail,
    detail,
  } = useModel('userModel');
  const [id, setId] = useState<number>();
  const [phone, setPhone] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    // @ts-ignore
    const { id: userId, phone: p } = props.match.params;
    setId(userId);
    setPhone(p);
    fetchGetUserDetail(userId);
  }, []);


  const handleMenuClick = (e: any) => {
    const { key } = e;
    switch (key) {
      case '2':
        // showAccountModal(id);
        break;
      case '3':
        // showChangePhoneModal(id);
        break;
      default:
        break;
    }
  };

  const changeAllow = (value: boolean) => {

  };

  const moreOperation = () => {
    return (
      <Menu onClick={(e) => handleMenuClick(e)}>
        <Menu.Item key='1' disabled={!checkBtnAuth('unbind_wechat')}>
          书袋特殊操作
          <Switch
            checkedChildren='开'
            unCheckedChildren='关'
            disabled={!!detail.hadAllowed}
            defaultChecked={detail.hadAllowed}
            onChange={(value) => changeAllow(value)}
          />
        </Menu.Item>
        <Menu.Item key='2' disabled={!checkBtnAuth('unbind_wechat')}>
          解绑微信
        </Menu.Item>
        <Menu.Item key='3' disabled={!checkBtnAuth('change_phone')}>
          换绑手机号
        </Menu.Item>
      </Menu>
    );
  };


  return <div>
    <ProCard gutter={8} ghost loading={detailInfoLoading}>
      <ProCard title={'基本信息'} extra={
        <Dropdown overlay={() => moreOperation()} onVisibleChange={(visible) => setOpen(visible)}>
          <Button
            type={'link'}
            size={'small'}
            icon={open ? <CaretUpOutlined /> : <CaretDownOutlined />}
          >
            操作
          </Button>
        </Dropdown>

      }>
        <ProCard split='horizontal'>
          <Info title={'id'} content={detail?.id || '-'} />
          <Info title={'角色'} content={detail?.roleValue || '-'} />
          <Info title={'昵称'} content={`${detail?.nickname || '-'}/${detail?.phone || '-'}/${detail?.realName || ''}`} />
        </ProCard>
        <ProCard split='horizontal'>
          <Info title={'订阅服务'} content={detail?.serviceName || '-'} />
          <Info title={'绑定关系'} content={
            <>
              <Tag
                color={getLevelItem(detail as UserAPI.UserDetailData).color}>
                {getLevelItem(detail as UserAPI.UserDetailData).label}
              </Tag>
              <span>{`${detail?.referNickname || '--'}/${detail?.referPhone || '--'}/${detail?.referRealName || ''}`}</span>
            </>
          } />
          <Info title={'绑定状态'} content={detail?.referStatusValue || '-'} />
        </ProCard>
      </ProCard>
      <ProCard colSpan='400px' title={'其他信息'}>
        <Info title={'当前积分'} content={detail?.userPoints || '-'} />
        <Info title={'宝宝性别'} content={detail?.babyInfo ? (detail?.babyInfo.sex === 1 ? '男' : '女') : '-'} />
        <Info title={'宝宝出生日期'}
              content={detail?.babyInfo ? moment(detail?.babyInfo.birthday).format('YYYY-MM-DD') : '-'} />
      </ProCard>
    </ProCard>
    <ProCard bordered style={{ marginTop: 8 }} colSpan='400px'>
      <Tabs defaultActiveKey='1' style={{ marginTop: 20 }}>
        {
          TAB_LIST.map((it) => (
            <TabPane tab={it.label} key={it.value}>
              {getTabPane(it.value, id as number, phone as string)}
            </TabPane>
          ))
        }
      </Tabs>
    </ProCard>
  </div>;
};

export default UserDetail;

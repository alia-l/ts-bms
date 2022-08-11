import { ProCard } from '@ant-design/pro-components';
import { Tag, Tabs, Button, Dropdown, Menu, Switch, Modal, Radio, Input, message } from 'antd';
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
import { changePhoneByUserId } from '@/services/UserService/api';

const TAB_LIST = [
  { value: '1', label: '书袋订单' },
  { value: '2', label: '订阅信息' },
  { value: '3', label: '关系记录' },
  { value: '4', label: '积分记录' },
  { value: '5', label: '优惠券记录' },
  { value: '6', label: '抽奖记录' },
];
const { TabPane } = Tabs;
const { confirm } = Modal;

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
    fetchAllowConfirm,
    fetchGetAccountListByUserId,
    fetchUnBindingPhone,
    fetchCancelPhone,
    submitLoading,
    accountList,
    detail,
  } = useModel('userModel');
  const [id, setId] = useState<number>();
  const [phone, setPhone] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);
  const [accountVisible, setAccountVisible] = useState<boolean>(false);
  const [changePhoneVisible, setChangePhoneVisible] = useState<boolean>(false);
  const [unBindAccountId, setUnBindAccountId] = useState<number>();
  const [newPhone, setNewPhone] = useState<string>('');

  useEffect(() => {
    // @ts-ignore
    const { id: userId, phone: p } = props.match.params;
    setId(userId);
    setPhone(p);
    fetchGetUserDetail(userId);
  }, []);


  const handleMenuClick = async (e: any) => {
    const { key } = e;
    switch (key) {
      case '2':
        await fetchGetAccountListByUserId(id as number);
        setAccountVisible(true);
        break;
      case '3':
        setChangePhoneVisible(true);
        break;
      default:
        break;
    }
  };

  const changeAllow = (value: boolean) => {
    if (!value) return;
    confirm({
      title: '书袋特殊操作',
      content: ' - 用户可以提前确认书袋\n' +
        '    - 超过报损时间后，仍可以报损一次\n' +
        '确定后有效时长为xx',
      async onOk() {
        await fetchAllowConfirm(id as number);
        await fetchGetUserDetail(id as number);
        setOpen(false);
      },
    });
  };

  const changeUnBindAccountId = (e: any) => {
    const { value } = e.target;
    setUnBindAccountId(value);
  };

  const handleInput = (e: any) => {
    const { value } = e.target;
    setNewPhone(value);
  };

  const confirmUnBindPhone = () => {
    confirm({
      title: '是否解绑该账号？',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        await fetchUnBindingPhone(id as number, unBindAccountId as number);
        setAccountVisible(false);
        setOpen(false)
      },
    });
  };

  const confirmChangePhone = () => {
    confirm({
      title: '是否换绑手机号？',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        const res: API.Result = await changePhoneByUserId(id as number, newPhone as string);
        if (res) {
          const { data } = res;
          if (data) {
            setChangePhoneVisible(false);
            await fetchGetUserDetail(id as number);
            message.success('操作成功');
          } else {
            message.error('操作失败');
          }
        } else {
          setChangePhoneVisible(false);
          confirm({
            title: '手机号已存在注册用户，是否要注销后绑定？',
            okText: '确定',
            cancelText: '取消',
            onOk: async () => {
              await fetchCancelPhone(id as number, newPhone as string);
              await fetchGetUserDetail(id as number);
            },
          });
        }
        setOpen(false)
      },
    });
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
    <Modal
      title='账号列表'
      visible={accountVisible}
      confirmLoading={submitLoading}
      onOk={() => confirmUnBindPhone()}
      okText='解绑'
      okType='danger'
      cancelText='取消'
      onCancel={() => setAccountVisible(false)}
      destroyOnClose={true}
    >
      <Radio.Group
        options={accountList}
        onChange={changeUnBindAccountId}
        value={unBindAccountId}
      />
    </Modal>
    <Modal
      title='换绑手机号'
      visible={changePhoneVisible}
      confirmLoading={submitLoading}
      onOk={confirmChangePhone}
      okText='换绑'
      okType='danger'
      cancelText='取消'
      onCancel={() => setChangePhoneVisible(false)}
      destroyOnClose={true}
    >
      <Input
        placeholder='请输入换绑的新手机号'
        value={newPhone}
        onChange={handleInput}
        style={{ width: 300 }}
        size='large'
      />
    </Modal>
  </div>;
};

export default UserDetail;

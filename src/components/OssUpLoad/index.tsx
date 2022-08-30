import React, { useEffect, useState } from 'react';
import { useModel } from '@@/plugin-model/useModel';
import { message, Modal, Upload } from 'antd';
import { UploadListType } from 'antd/lib/upload/interface';
import { base64encode } from '@/utils/utils';
import { PlusOutlined } from '@ant-design/icons';
import { env, OSS_UPLOAD_HOST } from '@/conf/conf';
import type { RcFile } from 'antd/es/upload';


export  type MEDIA_TYPE = 'img' | 'audio' | 'video' | 'file';

export type OssInfoProps = {
  path: string
  listType: UploadListType
  type: MEDIA_TYPE
  max: number
  onChange?: (value: any) => void
  value?: any[]
  specialUpLoadHost?: boolean
  maxSize?: number
  defaultValue?: any[]
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });


const OSSUpLoad: React.FC<OssInfoProps> = (
  {
    path,
    listType,
    onChange,
    value = [],
    specialUpLoadHost = false,
    type = 'img',
    maxSize,
    max = 99,
  },
) => {

  const { fetchGetOSSData, ossData } = useModel('index');
  const [fileValue, setFileValue] = useState<any[]>(() => {
    return value.map((it, index) => (
      {
        url: it,
        uid: index + 1,
      }
    ));
  });
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);

  useEffect(() => {
    fetchGetOSSData(path);
  }, []);

  /**
   *
   * @description 获取签名
   *
   * @param file
   */
  const getExtraData = (file: any) => {
    const { callbackUrl, accessKeyId, policy, signature } = ossData as ThirdPartyAPI.OssInfoData;
    let cbBody = JSON.stringify({
      callbackUrl,
      callbackBody: `filename=${file.name}&size=${file.size}`,
      callbackBodyType: 'application/x-www-form-urlencoded',
    });
    cbBody = base64encode(cbBody);
    return {
      policy,
      signature,
      key: file.url,
      OSSAccessKeyId: accessKeyId,
      success_action_status: '200',
      callback: cbBody,
    };
  };

  /**
   *
   * @description
   *
   * @param fileInfo
   */
  const handleChange = (fileInfo: any) => {
    const { fileList } = fileInfo;
    const changeList = fileList.map((it: any) => it.url.indexOf('http') === -1 ? `${env.CDN}${it.url}` : it.url);
    setFileValue(fileList);
    if (onChange) {
      onChange(changeList);
    }
  };

  /**
   *
   * @description 查看大图
   *
   * @param file
   */
  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    const { url } = file;
    const preview =
      url.indexOf('http') > -1 ? url : `${specialUpLoadHost ? OSS_UPLOAD_HOST.page : OSS_UPLOAD_HOST.cdn}${url}`;
    setPreviewUrl(preview || (file.preview as string));
    setPreviewVisible(true);
  };

  /**
   *
   * @description
   *
   * @param file
   */
  const transformFile = (file: any) => {
    const { dir } = ossData as ThirdPartyAPI.OssInfoData;
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    let fileName: string;
    if (specialUpLoadHost) {
      fileName = `${file.name}`;
    } else {
      fileName = `${new Date().getTime()}${Math.floor(
        Math.random() * 150,
      )}${suffix}`;
    }
    file.url = dir ? `${dir}${fileName}` : fileName;
    return file;
  };

  /**
   * @description 上传文件之前的钩子
   */
  const beforeUpload = async (file: any) => {
    const { expire } = ossData as ThirdPartyAPI.OssInfoData;
    const { size } = file;
    if ((expire && expire * 1000) < Date.now()) {
      await fetchGetOSSData(path);
    }

    if (maxSize && size && size > maxSize) {
      message.warning(
        `最大支持${(maxSize / 1024 / 1024).toFixed(0)}M，当前文件大小${(
          size /
          1024 /
          1024
        ).toFixed(0)}M`);
      return false;
    } else {
      return true;
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );

  return <div>
    <Upload
      name='file'
      action={specialUpLoadHost ? OSS_UPLOAD_HOST.hostShanghai : OSS_UPLOAD_HOST.host}
      data={getExtraData}
      listType={listType}
      fileList={fileValue}
      onChange={handleChange}
      onPreview={handlePreview}
      transformFile={transformFile}
      beforeUpload={beforeUpload}
    >
      {
        fileValue && fileValue.length < max && uploadButton
      }
    </Upload>
    <Modal
      visible={previewVisible}
      footer={null}
      onCancel={() => {
        setPreviewVisible(false);
        setPreviewUrl('');
      }}
    >
      {
        type === 'img' && <img style={{ width: '100%' }} src={previewUrl} alt='img' />
      }
      {
        type === 'audio' && <audio style={{ width: '100%' }} controls src={previewUrl} />
      }
      {
        type === 'video' && <video style={{ width: '100%' }} controls src={previewUrl} />
      }
    </Modal>
  </div>;
};
export default OSSUpLoad;

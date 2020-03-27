import { Modal, Button, message, Spin, Input } from 'antd';
import React, { useState } from 'react';

const ClusterModal = props => {
    const [visible, setVisible] = useState(false);
    const [clusterName, setClusterName] = useState("");
    const [loading, setLoading] = useState(false);
    const {isShow, ips, saveCluster, refreshClusterList} = props;
    if(!isShow){
      return null;
    }

    const onOk = () => {
      saveCluster({clusterName, ips}).then(rep => {
            if(!rep || rep.status!==200){
                message.error(`保存失败:clusterName=${clusterName},ips=${ips}`);
            } else{
                message.success('保存成功');
                refreshClusterList();
            }
            setLoading(false);
            setVisible(false);
        });
        setLoading(true);
    }

    return (
      <div>
        <Button type="primary" onClick={()=>setVisible(true)}>
          保存
        </Button>
        <Modal
          title="Modal"
          visible={visible}
          onOk={onOk}
          onCancel={()=>setVisible(false)}
          okText="确认"
          cancelText="取消"
        >
          clusterName:<Input value={clusterName} onChange={event => setClusterName(event.target.value)}></Input>
          <Spin spinning={loading}></Spin>
        </Modal>
      </div>
    );
}

export default ClusterModal;
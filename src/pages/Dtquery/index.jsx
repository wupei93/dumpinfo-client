import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin, Row, Col, Divider, Input, Select } from 'antd';
import { queryClusterList } from './service.js';
import styles from './index.less';
import UrlGrid from './UrlGrid';

const Dtquery = () => {
  const [loading, setLoading] = useState(true);
  const [clusterIps, setClusterIps] = useState("");
  const [chunkId, setChunkId] = useState('');
  const [objectId, setObjectId] = useState('');
  const [dtId, setDtId] = useState('');
  const [vdc, setVdc] = useState('');
  const [clusterOptionList, setClusterOptionList] = useState([]);
  const generateChunkUrl = chunkId => {
    return clusterIps.split(" ").map(ip =>{
      return "http://".concat(ip)
                      .concat(":9101/diagnostic/CT/1/DumpAllKeys/CHUNK?showvalue=gpb&chunkId=")
                      .concat(chunkId);
    })
  }
  const generateRRUrl = chunkId => {
    return clusterIps.split(" ").map(ip =>{
      return "http://".concat(ip)
                      .concat(":9101/diagnostic/RR/0/DumpAllKeys/REPO_REFERENCE?chunkId=")
                      .concat(chunkId);
    })
  }
  const generateObjectUrl = objectId => {
    return clusterIps.split(" ").map(ip =>{
      return "http://".concat(ip)
                      .concat(":9101/diagnostic/OB/0/DumpAllKeys/OBJECT_TABLE_KEY?showvalue=gpb&objectId=")
                      .concat(objectId);
    })
  }
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  useEffect(() => {
    queryClusterList().then(rep => {
      if(!rep || !rep.data){
        return;
      }
      const clusterOptions = rep.data.map(d => (
        <Option key={d.clusterName} value={d.ips}>
          {d.clusterName}
        </Option>
      ));
      return setClusterOptionList(clusterOptions);
    });
  }, ['onConstruct']);
  return (
    <PageHeaderWrapper content="根据IP生成常用的dtquery链接" className={styles.main}>
      <div>
        <Divider
          orientation="left"
          style={{
            color: '#333',
            fontWeight: 'normal',
          }}
        >
          Cluster
        </Divider>
        <Row gutter={10}>
          <Col flex="none">
            <label>ClusterName</label>
          </Col>
          <Col flex="200px">
            <Select
              showSearch
              style={{
                width: 200,
              }}
              placeholder="选择cluster或手动输入ip"
              optionFilterProp="children"
              onChange={value => setClusterIps(value)}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {clusterOptionList}
            </Select>
          </Col>
          <Col flex="none">
            <label>master node</label>
          </Col>
          <Col flex="400px">
            <Input
              placeholder="example：10.243.20.15 10.243.20.55 10.243.20.95"
              value={clusterIps}
              onChange={event => setClusterIps(event.target.value)}
            />
          </Col>
        </Row>
        <Divider
          orientation="left"
          style={{
            color: '#333',
            fontWeight: 'normal',
          }}
        >
          可选查询参数
        </Divider>
        <Row gutter={10}>
          <Col flex="65px">
            <label>chunkId</label>
          </Col>
          <Col flex="400px">
            <Input value={chunkId} onChange={event => setChunkId(event.target.value)} />
          </Col>
        </Row>
        <Row gutter={10}>
          <Col flex="65px">
            <label>objectId</label>
          </Col>
          <Col flex="400px">
            <Input value={objectId} onChange={event => setObjectId(event.target.value)} />
          </Col>
        </Row>
        <Row gutter={10}>
          <Col flex="65px">
            <label>dtId</label>
          </Col>
          <Col flex="400px">
            <Input value={dtId} onChange={event => setDtId(event.target.value)} />
          </Col>
        </Row>
        <Row gutter={10}>
          <Col flex="65px">
            <label>vdc </label>
          </Col>
          <Col flex="400px">
            <Input value={vdc} onChange={event => setVdc(event.target.value)} />
          </Col>
        </Row>
      </div>
      <UrlGrid title="Chunk" urlList={generateChunkUrl(chunkId)} isShow={clusterIps&&chunkId}/>
      <UrlGrid title="RR" urlList={generateRRUrl(chunkId)} isShow={clusterIps&&chunkId}/>
      <UrlGrid title="Object" urlList={generateObjectUrl(objectId)} isShow={clusterIps&&objectId}/>
      <div
        style={{
          paddingTop: 100,
          textAlign: 'center',
        }}
      >
        <Spin spinning={loading} size="large" />
      </div>
    </PageHeaderWrapper>
  );
};

export default Dtquery;

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin, Row, Col, Divider, Input, Select, Switch, Tooltip} from 'antd';
import { queryClusterList, saveCluster, queryVDCs} from './service.js';
import styles from './index.less';
import UrlGrid from './UrlGrid';
import InfoGrid from './InfoGrid';
import ClusterModal from './ClusterModal';

const Dtquery = () => {
  const [loading, setLoading] = useState(true);
  const [cluster, setCluster] = useState({});
  const [chunkId, setChunkId] = useState('');
  const [objectId, setObjectId] = useState('');
  const [dtId, setDtId] = useState('');
  const [vdc, setVdc] = useState('');
  const [needProxy, setNeedProxy] = useState(false);
  const [clusterList, setClusterList] = useState([]);
  const [clusterOptionList, setClusterOptionList] = useState([]);
  const [vdcList, setVdcList] = useState([]);
  const generateChunkUrl = chunkId => {
    const {ips=""} = cluster;
    return ips.split(" ").map(ip =>{
      return "http://".concat(ip)
                      .concat(":9101/diagnostic/CT/1/DumpAllKeys/CHUNK?showvalue=gpb&chunkId=")
                      .concat(chunkId);
    })
  }
  const generateRRUrl = chunkId => {
    const {ips=""} = cluster;
    return ips.split(" ").map(ip =>{
      return "http://".concat(ip)
                      .concat(":9101/diagnostic/RR/0/DumpAllKeys/REPO_REFERENCE?chunkId=")
                      .concat(chunkId);
    })
  }
  const generateObjectUrl = objectId => {
    const {ips=""} = cluster;
    return ips.split(" ").map(ip =>{
      return "http://".concat(ip)
                      .concat(":9101/diagnostic/OB/0/DumpAllKeys/OBJECT_TABLE_KEY?showvalue=gpb&objectId=")
                      .concat(objectId);
    })
  }
  const generateJRUrl = () => {
    const {ips=""} = cluster;
    return ips.split(" ").map(ip =>{
      return "http://".concat(ip)
                      .concat(":9101/diagnostic/PR/1/DumpAllKeys/DIRECTORYTABLE_RECORD?type=JOURNAL_REGION&showvalue=gpb&dtId=")
                      .concat(dtId).concat("&zone=").concat(vdc);
    })
  }
  const generateJounalContentUrl = () => {
    const {ips=""} = cluster;
    return ips.split(" ").map(ip =>{
      return "http://".concat(ip)
                      .concat(":9101/journalcontent/")
                      .concat(dtId).concat("?zone=").concat(vdc);
    })
  }
  const generateBIUrl = () => {
    const {ips=""} = cluster;
    return ips.split(" ").map(ip =>{
      return "http://".concat(ip)
                      .concat(":9101/diagnostic/PR/1/DumpAllKeys/DIRECTORYTABLE_RECORD?type=BPLUSTREE_INFO&showvalue=gpb&dtId=")
                      .concat(dtId).concat("&zone=").concat(vdc);
    })
  }
  const generateCleanupJobUrl = () => {
    if(!dtId || dtId.indexOf("_OB_") == -1){
      return;
    }
    const {ips=""} = cluster;
    return ips.split(" ").map(ip =>
      `http://${ip}:9101/${dtId}/DELETE_JOB_TABLE_KEY?type=CLEANUP_JOB&objectId=XX`)
  }
  const generatePartialCleanupJobUrl = () => {
    if(!dtId || dtId.indexOf("_OB_") == -1){
      return;
    }
    const {ips=""} = cluster;
    return ips.split(" ").map(ip =>
      `http://${ip}:9101/${dtId}/DELETE_JOB_TABLE_KEY?type=PARTIALGC_CLEANUP_JOB&objectId=XX`)
  }
  const generateDeleteAllJobUrl = () => {
    if(!dtId || dtId.indexOf("_OB_") == -1){
      return;
    }
    const {ips=""} = cluster;
    return ips.split(" ").map(ip =>
      `http://${ip}:9101/${dtId}/DELETE_JOB_TABLE_KEY?type=DELETE_ALL_INDICES_JOB&objectId=XX`)
  }
  const refreshClusterList = () => {
    queryClusterList().then(rep => {
      if(!rep || !rep.data){
        return;
      }
      const clusterOptions = rep.data.map(d => (
        <Option key={d.clusterName} value={d.ips}>
          {d.clusterName}
        </Option>
      ));
      setLoading(false);
      setClusterOptionList(clusterOptions);
      return setClusterList(rep.data);
    });
  }
  useEffect(() => {
    refreshClusterList();
  }, []);
  useEffect(() => {
    queryVDCs(cluster.ips).then(rep => {
      if(rep && rep.status==200){
        setVdcList(rep.data);
      }
    });
  }, [cluster.ips]);
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
              loading={loading}
              value={cluster.clusterName}
              placeholder="选择cluster或手动输入ip"
              optionFilterProp="children"
              onChange={(value, option) => setCluster(
                {
                  clusterName: option.key,
                  ips: option.value
                }
                )}
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
              value={cluster.ips}
              onChange={event => {
                const ips = event.target.value;
                let cls = {ips};
                clusterList.forEach(cluster => {
                  if(cluster.ips == ips){
                      cls = cluster;
                  }
                })
                setCluster(cls);
              }}
            />
          </Col>
          <Col>
            <ClusterModal isShow={cluster.ips&&!cluster.clusterName} ips={cluster.ips} saveCluster={saveCluster} refreshClusterList={refreshClusterList}></ClusterModal>
          </Col>
        </Row>
        <Row gutter={[10,10]}>
          <Col flex="none">启用代理</Col>
          <Tooltip title="使用代理的方式访问未开启9101端口的cluster">
            <Col flex="50px">
              <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked={false} onChange={checked => setNeedProxy(checked)}/>
            </Col>
          </Tooltip>
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
      <InfoGrid title="VDC" infoList={vdcList}></InfoGrid>
      <UrlGrid title="Chunk" urlList={generateChunkUrl(chunkId)} isShow={cluster.ips&&chunkId} needProxy={needProxy}/>
      <UrlGrid title="RR" urlList={generateRRUrl(chunkId)} isShow={cluster.ips&&chunkId} needProxy={needProxy}/>
      <UrlGrid title="Object" urlList={generateObjectUrl(objectId)} isShow={cluster.ips&&objectId} needProxy={needProxy}/>
      <UrlGrid title="CleanupJob" urlList={generateCleanupJobUrl()} isShow={cluster.ips&&dtId.indexOf("_OB_")!=-1} needProxy={needProxy}/>
      <UrlGrid title="PartialCleanupJob" urlList={generatePartialCleanupJobUrl()} isShow={cluster.ips&&dtId.indexOf("_OB_")!=-1} needProxy={needProxy}/>
      <UrlGrid title="DeleteAllJob" urlList={generateDeleteAllJobUrl()} isShow={cluster.ips&&dtId.indexOf("_OB_")!=-1} needProxy={needProxy}/>
      <UrlGrid title="JOURNAL_REGION" urlList={generateJRUrl()} isShow={cluster.ips&&dtId&&vdc} needProxy={needProxy}/>
      <UrlGrid title="JounalContent" urlList={generateJounalContentUrl()} isShow={cluster.ips&&dtId&&vdc} needProxy={needProxy}/>
      <UrlGrid title="BPLUSTREE_INFO" urlList={generateBIUrl()} isShow={cluster.ips&&dtId&&vdc} needProxy={needProxy}/>
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

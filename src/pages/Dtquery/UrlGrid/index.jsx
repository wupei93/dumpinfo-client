import React from 'react';
import { Row, Col, Divider, Button } from 'antd';
import styles from './index.less';
import proxy from '@/../config/proxy.js';


const UrlGrid = props => {
  const { title, urlList=[], isShow, needProxy=false } = props;
  if(!isShow){
    return null;
  }
  const {proxyUrl} = proxy;
  const urls = urlList.map(url => <Row><a target="view_window" href={proxyUrl(needProxy,url)}>{url}</a></Row>);
  const openAll = () => {
    urlList.forEach(url => window.open(proxyUrl(needProxy,url), '_blank').location)
  }
  return (
      <div>
        <Divider
          orientation="left"
          style={{
            color: '#333',
            fontWeight: 'normal',
          }}
        >
          {title}
        </Divider>
        <Row><Button onClick={openAll}>打开全部</Button></Row>
        {urls}
      </div>
  );
};

export default UrlGrid;
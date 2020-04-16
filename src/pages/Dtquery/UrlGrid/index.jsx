import React from 'react';
import { Row, Divider, Button, Spin } from 'antd';
import proxy from '@/../config/proxy.js';


const UrlGrid = props => {
  const { title, urlList=[], isShow, needProxy=false } = props;
  if(!isShow){
    return null;
  }
  const {proxyUrl} = proxy;
  const urls = urlList.map(url => <Row><a target="_blank" href={proxyUrl(needProxy,url)}>{url}</a></Row>);
  const openAll = () => {
    urlList.forEach(url => window.open(proxyUrl(needProxy,url), '_blank').location)
  }
  const openAllButton = urls&&urls.length>1 ? <Row><Button onClick={openAll}>打开全部</Button></Row> : null;
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
        {openAllButton}
        {urls}
        <Spin spinning={!urls || urls.length == 0} size="large" />
      </div>
  );
};

export default UrlGrid;
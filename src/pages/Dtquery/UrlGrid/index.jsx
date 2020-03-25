import React from 'react';
import { Row, Col, Divider, Button } from 'antd';
import styles from './index.less';

function proxyUrl(needProxy,url) {
  if(!needProxy){
    return url;
  }
  const host = url.substring(7, url.indexOf(':9101'));
  const path = url.substring(url.indexOf(':9101')+5);
  return 'http://localhost:8881/proxy'.concat(path)
    .concat(path.indexOf('?') !== -1 ? '&':'?')
    .concat("host=").concat(host);
}

const UrlGrid = props => {
  const { title, urlList=[], isShow, needProxy=false } = props;
  const urls = urlList.map(url => <Row><a target="view_window" href={proxyUrl(needProxy,url)}>{url}</a></Row>);
  const openAll = () => {
    urlList.forEach(url => window.open(proxyUrl(needProxy,url), '_blank').location)
  }
  if(!isShow){
    return null;
  }
  return (
      <div style={{display:isShow}}>
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
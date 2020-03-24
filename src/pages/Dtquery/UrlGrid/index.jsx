import React from 'react';
import { Row, Col, Divider, Button } from 'antd';
import styles from './index.less';


const UrlGrid = props => {
  const { title, urlList=[], isShow } = props;
  const urls = urlList.map(url => <Row><a target="view_window" href={url}>{url}</a></Row>);
  const openAll = () => {
    urlList.forEach(url => window.open(url, '_blank').location)
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
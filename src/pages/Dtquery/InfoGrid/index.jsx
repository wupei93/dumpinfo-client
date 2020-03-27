import React from 'react';
import { Row, Col, Divider } from 'antd';

const InfoGrid = props => {
  const { title, infoList=[]} = props;
  if(!infoList||!infoList.length){
    return null;
  }
  const vdcList = infoList.map(info => <Row gutter={10}><Col style={{ color: '#333'}} flex="none">{info.left.concat(":\u00A0\u00A0\u00A0")}</Col><Col flex="none">{info.right}</Col></Row>);
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
        {vdcList}
      </div>
  );
};

export default InfoGrid;
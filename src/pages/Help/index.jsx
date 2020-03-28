import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Divider, Row } from 'antd';
import styles from './index.less';

export default () => {
  return (
    <PageHeaderWrapper content={'使用说明'} className={styles.main}>
      <div>
        <Divider
          orientation="left"
          style={{
            color: '#333',
            fontWeight: 'normal',
          }}
        >
          {'Cluster'}
        </Divider>
        <Row>
          {'如果要使用的cluster下拉框中没有，则手动在后面的master node输入框中填入mater ip即可（空格分隔），即使不保存，接下来也可以查询'}
        </Row>
        <Divider
          orientation="left"
          style={{
            color: '#333',
            fontWeight: 'normal',
          }}
        >
          {'代理'}
        </Divider>
        <Row>
          {'将原请求 http://{ip}:9101/{url} 改写为 http://10.247.99.224:8881/proxy/{url}&host={ip} 即可以代理的方式访问'}
        </Row>
        <Divider
          orientation="left"
          style={{
            color: '#333',
            fontWeight: 'normal',
          }}
        >
          {'可选查询参数'}
        </Divider>
        <Row gutter={[0,10]}>
          {'1、 不需要所有的都填，但只会显示已提供信息下能够确认的链接，比提供chunkId就会显示相应的查询CHUNK和RR的url，提供dtId和vdc就会显示JOURNAL_REGION、dump journalcontent的baseUrl等等'}
        </Row>
        <Row>
          {'2、 特别说明：chunk相关的url只会显示local zone的url（因为dtquery提供了接口可以查询chunk属于哪个dt哪个zone），因此该url会经过后端查询后返回，而其他如查询object的url是前端实时生成3个zone的url，可以手动点击各链接逐个查看，也可以点击打开全部按钮打开全部链接（确保浏览器不会拦截弹窗）'}
        </Row>
      </div>
    </PageHeaderWrapper>
  );
};

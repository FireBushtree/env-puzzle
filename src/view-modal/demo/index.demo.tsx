import React, {useState} from 'react';
import {ViewModal} from 'env-puzzle';
import {Button} from 'antd';

const ViewModalDemo: React.FC = () => {
  const [showView, setShowView] = useState(false);

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setShowView(true);
        }}
      >
        查看详情
      </Button>

      <ViewModal
        title="查看"
        visible={showView}
        onCancel={() => {
          setShowView(false);
        }}
      >
        <div data-title="基本信息" />
        <div data-label="姓名">小葡萄</div>
        <div data-label="年龄">7个月</div>
        <div data-label="学号">32号</div>
        <div data-label="班级">一年级(15班)</div>
        <div data-label="备注" data-span="24">
          你说你要走了，我突然觉得不错因为挺自由，可第二天一睁开眼我知道自己梦见你了，
          你抱我抓我的手笑的很开心，我躺床上动也不敢动，怕自己把这感觉忘了，
          因为我知道这辈子我再也不会有这感觉了，我好想你，我想哭，
          我想告诉全世界我再也没有你了。
        </div>

        <div>aaa</div>
      </ViewModal>
    </>
  );
};

export default ViewModalDemo;

import * as React from 'react';
import {Scroll} from 'envd';

const ScrollDemo: React.FC = () => {
  return (
    <div style={{display: 'flex'}}>
      <div
        style={{
          flex: 1,
          height: 400,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Scroll style={{flex: 1}}>
          {new Array(20).fill({}).map((item, index) => (
            <div key={index}>{index + 1}</div>
          ))}
        </Scroll>
      </div>

      <div
        style={{
          flex: 1,
        }}
      >
        <Scroll style={{height: 200}}>
          {new Array(20).fill({}).map((item, index) => (
            <div key={index}>{index + 1}</div>
          ))}
        </Scroll>
      </div>
    </div>
  );
};

export default ScrollDemo;

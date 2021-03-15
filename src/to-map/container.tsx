import {Button, Col, Drawer, Empty, Input, List, Modal, Row} from 'antd';
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import React, {
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle,
} from 'react';
import BMap, {Point} from '../b-map';
import classnames from 'classnames';

export interface ExportAttributes {
  map: any;
  setCenter: (value: Point) => any;
}

export interface ContainerProps {
  center?: Point;
  /**
   * 当地图实例创建完毕后的回调
   */
  onMapCreate?: (map: any) => any;
  /**
   * 组件顶部额外的按钮元素
   */
  headerBtns?: React.ReactNode;

  onOk?: () => any;

  /**
   * 当点位切换时的事件
   */
  onChange?: (point: Point) => any;

  /**
   * 子元素
   */
  children: React.ReactNode;
}

const Container: React.ForwardRefRenderFunction<
  ExportAttributes,
  ContainerProps
> = (props: ContainerProps, ref) => {
  const {headerBtns, onChange, onMapCreate, children, onOk} = props;

  /**
   * 地图实例
   */
  const [map, setMap] = useState<any>();

  /**
   * 搜索关键字
   */
  const [keyword, setKeyword] = useState<string>();

  /**
   * 是否显示地图
   */
  const [showMap, setShowMap] = useState(false);

  /**
   * 是否显示搜索结果列表
   */
  const [showDrawer, setShowDrawer] = useState(false);

  /**
   * 当前选中的搜索结果
   */
  const [currentPoint, setCurrentPoint] = useState<any>();

  /**
   * 地图中心点
   */
  const [center, setCenter] = useState<Point>(props.center);

  /**
   * 搜索区域实例
   */
  const [localSearch, setLocalSearch] = useState<any>();

  /**
   * 搜索区域结果列表
   */
  const [searchResult, setShowSearchResult] = useState<Array<any>>([]);

  useEffect(() => {
    if (!currentPoint) {
      return;
    }

    const {lng, lat} = currentPoint.point;
    setCenter({lng, lat});
  }, [currentPoint]);

  const handlePointMove = (point: Point) => {
    onChange && onChange(point);
  };

  useImperativeHandle(ref, () => ({
    map,
    setCenter,
  }));

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setShowMap(true);
        }}
      >
        <SearchOutlined />
        去地图
      </Button>

      <Modal
        onOk={() => {
          onOk();
          setShowMap(false);
        }}
        onCancel={() => {
          setShowMap(false);
        }}
        width="calc(100% - 200px)"
        visible={showMap}
        className="env-to-map-modal"
        title="定位"
      >
        <Row className="env-to-map-modal-header" gutter={10}>
          <Col span={4}>
            <Input
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              allowClear
              placeholder="请输入关键字"
            />
          </Col>
          <Col className="env-to-map-modal-header-btns" span={4}>
            <Button
              type="primary"
              onClick={() => {
                setCurrentPoint(undefined);
                setShowDrawer(true);
                localSearch.search(keyword);
              }}
            >
              <SearchOutlined />
              查询
            </Button>
            {headerBtns}
          </Col>
        </Row>

        <div className="env-to-map-modal-map-container">
          <div className="env-to-map-modal-btn-open">
            <div className="env-to-map-modal-btn-open-inner">
              <DoubleRightOutlined
                onClick={() => {
                  setShowDrawer(true);
                }}
                style={{cursor: 'pointer'}}
              />
            </div>
          </div>

          <Drawer
            mask={false}
            className="env-to-map-drawer"
            title={
              <div className="env-to-map-drawer-header">
                查询结果{' '}
                <DoubleLeftOutlined
                  onClick={() => {
                    setShowDrawer(false);
                  }}
                  className="env-to-map-drawer-back"
                />
              </div>
            }
            placement="left"
            closable={false}
            onClose={() => {
              setShowDrawer(false);
            }}
            visible={showDrawer}
            getContainer={false}
            style={{position: 'absolute'}}
          >
            {searchResult.length === 0 ? (
              <Empty className="env-to-map-drawer-empty" />
            ) : (
              <List size="small">
                {searchResult.map((item, index) => (
                  <List.Item
                    className={classnames({
                      'is-active':
                        currentPoint && item.address === currentPoint.address,
                    })}
                    onClick={() => {
                      setCurrentPoint(item);
                    }}
                    key={index}
                  >
                    {item.title}
                  </List.Item>
                ))}
              </List>
            )}
          </Drawer>

          <BMap
            center={center}
            onCreate={(map: any) => {
              setMap(map);
              onMapCreate && onMapCreate(map);

              const localSearch = new window.BMap.LocalSearch(map, {
                // 智能搜索
                onSearchComplete: (result: any) => {
                  setShowSearchResult(result?.Br || []);
                },
              });
              setLocalSearch(localSearch);
            }}
            style={{height: 500, zIndex: 1}}
          >
            {searchResult.map((item) => (
              <BMap.Marker
                icon={{
                  url: require('./images/icon-area.png'),
                  width: 32,
                  height: 32,
                }}
                offset={{
                  width: 0,
                  height: -16,
                }}
                onClick={() => {
                  handlePointMove({
                    lng: item.point.lng,
                    lat: item.point.lat,
                  });
                }}
                key={item.address}
                lng={item.point.lng}
                lat={item.point.lat}
              />
            ))}

            {currentPoint && (
              <BMap.Marker
                zIndex={1}
                onDragend={() => {
                  onChange({
                    ...currentPoint.point,
                  });
                }}
                lng={currentPoint.point.lng}
                lat={currentPoint.point.lat}
              >
                <div className="env-to-map-drawer-area-tip">
                  {currentPoint.title}
                </div>
              </BMap.Marker>
            )}

            {children}
          </BMap>
        </div>
      </Modal>
    </>
  );
};

export default forwardRef(Container);

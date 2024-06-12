import { useState } from 'react';
import classNames from '../../utils/classNames';
import { Modal, Tabs } from 'antd';

import { deepClone } from '../../utils/helpers';
import ColorPicker from '../ColorPicker';
import PaddingSettings from './PaddingSettings';
import { useEmailEditorContext } from '../../hooks/useEmailEditorContext';
import useLayout from '../../hooks/useStyleLayout';
import useDataSource from '../../hooks/useDataSource';
import { COLUMN_TYPE_ENUM } from '../../constants/columnType';
import { PaddingConfig } from '../../types/Block';

const ColumnStyleSettings = () => {
  const { currentItem, previewMode } = useEmailEditorContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentColumnType, setCurrentColumnType] = useState<COLUMN_TYPE_ENUM | null>(null);
  const { findStyleItem, cardItemElement, updateItemStyles, colorChange, paddingChange } =
    useLayout();
  const { columnsSetting } = useDataSource();

  const columnChange = (type: COLUMN_TYPE_ENUM) => () => {
    if (!currentItem) return;

    if (currentItem.data.children.length > columnsSetting[type].children.length) {
      setIsModalOpen(true);
      setCurrentColumnType(type);
      return;
    }
    const newColumnConfig = columnsSetting[type];
    const newData = {
      ...currentItem.data,
      ...newColumnConfig,
      children: newColumnConfig.children.map((item, index) => {
        let newItem = item;
        if (currentItem.data.children[index]) {
          newItem = { ...currentItem.data.children[index], width: item.width };
        }
        return { ...newItem };
      }),
    };
    updateItemStyles(newData);
  };

  const handleOk = () => {
    if (!currentColumnType) return;
    if (!currentItem) return;

    const newColumnConfig = columnsSetting[currentColumnType];
    const newData = {
      ...currentItem.data,
      ...newColumnConfig,
      children: newColumnConfig.children.map((item, index) => {
        let newItem = item;
        if (currentItem.data.children[index]) {
          newItem = { ...currentItem.data.children[index], width: item.width };
        }
        return { ...newItem };
      }),
    };
    updateItemStyles(newData);
    setIsModalOpen(false);
    setCurrentColumnType(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columnList = [
    {
      key: COLUMN_TYPE_ENUM.FULL,
      widths: ['100%'],
    },
    {
      key: COLUMN_TYPE_ENUM['1-1'],
      widths: ['50%', '50%'],
    },
    {
      key: COLUMN_TYPE_ENUM['1-1-1'],
      widths: ['33.33%', '33.33%', '33.33%'],
    },
    {
      key: COLUMN_TYPE_ENUM['1-1-1-1'],
      widths: ['25%', '25%', '25%', '25%'],
    },
    {
      key: COLUMN_TYPE_ENUM['1-2'],
      widths: ['33.33%', '66.66%'],
    },
    {
      key: COLUMN_TYPE_ENUM['2-1'],
      widths: ['66.66%', '33.33%'],
    },
    {
      key: COLUMN_TYPE_ENUM['2-4-2-4'],
      widths: ['16.66%', '33.33%', '16.66%', '33.33%'],
    },
    {
      key: COLUMN_TYPE_ENUM['4-2-4-2'],
      widths: ['33.33%', '16.66%', '33.33%', '16.66%'],
    },
  ];

  const changeColumnList = (key: string, index: number) => (value: string | number) => {
    if (!currentItem) return;

    const newData = deepClone(currentItem.data);
    newData.children[index].styles[previewMode][key] = value;
    updateItemStyles(newData);
  };

  const changePaddingStyle = (index: number) => (padding: PaddingConfig) => {
    if (!currentItem) return;

    const newData = deepClone(currentItem.data);
    newData.children[index].styles[previewMode] = {
      ...newData.children[index].styles[previewMode],
      ...padding,
    };
    updateItemStyles(newData);
  };

  const columnListElement = () => {
    return (
      <>
        <div className='right-setting-block-item-title'>Columns</div>
        <div>
          {columnList.map((item, index) => {
            return (
              <div
                className={classNames(
                  currentItem?.data.type === item.key
                    ? 'column-item-active'
                    : 'column-item-un_active',
                  'column-item',
                )}
                key={index}
                onClick={columnChange(item.key)}
              >
                {item.widths.map((width, index) => {
                  const isLast = index === item.widths.length - 1;
                  return (
                    <span
                      key={index}
                      style={{ width }}
                      className={classNames(
                        isLast ? '' : 'column-item-border-right',
                        currentItem?.data.type === item.key
                          ? 'column-item-active'
                          : 'column-item-un_active',
                        'height-full',
                      )}
                    ></span>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  };

  const columnContentElement = () => {
    return (
      <>
        <div className='right-setting-block-item-title'>Column Settings</div>
        <Tabs
          defaultActiveKey='1'
          animated={{
            inkBar: true,
            tabPane: true,
          }}
          items={currentItem?.data.children.map((item, index) => {
            const key = index + 1;
            const backgroundColor = findStyleItem(item.styles, 'backgroundColor');
            return {
              label: `Column ${key}`,
              key: String(key),
              children: (
                <>
                  {cardItemElement(
                    'Content Background Color',
                    <ColorPicker
                      color={String(backgroundColor)}
                      setColor={({ hex }) => changeColumnList('backgroundColor', index)(hex)}
                    />,
                  )}
                  <PaddingSettings
                    padding={{
                      paddingTop: Number(findStyleItem(item.styles, 'paddingTop')) || 0,
                      paddingRight: Number(findStyleItem(item.styles, 'paddingRight')) || 0,
                      paddingLeft: Number(findStyleItem(item.styles, 'paddingLeft')) || 0,
                      paddingBottom: Number(findStyleItem(item.styles, 'paddingBottom')) || 0,
                    }}
                    setPadding={changePaddingStyle(index)}
                  />
                </>
              ),
            };
          })}
        />
      </>
    );
  };

  const columnStylesElement = () => {
    const backgroundColor = findStyleItem(currentItem?.data.styles, 'backgroundColor');
    const contentBackground = findStyleItem(currentItem?.data.styles, 'contentBackground');
    return (
      <>
        <div className='right-setting-block-item-title'>Column Styles</div>
        {cardItemElement(
          'Background Color',
          <ColorPicker
            color={String(backgroundColor)}
            setColor={colorChange('backgroundColor')}
          />,
        )}
        {cardItemElement(
          'Content Background Color',
          <ColorPicker
            color={String(contentBackground)}
            setColor={colorChange('contentBackground')}
          />,
        )}
        <PaddingSettings
          padding={{
            paddingTop: Number(findStyleItem(currentItem?.data.styles, 'paddingTop')) || 0,
            paddingRight: Number(findStyleItem(currentItem?.data.styles, 'paddingRight')) || 0,
            paddingLeft: Number(findStyleItem(currentItem?.data.styles, 'paddingLeft')) || 0,
            paddingBottom: Number(findStyleItem(currentItem?.data.styles, 'paddingBottom')) || 0,
          }}
          setPadding={paddingChange}
        />
      </>
    );
  };

  return (
    <>
      <div className='margin-y-30'>
        {columnListElement()}
        {columnContentElement()}
        {columnStylesElement()}
      </div>
      <Modal
        title='Delete Column'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={400}
        okText={'Confirm'}
        cancelText='Cancel'
      >
        <p
          className='margin-y-30'
          dangerouslySetInnerHTML={{
            __html: `Are you sure you want to delete ${`<span class="column-modal-context">
            ${
              currentColumnType
                ? Number(currentItem?.data.children.length) -
                  columnsSetting[currentColumnType].children.length
                : 0
            }
          </span>`} extra columns?`,
          }}
        ></p>
      </Modal>
    </>
  );
};

export default ColumnStyleSettings;

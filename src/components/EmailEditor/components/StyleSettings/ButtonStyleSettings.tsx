import classNames from '../../utils/classNames';
import { InputNumber, Select, Switch, Slider, Input } from 'antd';

import ColorPicker from '../ColorPicker';
import { deepClone } from '../../utils/helpers';
import { useEmailEditorContext } from '../../hooks/useEmailEditorContext';
import useLayout from '../../hooks/useStyleLayout';
import { PaddingConfig } from '../../types/Block';
import PaddingSettings from './PaddingSettings';

const ButtonStyleSettings = () => {
  const { currentItem, previewMode } = useEmailEditorContext();
  const {
    findStyleItem,
    cardItemElement,
    colorChange,
    paddingChange,
    inputChange,
    updateItemStyles,
  } = useLayout();

  const buttonActionElement = () => {
    if (currentItem) {
      const { linkUrl } = currentItem?.data;
      const linkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        const newCurrentItem = deepClone(currentItem);
        newCurrentItem.data.linkUrl = newValue;
        updateItemStyles(newCurrentItem.data);
      };

      return (
        <div>
          <div className='right-setting-block-item-title'>Button Action</div>
          {cardItemElement('Action Type', <div className='link-tag'>Link</div>)}
          <div className='card-item-title'>Link Url</div>
          <div className='margin-top-6'>
            <Input
              addonBefore='https://'
              value={linkUrl}
              onChange={linkChange}
            />
          </div>
        </div>
      );
    }
  };

  const PaddingStylesElement = () => {
    const updateContentStylesPadding = (padding: PaddingConfig) => {
      if (currentItem) {
        const newData = deepClone(currentItem.data);
        if (!newData.contentStyles) {
          newData.contentStyles = {
            desktop: {},
            mobile: {},
          };
        }
        newData.contentStyles[previewMode] = {
          ...newData.contentStyles[previewMode],
          ...padding,
        };
        updateItemStyles(newData);
      }
    };

    return (
      <>
        <div className='right-setting-block-item-title'>Padding Settings</div>
        {currentItem && (
          <PaddingSettings
            padding={{
              paddingTop: Number(findStyleItem(currentItem.data.contentStyles!, 'paddingTop')) || 0,
              paddingRight:
                Number(findStyleItem(currentItem.data.contentStyles!, 'paddingRight')) || 0,
              paddingLeft:
                Number(findStyleItem(currentItem.data.contentStyles!, 'paddingLeft')) || 0,
              paddingBottom:
                Number(findStyleItem(currentItem.data.contentStyles!, 'paddingBottom')) || 0,
            }}
            setPadding={updateContentStylesPadding}
          />
        )}
      </>
    );
  };

  const textStylesElement = () => {
    const width = findStyleItem(currentItem?.data.styles, 'width');
    const color = findStyleItem(currentItem?.data.styles, 'color');
    const fontFamily = findStyleItem(currentItem?.data.styles, 'fontFamily');
    const fontSize = findStyleItem(currentItem?.data.styles, 'fontSize');
    const lineHeight = findStyleItem(currentItem?.data.styles, 'lineHeight');
    const backgroundColor = findStyleItem(currentItem?.data.styles, 'backgroundColor');
    const fontFamilyList = [
      'sans-serif',
      'Arial',
      '仿宋',
      '黑体',
      'Verdana',
      'Times New Roman',
      'Garamond',
      'Georgia',
      'Courier New',
      'cursive',
    ];

    return (
      <>
        <div className='right-setting-block-item-title'>Button Styles</div>
        {cardItemElement(
          'Width Auto',
          <Switch
            checked={width === 'auto'}
            className={classNames(width === 'auto' ? 'switch-active' : 'switch-disabled')}
            onChange={() => {
              const value = width === 'auto' ? '100%' : 'auto';
              inputChange('width')(value);
            }}
          />,
        )}
        {width !== 'auto' && (
          <Slider
            value={Number(width ? String(width).replace('%', '') : 0)}
            onChange={(value) => inputChange('width')(value + '%')}
          />
        )}
        {cardItemElement(
          'Font Color',
          <ColorPicker
            color={String(color) || '#000'}
            setColor={colorChange('color')}
          />,
        )}
        {cardItemElement(
          'Button Color',
          <ColorPicker
            color={String(backgroundColor)}
            setColor={colorChange('backgroundColor')}
          />,
        )}
        {cardItemElement(
          'Font Family',
          <Select
            className='input-width'
            value={fontFamily}
            onChange={inputChange('fontFamily')}
          >
            {fontFamilyList.map((item) => (
              <Select.Option
                key={item}
                value={item}
              >
                {item}
              </Select.Option>
            ))}
          </Select>,
        )}
        {cardItemElement(
          'Font Size',
          <InputNumber
            min={0}
            className='input-width'
            addonAfter='px'
            value={fontSize}
            onChange={inputChange('fontSize') as any}
          />,
        )}
        {cardItemElement(
          'Line Height',
          <InputNumber
            className='input-width'
            addonAfter='%'
            min={0}
            value={Number(lineHeight ? String(lineHeight).replace('%', '') : 100)}
            onChange={(value) => inputChange('lineHeight')(value + '%')}
          />,
        )}
        <div className='card-item-title'>Button Padding</div>
        <PaddingSettings
          padding={{
            paddingTop:
              Number(Number(findStyleItem(currentItem?.data.styles, 'paddingTop')) || 0) || 0,
            paddingRight:
              Number(Number(findStyleItem(currentItem?.data.styles, 'paddingRight')) || 0) || 0,
            paddingLeft:
              Number(Number(findStyleItem(currentItem?.data.styles, 'paddingLeft')) || 0) || 0,
            paddingBottom:
              Number(Number(findStyleItem(currentItem?.data.styles, 'paddingBottom')) || 0) || 0,
          }}
          setPadding={paddingChange}
        />
      </>
    );
  };
  return (
    <div className='margin-y-30'>
      {buttonActionElement()}
      {textStylesElement()}
      {PaddingStylesElement()}
    </div>
  );
};

export default ButtonStyleSettings;

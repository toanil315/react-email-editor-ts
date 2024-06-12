import classNames from '../../utils/classNames';
import { InputNumber, Select } from 'antd';

import ColorPicker from '../ColorPicker';
import PaddingSettings from './PaddingSettings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAlignCenter,
  faAlignLeft,
  faAlignRight,
  faAlignJustify,
} from '@fortawesome/free-solid-svg-icons';
import { useEmailEditorContext } from '../../hooks/useEmailEditorContext';
import useLayout from '../../hooks/useStyleLayout';

const TextStyleSettings = () => {
  const { currentItem } = useEmailEditorContext();
  const {
    findStyleItem,
    cardItemElement,
    colorChange,
    paddingChange,
    otherStylesChange,
    inputChange,
  } = useLayout();

  const PaddingStylesElement = () => {
    return (
      <>
        <div className='right-setting-block-item-title'>Padding Settings</div>
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

  const textStylesElement = () => {
    const color = findStyleItem(currentItem?.data.styles, 'color');
    const textAlign = findStyleItem(currentItem?.data.styles, 'textAlign');
    const fontFamily = findStyleItem(currentItem?.data.styles, 'fontFamily');
    const fontSize = findStyleItem(currentItem?.data.styles, 'fontSize');
    const lineHeight = findStyleItem(currentItem?.data.styles, 'lineHeight');
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
        <div className='right-setting-block-item-title'>Text Styles</div>
        {cardItemElement(
          'Font Color',
          <ColorPicker
            color={String(color)}
            setColor={colorChange('color')}
          />,
        )}
        {cardItemElement(
          'Text Align',
          <div className='flex justify-center items-center'>
            {[
              { icon: faAlignLeft, value: 'left' },
              { icon: faAlignCenter, value: 'center' },
              { icon: faAlignRight, value: 'right' },
              { icon: faAlignJustify, value: 'justify' },
            ].map(({ icon, value }) => {
              return (
                <div
                  key={value}
                  className={classNames(
                    textAlign === value ? 'align-style-item-active' : 'align-style-item-un_active',
                    'align-style-item',
                  )}
                  onClick={() => otherStylesChange('textAlign', value)}
                >
                  <FontAwesomeIcon
                    icon={icon}
                    className='tag-style-size'
                  />
                </div>
              );
            })}
          </div>,
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
      </>
    );
  };
  return (
    <div className='margin-y-30'>
      {textStylesElement()}
      {PaddingStylesElement()}
    </div>
  );
};

export default TextStyleSettings;

import classNames from '../../utils/classNames';
import { InputNumber, Select, Slider } from 'antd';
import { deepClone } from '../../utils/helpers';
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
import { PaddingConfig } from '../../types/Block';

const DividerStyleSettings = () => {
  const { currentItem, previewMode } = useEmailEditorContext();

  const { findStyleItem, cardItemElement, colorChange, updateItemStyles, inputChange } =
    useLayout();

  const updateContentStylesPadding = (padding: PaddingConfig) => {
    if (!currentItem) return;

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
  };

  const updateContentTextAlign = (textAlign: string) => {
    if (!currentItem) return;

    const newData = deepClone(currentItem.data);
    if (!newData.contentStyles) {
      newData.contentStyles = {
        desktop: {},
        mobile: {},
      };
    }
    newData.contentStyles[previewMode] = {
      ...newData.contentStyles[previewMode],
      textAlign,
    };
    updateItemStyles(newData);
  };

  const dividerStyleSettings = () => {
    const textAlign = findStyleItem(currentItem?.data.contentStyles, 'textAlign');
    const width = findStyleItem(currentItem?.data.styles, 'width');
    const borderTopColor = findStyleItem(currentItem?.data.styles, 'borderTopColor');
    const borderTopWidth = findStyleItem(currentItem?.data.styles, 'borderTopWidth');
    const borderTopStyle = findStyleItem(currentItem?.data.styles, 'borderTopStyle');
    const dividerType = [
      { label: 'Solid', value: 'solid' },
      { label: 'Dotted', value: 'dotted' },
      { label: 'Dashed', value: 'dashed' },
    ];

    return (
      <>
        <div className='right-setting-block-item-title'>Divider Style'</div>
        {cardItemElement(
          'Divider Type',
          <Select
            className='input-width'
            value={borderTopStyle}
            onChange={inputChange('borderTopStyle')}
          >
            {dividerType.map((item) => (
              <Select.Option
                key={item.value}
                value={item.value}
              >
                {item.label}
              </Select.Option>
            ))}
          </Select>,
        )}
        {cardItemElement(
          'Height',
          <InputNumber
            min={0}
            className='input-width'
            addonAfter='px'
            value={borderTopWidth}
            onChange={inputChange('borderTopWidth') as any}
          />,
        )}
        {cardItemElement(
          'Divider Color',
          <ColorPicker
            color={String(borderTopColor)}
            setColor={colorChange('borderTopColor')}
          />,
        )}
        <div className='card-item-title'>Width</div>
        <Slider
          value={Number(width ? String(width).replace('%', '') : 100)}
          onChange={(value) => inputChange('width')(value + '%')}
        />
        {cardItemElement(
          'Align',
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
                  onClick={() => updateContentTextAlign(value)}
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
        <div className='card-item-title'>Padding Settings</div>
        <PaddingSettings
          padding={{
            paddingTop: Number(findStyleItem(currentItem?.data.contentStyles, 'paddingTop')) || 0,
            paddingRight:
              Number(findStyleItem(currentItem?.data.contentStyles, 'paddingRight')) || 0,
            paddingLeft: Number(findStyleItem(currentItem?.data.contentStyles, 'paddingLeft')) || 0,
            paddingBottom:
              Number(findStyleItem(currentItem?.data.contentStyles, 'paddingBottom')) || 0,
          }}
          setPadding={updateContentStylesPadding}
        />
      </>
    );
  };
  return <div className='margin-y-30'>{dividerStyleSettings()}</div>;
};

export default DividerStyleSettings;

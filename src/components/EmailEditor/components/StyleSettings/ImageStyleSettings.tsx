import classNames from '../../utils/classNames';
import { Switch, Slider, Input } from 'antd';
import { deepClone } from '../../utils/helpers';
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
import { Block, PaddingConfig } from '../../types/Block';

const ImageStyleSettings = () => {
  const { currentItem, previewMode } = useEmailEditorContext();
  const { findStyleItem, cardItemElement, inputChange, updateItemStyles } = useLayout();

  const actionSettings = () => {
    if (!currentItem) return;

    const linkUrl = currentItem.data.linkUrl;

    const linkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      const newCurrentItem = deepClone(currentItem);
      currentItem.data.linkUrl = newValue;

      updateItemStyles(newCurrentItem.data);
    };

    return (
      <>
        <div className='right-setting-block-item-title'>Image Action</div>
        {cardItemElement('Action Type', <div className='link-tag'>Link URL</div>)}
        <div className='card-item-title'>Link URL</div>
        <div className='margin-top-6'>
          <Input
            addonBefore='https://'
            value={linkUrl}
            onChange={linkChange}
          />
        </div>
      </>
    );
  };

  const imageSettings = () => {
    if (!currentItem) return;

    const { src, alt } = currentItem.data;

    const linkChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!currentItem) return;

      const newCurrentItem = deepClone(currentItem);
      (newCurrentItem.data as any)[key as keyof Block] = event.target.value;
      updateItemStyles(newCurrentItem.data);
    };

    return (
      <>
        <div className='right-setting-block-item-title'>Image Settings</div>
        <div className='card-item'>
          <div className='width-full'>
            <div className='card-item-title'>Image URL</div>
            <div className='margin-top-6'>
              <Input
                value={src}
                onChange={linkChange('src')}
              />
            </div>
          </div>
        </div>
        <div className='card-item'>
          <div className='width-full'>
            <div className='card-item-title'>Image Alt</div>
            <div className='margin-top-6'>
              <Input
                value={alt}
                onChange={linkChange('alt')}
              />
            </div>
          </div>
        </div>
      </>
    );
  };

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

  const imageStyleSettings = () => {
    const width = findStyleItem(currentItem?.data.styles, 'width');
    const textAlign = findStyleItem(currentItem?.data.contentStyles, 'textAlign');
    return (
      <>
        <div className='right-setting-block-item-title'>Image Styles</div>
        {cardItemElement(
          'Width Auto',
          <Switch
            checked={width === 'auto'}
            className={classNames(width === 'auto' ? 'bg-sky-500' : 'bg-gray-400')}
            onChange={() => {
              const value = width === 'auto' ? '100%' : 'auto';
              inputChange('width')(value);
            }}
          />,
        )}
        {width !== 'auto' && (
          <Slider
            value={Number(width ? String(width).replace('%', '') : 100)}
            onChange={(value) => inputChange('width')(value + '%')}
          />
        )}
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
  return (
    <div className='margin-y-30'>
      {actionSettings()}
      {imageSettings()}
      {imageStyleSettings()}
    </div>
  );
};

export default ImageStyleSettings;

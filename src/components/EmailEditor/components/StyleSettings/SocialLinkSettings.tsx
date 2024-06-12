import { useCallback, useRef, useState } from 'react';
import classNames from '../../utils/classNames';
import { Input, InputNumber } from 'antd';
import { throttle, deepClone } from '../../utils/helpers';
import PaddingSettings from './PaddingSettings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faPen,
  faTimes,
  faAlignCenter,
  faAlignLeft,
  faAlignRight,
  faAlignJustify,
} from '@fortawesome/free-solid-svg-icons';
import { useEmailEditorContext } from '../../hooks/useEmailEditorContext';
import useLayout from '../../hooks/useStyleLayout';
import { PaddingConfig, SocialList } from '../../types/Block';

const SocialLinkSettings = () => {
  const { currentItem, previewMode } = useEmailEditorContext();
  const { findStyleItem, paddingChange, updateItemStyles, cardItemElement } = useLayout();

  const list = currentItem?.data.list || [];
  const [sourceNode, setSourceNode] = useState<HTMLElement | null>(null);
  const [isDragStart, setIsDragStart] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [currentEditIndex, setCurrentEditIndex] = useState<number | null>(null); // 当前编辑的索引
  const socialLists = useRef<HTMLDivElement | null>(null);

  const socialList = [
    {
      image: 'https://iili.io/HMnhdkN.png',
      title: 'facebook',
      linkURL: '',
    },
    {
      image: 'https://iili.io/J9qW3Sj.png',
      title: 'Github',
      linkURL: '',
    },
    {
      image: 'https://iili.io/J9qWKHx.png',
      title: 'Linkedin',
      linkURL: '',
    },
    {
      image: 'https://iili.io/J9qWfAQ.png',
      title: 'WeiBo',
      linkURL: '',
    },
    {
      image: 'https://iili.io/J9qWqNV.png',
      title: 'Instagram',
      linkURL: '',
    },
    {
      image: 'https://iili.io/J9qWBDB.png',
      title: 'TikTok',
      linkURL: '',
    },
    {
      image: 'https://iili.io/J9qWnoP.png',
      title: 'Twitter',
      linkURL: '',
    },
    {
      image: 'https://iili.io/J9qWoV1.png',
      title: 'Youtube',
      linkURL: '',
    },
    {
      image: 'https://iili.io/J9qWxiF.png',
      title: 'WeChat',
      linkURL: '',
    },
  ];

  const updateSocialSettings = (key: string, value: SocialList[]) => {
    if (currentItem) {
      const newCurrentItem = deepClone(currentItem);
      newCurrentItem.data = {
        ...newCurrentItem.data,
        [key]: value,
      };
      updateItemStyles(newCurrentItem.data);
    }
  };

  const dragOver = useCallback(
    throttle((event: React.DragEvent) => {
      event.preventDefault();
      const listsDom = socialLists.current;
      if (!listsDom) return;
      if (!dragIndex && dragIndex !== 0) return;

      const children = Array.from(listsDom.childNodes);
      const overIndex = children.indexOf(event.target as ChildNode);

      if (overIndex === -1) return;
      const sourceIndex = dragIndex;
      const newSocialLists = deepClone(list);
      if (sourceIndex === overIndex) {
        return;
      }

      [newSocialLists[overIndex], newSocialLists[sourceIndex]] = [
        newSocialLists[sourceIndex],
        newSocialLists[overIndex],
      ];
      setDragIndex(overIndex);
      updateSocialSettings('list', newSocialLists);
    }, 50),
    [sourceNode, dragIndex],
  );

  console.log(dragIndex);

  const contentPaddingChange = (padding: PaddingConfig) => {
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

  const imageWidthChange = (value: number) => {
    if (!currentItem) return;

    const newData = deepClone(currentItem.data);
    newData.imageWidth = value;
    updateItemStyles(newData);
  };

  const PaddingStylesElement = () => {
    return (
      <>
        <div className='right-setting-block-item-title'>Padding Settings</div>
        <PaddingSettings
          padding={{
            paddingTop: Number(findStyleItem(currentItem?.data.contentStyles, 'paddingTop')) || 0,
            paddingRight:
              Number(findStyleItem(currentItem?.data.contentStyles, 'paddingRight')) || 0,
            paddingLeft: Number(findStyleItem(currentItem?.data.contentStyles, 'paddingLeft')) || 0,
            paddingBottom:
              Number(findStyleItem(currentItem?.data.contentStyles, 'paddingBottom')) || 0,
          }}
          setPadding={contentPaddingChange}
        />
      </>
    );
  };

  const socialLinkLayoutElement = () => {
    const textAlign = findStyleItem(currentItem?.data.contentStyles, 'textAlign');
    const width = currentItem?.data.imageWidth;
    return (
      <>
        <div className='right-setting-block-item-title'>Social Link Settings</div>
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
        {cardItemElement(
          'Social Link Size',
          <InputNumber
            min={0}
            className='input-width'
            addonAfter='px'
            value={width}
            onChange={imageWidthChange as any}
          />,
        )}
        <div className='card-item-title margin-top-18'>Social Links</div>
        <div
          ref={socialLists}
          onDragOver={dragOver}
          className='margin-top-12'
          onDragStart={(event) => {
            setSourceNode(event.target as HTMLElement);
            setIsDragStart(true);
            setDragIndex(Number((event.target as HTMLElement).dataset.index));
            setCurrentEditIndex(null);
          }}
          onDragEnd={() => {
            (sourceNode?.childNodes[0] as HTMLElement | null)?.classList.remove(
              'social-link-item-current',
            );
            setSourceNode(null);
            setIsDragStart(false);
            setDragIndex(null);
          }}
        >
          {list.map((item, index) => {
            const { image, title, linkURL } = item;
            return (
              <div
                key={index}
                data-index={index}
                draggable
                className={classNames(
                  'social-link-item',
                  currentEditIndex === index ? 'cursor-default' : 'cursor-grab',
                  isDragStart ? 'social-link-item-drag_start' : '',
                  dragIndex === index ? 'social-link-item-current' : 'border-transparent',
                )}
              >
                <div className='social-link-item-content'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <img
                        src={image}
                        alt={title}
                        className='social-link-item-img'
                      />
                      <div className='font-semibold'>{title}</div>
                    </div>
                    <div className='flex items-center'>
                      {currentEditIndex !== index && (
                        <div
                          className='social-link-item-icon social-link-item-icon-slate'
                          onClick={() => setCurrentEditIndex(index)}
                        >
                          <FontAwesomeIcon
                            icon={faPen}
                            className='social-link-item-icon-svg social-link-item-icon-svg-deep'
                          />
                        </div>
                      )}
                      {currentEditIndex === index && (
                        <div
                          className='social-link-item-icon social-link-item-icon-red'
                          onClick={() => setCurrentEditIndex(null)}
                        >
                          <FontAwesomeIcon
                            icon={faTimes}
                            className='social-link-item-icon-svg social-link-item-icon-svg-red'
                          />
                        </div>
                      )}
                      <div
                        className='social-link-item-icon social-link-item-icon-slate'
                        onClick={() => {
                          updateSocialSettings(
                            'list',
                            list.filter((item, idx) => idx !== index),
                          );
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className='social-link-item-icon-svg social-link-item-icon-svg-deep'
                        />
                      </div>
                    </div>
                  </div>
                  {currentEditIndex === index && (
                    <div className='margin-top-12 relative'>
                      <Input
                        addonBefore='https://'
                        value={linkURL}
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updateSocialSettings(
                            'list',
                            list.map((item, idx) => {
                              if (idx === index) {
                                return { ...item, link: e.target.value };
                              } else {
                                return item;
                              }
                            }),
                          )
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className='card-item-title margin-top-18'>Add Social Link</div>
        <div className='social-link-add margin-top-12'>
          {socialList.map((item, index) => {
            const { image, title } = item;
            return (
              <img
                src={image}
                key={index}
                alt={title}
                className='social-link-add-img'
                onClick={() => updateSocialSettings('list', (list || []).concat(item))}
              />
            );
          })}
        </div>
        <div className='card-item-title margin-top-18'>Spacing</div>
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
    <div className='margin-y-30'>
      {socialLinkLayoutElement()}
      {PaddingStylesElement()}
    </div>
  );
};

export default SocialLinkSettings;

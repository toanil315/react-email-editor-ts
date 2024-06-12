import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from '../../utils/classNames';

import {
  faColumns,
  faMinusSquare,
  faHeading,
  faFont,
  faGripLines,
  faCubes,
  faImage,
  faShareAltSquare,
} from '@fortawesome/free-solid-svg-icons';
import { deepClone } from '../../utils/helpers';

import { useEmailEditorContext } from '../../hooks/useEmailEditorContext';
import useDataSource from '../../hooks/useDataSource';
import { Block } from '../../types/Block';
import { ACTION_TYPE_ENUM } from '../../constants/actionType';

interface Props {
  clearStyles: () => void;
}

const LeftSideBar = (props: Props) => {
  const { clearStyles } = props;
  const { setCurrentItem, setIsDragStart, blockList, setActionType } = useEmailEditorContext();
  const [currentSideBarKey, setCurrentSideBarKey] = useState('blocks');
  const { blockConfigsList } = useDataSource();

  const sidebarTabsList = [
    {
      name: 'Blocks',
      icon: faCubes,
      key: 'blocks',
    },
  ];

  const icons = {
    column: faColumns,
    text: faFont,
    heading: faHeading,
    button: faMinusSquare,
    divider: faGripLines,
    image: faImage,
    social_link: faShareAltSquare,
  };

  const dragEnd = (event: React.DragEvent) => {
    const target = event.target as HTMLElement;
    target.style.border = '';
    target.children[0] && target.children[0].classList.remove('sidebar-block-move');
    setTimeout(() => {
      setIsDragStart(false);
      clearStyles();
    }, 50);
  };

  const dragStart = (item: Block) => (event: React.DragEvent) => {
    setCurrentItem({
      data: deepClone(item),
      type: ACTION_TYPE_ENUM.ADD,
      index: String(blockList.length + 1),
    });
    setIsDragStart(true);
    const target = event.target as HTMLElement;
    target.style.border = '1px dashed #ccc';
    target.children[0] && target.children[0].classList.add('sidebar-block-move');
    setActionType(ACTION_TYPE_ENUM.ADD);
  };

  const blocksElement = () => {
    return (
      <div
        className='side-bar-blocks'
        key='blocks'
      >
        <div className='side-bar-blocks-container'>
          {blockConfigsList.map((item) => {
            return (
              <div
                className='side-bar-blocks-item'
                data-block_type='header'
                draggable='true'
                key={item.key}
                onDragEnd={dragEnd}
                onDragStart={dragStart(item)}
              >
                <div className='sidebar-block'>
                  <FontAwesomeIcon
                    icon={icons[item.key as keyof typeof icons]}
                    className='sidebar-block-icon'
                  />
                  <div className='sidebar-block-text'>{item.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className='side-bar'>
      <div className='side-bar-tabs'>
        {sidebarTabsList.map((item) => {
          const { key, icon, name } = item;
          return (
            <div
              onClick={() => {
                if (key !== currentSideBarKey) {
                  setCurrentSideBarKey(key);
                }
              }}
              className={classNames(
                currentSideBarKey === key ? 'side-bar-tab-item-active' : 'side-bar-tab-item',
                'side-bar-item-default',
              )}
              key={key}
            >
              <FontAwesomeIcon
                icon={icon}
                className='text-18'
              />
              <div className='side-bar-icon-title'>{name}</div>
            </div>
          );
        })}
      </div>
      <div className='side-bar-content'>{blocksElement()}</div>
    </div>
  );
};

export default LeftSideBar;

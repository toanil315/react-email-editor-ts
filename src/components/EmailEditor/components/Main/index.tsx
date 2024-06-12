import { useCallback } from 'react';
import { throttle, deepClone } from '../../utils/helpers';

import LeftSideBar from '../LeftSideBar';
import Preview from '../Preview';
import { useEmailEditorContext } from '../../hooks/useEmailEditorContext';
import useDataSource from '../../hooks/useDataSource';
import { BLOCK_TYPE_ENUM } from '../../constants/blockType';
import { ACTION_TYPE_ENUM } from '../../constants/actionType';
import { Block } from '../../types/Block';
import RightSetting from '../RightSetting';

const Main = () => {
  const { blockList, setBlockList, currentItem, setCurrentItem, setIsDragStart } =
    useEmailEditorContext();
  const { getColumnConfig } = useDataSource();

  const defaultContentConfig: Block = {
    name: 'Drag Block Here',
    key: BLOCK_TYPE_ENUM.EMPTY,
    width: '100%',
    styles: {
      desktop: {
        backgroundColor: 'transparent',
        paddingTop: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
      },
      mobile: {},
    },
    children: [],
  };

  // 取消选中
  const blurCurrentItem = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setCurrentItem(null);
  };

  const clearLabelStyles = () => {
    const dragLabelElements = document.getElementsByClassName('block-drag-label-content');
    Array.from(dragLabelElements).forEach((item) => {
      (item.children[0] as HTMLElement).style.visibility = 'hidden';
    });
  };

  const clearContentLabelStyles = () => {
    const dragContentLabelElements = document.getElementsByClassName(
      'block-content-drag-label-content',
    );
    Array.from(dragContentLabelElements).forEach((item) => {
      (item.children[0] as HTMLElement).style.visibility = 'hidden';
    });
  };

  const onDragOver = useCallback(
    throttle((event) => {
      event.preventDefault();
      event.stopPropagation();
      const { index } = event.target.dataset;
      switch (event.target.dataset.type) {
        case 'empty-block':
          clearLabelStyles();
          clearContentLabelStyles();
          event.target.style.border = '1px dashed #2faade';
          break;

        case 'drag-over-column':
          clearContentLabelStyles();
          const dragLabelElements = document.getElementsByClassName('block-drag-label-content');
          Array.from(dragLabelElements).forEach((item) => {
            if (Number((item as HTMLElement).dataset.index) === Number(index)) {
              (item.children[0] as HTMLElement).style.visibility = 'visible';
            } else {
              (item.children[0] as HTMLElement).style.visibility = 'hidden';
            }
          });
          break;

        case 'block-item-move':
          clearLabelStyles();
          const dragBlockItemElements = document.getElementsByClassName(
            'block-content-drag-label-content',
          );
          Array.from(dragBlockItemElements).forEach((item) => {
            if ((item as HTMLElement).dataset.index === index) {
              (item.children[0] as HTMLElement).style.visibility = 'visible';
            } else {
              (item.children[0] as HTMLElement).style.visibility = 'hidden';
            }
          });
          break;

        case 'empty-block-item':
          clearLabelStyles();
          clearContentLabelStyles();
          const parentNode = event.target.parentNode;
          parentNode &&
            parentNode.classList.contains('block-empty-content') &&
            (parentNode.style.outlineStyle = 'solid');
          break;
        default:
          clearLabelStyles();
          clearContentLabelStyles();
          break;
      }
    }, 30),
    [],
  );

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const { type } = (event.target as HTMLElement).dataset;
    setIsDragStart(false);
    switch (type) {
      case 'empty-block':
        if (currentItem) {
          const newCurrentItem =
            currentItem.data.key !== BLOCK_TYPE_ENUM.COLUMN
              ? getColumnConfig(currentItem.data)
              : getColumnConfig();
          setBlockList([newCurrentItem], ACTION_TYPE_ENUM.ADD);
          setCurrentItem({ data: newCurrentItem, type: ACTION_TYPE_ENUM.EDIT, index: '0' });
        }
        break;
      case 'empty-block-item':
        clearEmptyContentStyles();
        const { index } = (event.target as HTMLElement).dataset;
        if (index) {
          const newBlockList = deepClone(blockList);
          const indexArr = index.split('-').map((item) => Number(item));
          const blockIndex = indexArr[0];
          const itemIndex = indexArr[1];
          newBlockList[blockIndex].children[itemIndex].children = currentItem?.data
            ? [currentItem.data]
            : [];
          if (currentItem?.type === ACTION_TYPE_ENUM.MOVE) {
            // Delete the original element. If the children is empty after the original element is deleted, add an empty content.
            const { index: oldIndex } = currentItem;
            const oldIndexArr = oldIndex.split('-').map((item) => Number(item));
            const oldBlockIndex = oldIndexArr[0];
            const oldItemIndex = oldIndexArr[1];
            const oldItem = newBlockList[oldBlockIndex].children[oldItemIndex];
            if (oldItem.children.length === 1) {
              newBlockList[oldBlockIndex].children[oldItemIndex].children = [defaultContentConfig];
            } else {
              newBlockList[oldBlockIndex].children[oldItemIndex].children = oldItem.children.filter(
                (_, index) => index !== Number(oldIndexArr[2]),
              );
            }
          }
          setCurrentItem(
            currentItem?.data ? { ...currentItem, type: ACTION_TYPE_ENUM.EDIT, index } : null,
          );
          setBlockList([...newBlockList], ACTION_TYPE_ENUM.MOVE);
        }
        break;
      case 'drag-over-column':
        {
          const { index } = (event.target as HTMLElement).dataset;
          if (currentItem && index) {
            const newBlockList = deepClone(blockList);
            let newCurrentItem = deepClone(currentItem);
            if (currentItem.type === ACTION_TYPE_ENUM.ADD) {
              newBlockList.splice(Number(index), 0, currentItem.data);
              newCurrentItem = { ...currentItem, type: ACTION_TYPE_ENUM.EDIT, index };
            } else if (currentItem.type === ACTION_TYPE_ENUM.MOVE) {
              const moveItem = newBlockList.splice(Number(currentItem.index), 1)[0];
              newBlockList.splice(Number(index), 0, moveItem);
              newCurrentItem = {
                ...currentItem,
                type: ACTION_TYPE_ENUM.EDIT,
                index,
              };
            }
            setCurrentItem({ ...newCurrentItem });
            setBlockList([...newBlockList], ACTION_TYPE_ENUM.MOVE);
          }
        }

        setTimeout(() => {
          const dragLabelElements = document.getElementsByClassName('block-drag-label-content');
          Array.from(dragLabelElements).forEach((item) => {
            (item.children[0] as HTMLElement).style.visibility = 'hidden';
          });
        }, 30);

        break;
      case 'block-item-move':
        {
          const { index } = (event.target as HTMLElement).dataset;
          if (index && currentItem) {
            const newBlockList = deepClone(blockList);
            const indexArr = index.split('-').map((item) => Number(item));
            const blockIndex = indexArr[0];
            const contentIndex = indexArr[1];
            const itemIndex = indexArr[2];
            const blockItem = newBlockList[blockIndex].children[contentIndex].children;
            let newCurrentItem = deepClone(currentItem);
            if (currentItem.type === ACTION_TYPE_ENUM.ADD) {
              blockItem.splice(itemIndex, 0, currentItem.data);
              newCurrentItem = { ...currentItem, type: ACTION_TYPE_ENUM.EDIT, index };
            }
            if (currentItem.type === ACTION_TYPE_ENUM.MOVE) {
              const oldIndexArr = currentItem.index.split('-').map((item) => Number(item));
              const oldBlockIndex = oldIndexArr[0];
              const oldContentIndex = oldIndexArr[1];
              const oldItemIndex = oldIndexArr[2];
              const oldItem = newBlockList[oldBlockIndex].children[oldContentIndex].children;
              // Move currentItem.data, it can be moved in the current oldItem, or it may be moved in other oldItems
              if (oldBlockIndex === blockIndex && oldContentIndex === contentIndex) {
                const moveItem = oldItem.splice(oldItemIndex, 1)[0];
                blockItem.splice(Number(itemIndex), 0, moveItem);
                newCurrentItem = {
                  ...currentItem,
                  type: ACTION_TYPE_ENUM.EDIT,
                  index: `${blockIndex}-${contentIndex}-${itemIndex}`,
                };
              } else {
                // Move between different blockItems, add them to the new blockItem and delete the original element. If the children are empty after the original element is deleted, add an empty content

                const moveItem = oldItem.splice(oldItemIndex, 1)[0];
                blockItem.splice(Number(itemIndex), 0, moveItem);

                if (oldItem.length === 0) {
                  newBlockList[oldBlockIndex].children[oldContentIndex].children = [
                    defaultContentConfig,
                  ];
                }
                newCurrentItem = {
                  ...currentItem,
                  type: ACTION_TYPE_ENUM.EDIT,
                  index: `${blockIndex}-${contentIndex}-${itemIndex}`,
                };
              }
            }
            setCurrentItem({ ...newCurrentItem });
            setBlockList([...newBlockList], ACTION_TYPE_ENUM.MOVE);
          }
        }
        setTimeout(() => {
          const dragBlockItemElements = document.getElementsByClassName(
            'block-content-drag-label-content',
          );
          Array.from(dragBlockItemElements).forEach((item) => {
            (item.children[0] as HTMLElement).style.visibility = 'hidden';
          });
        }, 30);
        break;
      default:
        break;
    }
  };

  const clearEmptyContentStyles = () => {
    document.querySelectorAll('.block-empty-content').forEach((item) => {
      (item as HTMLElement).style.outlineStyle = '';
    });
  };

  const clearStyles = () => {
    clearLabelStyles();
    clearContentLabelStyles();
    clearEmptyContentStyles();
  };

  const onDragLeave = (event: React.DragEvent) => {
    const target = event.target as HTMLElement;
    setTimeout(() => {
      switch (target.dataset.type) {
        case 'empty-block':
          target.style.border = '';
          break;
        case 'empty-block-item':
          target.parentNode && ((target.parentNode as HTMLElement).style.outlineStyle = '');
          break;
        case 'drag-over-column':
        default:
          break;
      }
    }, 50);
  };

  console.log(blockList);

  return (
    <>
      <div
        className='email-editor'
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragLeave={onDragLeave}
      >
        <div
          className='email-editor-main'
          onClick={blurCurrentItem}
        >
          <LeftSideBar clearStyles={clearStyles} />
          <Preview clearStyles={clearStyles} />
          <RightSetting />
        </div>
      </div>
    </>
  );
};

export default Main;

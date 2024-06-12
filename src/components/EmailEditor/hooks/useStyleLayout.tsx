import { ReactNode } from 'react';
import { Block, BlockStyle, PaddingConfig } from '../types/Block';
import { deepClone } from '../utils/helpers';
import { useEmailEditorContext } from './useEmailEditorContext';
import { BLOCK_TYPE_ENUM } from '../constants/blockType';

const useLayout = () => {
  const { previewMode, currentItem, blockList, setBlockList, setCurrentItem } =
    useEmailEditorContext();

  const findStyleItem = (styles: BlockStyle | undefined, key: string) => {
    if (!styles) return null;
    let styleItem = styles[previewMode][key as keyof BlockStyle];
    if (!styleItem) {
      styleItem = styles['desktop'][key];
    }
    return styleItem;
  };

  const cardItemElement = (title: ReactNode, dom: ReactNode) => {
    return (
      <div className='card-item'>
        <div className='card-item-title'>{title}</div>
        <div>{dom}</div>
      </div>
    );
  };

  const colorChange =
    (key: string) =>
    ({ hex }: { hex: string }) => {
      if (currentItem) {
        const newCurrentItem = deepClone(currentItem);
        newCurrentItem.data.styles[previewMode][key] = hex;
        updateItemStyles(newCurrentItem.data);
      }
    };

  const paddingChange = (padding: PaddingConfig) => {
    if (currentItem) {
      const newData = deepClone(currentItem.data);
      newData.styles[previewMode] = {
        ...newData.styles[previewMode],
        ...padding,
      };
      updateItemStyles(newData);
    }
  };

  const inputChange = (key: string) => (value: string | number) => {
    if (currentItem) {
      const newData = deepClone(currentItem.data);
      newData.styles[previewMode][key] = value;
      updateItemStyles(newData);
    }
  };

  const otherStylesChange = (key: string, value: string | number) => {
    if (currentItem) {
      const newData = deepClone(currentItem.data);
      newData.styles[previewMode][key] = value;
      updateItemStyles(newData);
    }
  };

  const updateItemStyles = (newData: Block) => {
    if (currentItem) {
      const newCurrentItem = deepClone(currentItem);
      const newBlockList = deepClone(blockList);
      newCurrentItem.data = {
        ...newData,
      };
      if (newData.key === BLOCK_TYPE_ENUM.COLUMN) {
        newBlockList[Number(currentItem.index)] = newData;
      } else {
        const indexArr = currentItem.index.split('-');
        newBlockList[Number(indexArr[0])].children[Number(indexArr[1])].children[
          Number(indexArr[2])
        ] = newData;
      }

      setBlockList(newBlockList, `edit_${new Date().getTime()}`);
      setCurrentItem(newCurrentItem);
    }
  };

  return {
    findStyleItem,
    cardItemElement,
    updateItemStyles,
    colorChange,
    paddingChange,
    otherStylesChange,
    inputChange,
  };
};

export default useLayout;

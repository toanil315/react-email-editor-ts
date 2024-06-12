import { useRef, useEffect } from 'react';
import classNames from '../../utils/classNames';
import { deepClone } from '../../utils/helpers';
import { Block } from '../../types/Block';
import { useEmailEditorContext } from '../../hooks/useEmailEditorContext';
import RichText from './RichText';

interface Props {
  index: string;
  blockItem: Block;
}

const RichTextLayout = ({ index, blockItem }: Props) => {
  const { currentItem, previewMode, blockList, setBlockList, setCurrentItem, isDragStart } =
    useEmailEditorContext();

  const richTextRef = useRef<HTMLDivElement | null>(null);

  const isEdit = currentItem ? currentItem.index === index : false;
  const styles =
    previewMode === 'desktop'
      ? blockItem.styles.desktop
      : { ...blockItem.styles.desktop, ...blockItem.styles.mobile };

  useEffect(() => {
    if (isEdit) {
      richTextRef.current?.focus();
    }
  }, []);

  const setTextContent = (event: React.ChangeEvent | React.FormEvent) => {
    const indexArray = index.split('-');
    if (currentItem) {
      const newBlockList = deepClone(blockList);
      const newCurrentItem = deepClone(currentItem);
      newCurrentItem.data.text = (event as React.ChangeEvent).target.innerHTML;
      newBlockList[Number(indexArray[0])].children[Number(indexArray[1])].children[
        Number(indexArray[2])
      ].text = (event as React.ChangeEvent).target.innerHTML;
      setBlockList(newBlockList);
      setCurrentItem({ ...newCurrentItem });
    }
  };

  const preventDefault = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className='relative'>
      {isEdit && blockItem && !isDragStart && (
        <RichText
          textBlock={richTextRef}
          index={index}
          styles={styles}
        />
      )}
      <div
        className={classNames(isEdit ? 'text-block' : '', 'text-content_editable')}
        onClick={preventDefault}
        onInput={setTextContent}
        style={styles}
        contentEditable={isEdit}
        suppressContentEditableWarning
        ref={richTextRef}
        dangerouslySetInnerHTML={{ __html: blockItem.text! }}
      ></div>
    </div>
  );
};

export default RichTextLayout;

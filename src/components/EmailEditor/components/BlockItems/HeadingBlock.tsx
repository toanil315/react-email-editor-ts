import { useEmailEditorContext } from '../../hooks/useEmailEditorContext';
import { Block } from '../../types/Block';
import RichTextLayout from '../RichText/RichTextLayout';
import { useMemo } from 'react';

interface Props {
  blockItem: Block;
  index: string;
}

const HeadingBlock = (props: Props) => {
  const { index, blockItem } = props;
  const { currentItem, previewMode, actionType } = useEmailEditorContext();
  const styles =
    previewMode === 'desktop'
      ? blockItem.styles.desktop
      : { ...blockItem.styles.desktop, ...blockItem.styles.mobile };
  const isEdit = currentItem && currentItem.index === index;
  const richTextElement = useMemo(() => <RichTextLayout {...props} />, [isEdit, actionType]);

  return isEdit ? (
    richTextElement
  ) : (
    <div
      style={{ ...styles }}
      dangerouslySetInnerHTML={{ __html: blockItem.text! }}
    ></div>
  );
};

export default HeadingBlock;

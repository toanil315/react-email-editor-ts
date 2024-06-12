import { useMemo } from 'react';
import { useEmailEditorContext } from '../../hooks/useEmailEditorContext';
import { Block } from '../../types/Block';
import RichTextLayout from '../RichText/RichTextLayout';

interface Props {
  blockItem: Block;
  index: string;
}

const ButtonBlock = (props: Props) => {
  const { blockItem, index } = props;
  const { currentItem, previewMode, actionType } = useEmailEditorContext();

  //TODO: border radius未制作
  const isEdit = currentItem && currentItem.index === index;
  const styles =
    previewMode === 'desktop'
      ? blockItem.styles.desktop
      : { ...blockItem.styles.desktop, ...blockItem.styles.mobile };

  const contentStyles =
    previewMode === 'desktop'
      ? blockItem.contentStyles?.desktop
      : { ...blockItem.contentStyles?.desktop, ...blockItem.contentStyles?.mobile };

  const richTextElement = useMemo(() => <RichTextLayout {...props} />, [isEdit, actionType]);
  return (
    <div style={{ ...contentStyles }}>
      {isEdit ? (
        richTextElement
      ) : (
        <div
          style={{ ...styles }}
          dangerouslySetInnerHTML={{ __html: blockItem.text! }}
        ></div>
      )}
    </div>
  );
};

export default ButtonBlock;

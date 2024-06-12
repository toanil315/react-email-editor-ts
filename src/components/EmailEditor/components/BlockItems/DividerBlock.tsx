import { useEmailEditorContext } from '../../hooks/useEmailEditorContext';
import { Block } from '../../types/Block';

interface Props {
  blockItem: Block;
}

const DividerBlock = ({ blockItem }: Props) => {
  const { previewMode } = useEmailEditorContext();
  const styles =
    previewMode === 'desktop'
      ? blockItem.styles.desktop
      : { ...blockItem.styles.desktop, ...blockItem.styles.mobile };
  const contentStyles =
    previewMode === 'desktop'
      ? blockItem.contentStyles?.desktop
      : { ...blockItem.contentStyles?.desktop, ...blockItem.contentStyles?.mobile };

  return (
    <div className='relative'>
      <div style={{ ...contentStyles }}>
        <div style={{ ...styles }}></div>
      </div>
    </div>
  );
};

export default DividerBlock;

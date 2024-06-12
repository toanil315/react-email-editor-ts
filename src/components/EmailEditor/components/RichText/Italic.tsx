import { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faItalic } from '@fortawesome/free-solid-svg-icons';
import classNames from '../../utils/classNames';
import { useEmailEditorContext } from '../../hooks/useEmailEditorContext';
import useSection from '../../hooks/ueSection';

interface Props {
  modifyText: (command: string, defaultUI: boolean, value: string | null) => void;
  setTextContent: () => void;
}

const Italic = ({ modifyText, setTextContent }: Props) => {
  const { selectionRange } = useEmailEditorContext();
  const { getSelectionNode } = useSection();

  const node = useMemo(() => {
    if (selectionRange) {
      return getSelectionNode(selectionRange.commonAncestorContainer, 'i');
    } else {
      return null;
    }
  }, [selectionRange]);

  return (
    <button
      className={classNames('rich-text-tools-button ', node ? 'rich-text-tools-button-active' : '')}
      title='斜体'
      onClick={() => {
        modifyText('italic', false, null);
        setTextContent();
      }}
    >
      <FontAwesomeIcon
        icon={faItalic}
        className='rich-text-tools-button-icon'
      />
    </button>
  );
};

export default Italic;

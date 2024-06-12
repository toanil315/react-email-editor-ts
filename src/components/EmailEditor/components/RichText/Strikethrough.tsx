import { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStrikethrough } from '@fortawesome/free-solid-svg-icons';
import classNames from '../../utils/classNames';
import { useEmailEditorContext } from '../../hooks/useEmailEditorContext';
import useSection from '../../hooks/ueSection';

interface Props {
  modifyText: (command: string, defaultUI: boolean, value: string | null) => void;
  setTextContent: () => void;
}

const Strikethrough = ({ modifyText, setTextContent }: Props) => {
  const { selectionRange } = useEmailEditorContext();
  const { getSelectionNode } = useSection();

  const node = useMemo(() => {
    if (selectionRange) {
      return getSelectionNode(selectionRange.commonAncestorContainer, 'strike');
    } else {
      return null;
    }
  }, [selectionRange]);

  return (
    <button
      className={classNames('rich-text-tools-button ', node ? 'rich-text-tools-button-active' : '')}
      title='删除线'
      onClick={() => {
        modifyText('strikethrough', false, null);
        setTextContent();
      }}
    >
      <FontAwesomeIcon
        icon={faStrikethrough}
        className='rich-text-tools-button-icon'
      />
    </button>
  );
};

export default Strikethrough;

import { useMemo } from 'react';
import useSection from '../../hooks/ueSection';
import { useEmailEditorContext } from '../../hooks/useEmailEditorContext';
import classNames from '../../utils/classNames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold } from '@fortawesome/free-solid-svg-icons';

interface Props {
  modifyText: (command: string, defaultUI: boolean, value: string | null) => void;
  setTextContent: () => void;
}

const Bold = ({ modifyText, setTextContent }: Props) => {
  const { selectionRange, blockList } = useEmailEditorContext();
  const { getSelectionNode } = useSection();

  const node = useMemo(() => {
    if (selectionRange) {
      return getSelectionNode(selectionRange.commonAncestorContainer, 'b');
    } else {
      return null;
    }
  }, [selectionRange, blockList]);

  return (
    <button
      className={classNames('rich-text-tools-button ', node ? 'rich-text-tools-button-active' : '')}
      title='Bold'
      onClick={() => {
        modifyText('bold', false, null);
        setTextContent();
      }}
    >
      <FontAwesomeIcon
        icon={faBold}
        className='rich-text-tools-button-icon'
      />
    </button>
  );
};

export default Bold;

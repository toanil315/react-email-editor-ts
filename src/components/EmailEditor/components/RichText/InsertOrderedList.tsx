import { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListOl } from '@fortawesome/free-solid-svg-icons';
import classNames from '../../utils/classNames';
import useSection from '../../hooks/ueSection';
import { useEmailEditorContext } from '../../hooks/useEmailEditorContext';

interface Props {
  modifyText: (command: string, defaultUI: boolean, value: string | null) => void;
  setTextContent: () => void;
}

const InsertOrderedList = ({ modifyText, setTextContent }: Props) => {
  const { selectionRange, blockList } = useEmailEditorContext();
  const { getSelectionNode } = useSection();

  const node = useMemo(() => {
    if (selectionRange) {
      return getSelectionNode(selectionRange.commonAncestorContainer, 'ol');
    } else {
      return null;
    }
  }, [selectionRange, blockList]);

  return (
    <button
      className={classNames('rich-text-tools-button ', node ? 'rich-text-tools-button-active' : '')}
      title='有序列表'
      onClick={() => {
        modifyText('insertOrderedList', false, null);
        setTextContent();
      }}
    >
      <FontAwesomeIcon
        icon={faListOl}
        className='rich-text-tools-button-icon'
      />
    </button>
  );
};

export default InsertOrderedList;

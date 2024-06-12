import { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl } from '@fortawesome/free-solid-svg-icons';
import classNames from '../../utils/classNames';
import { useEmailEditorContext } from '../../hooks/useEmailEditorContext';
import useSection from '../../hooks/ueSection';

interface Props {
  modifyText: (command: string, defaultUI: boolean, value: string | null) => void;
  setTextContent: () => void;
}

const InsertUnorderedList = ({ modifyText, setTextContent }: Props) => {
  const { selectionRange, blockList } = useEmailEditorContext();
  const { getSelectionNode } = useSection();

  const node = useMemo(() => {
    if (selectionRange) {
      return getSelectionNode(selectionRange.commonAncestorContainer, 'ul');
    } else {
      return null;
    }
  }, [selectionRange, blockList]);

  return (
    <button
      className={classNames('rich-text-tools-button ', node ? 'rich-text-tools-button-active' : '')}
      title='无序列表'
      onClick={() => {
        modifyText('insertUnorderedList', false, null);
        setTextContent();
      }}
    >
      <FontAwesomeIcon
        icon={faListUl}
        className='rich-text-tools-button-icon'
      />
    </button>
  );
};

export default InsertUnorderedList;

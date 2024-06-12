import { useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faUnlink } from '@fortawesome/free-solid-svg-icons';
import classNames from '../../utils/classNames';
import { Modal, Input } from 'antd';
import { useEmailEditorContext } from '../../hooks/useEmailEditorContext';
import useSection from '../../hooks/ueSection';

interface Props {
  modifyText: (command: string, defaultUI: boolean, value: string | null) => void;
  setTextContent: () => void;
}

interface InputConfig {
  value: string;
  range: Range | null;
  rangeIsLink?: boolean;
}

const Link = ({ modifyText, setTextContent }: Props) => {
  const { selectionRange, blockList } = useEmailEditorContext();
  const { getSelectionNode } = useSection();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputConfig, setInputConfig] = useState<InputConfig>({
    value: '',
    range: null,
  });

  const node = useMemo(() => {
    if (selectionRange) {
      return getSelectionNode(selectionRange.commonAncestorContainer, 'a');
    } else {
      return null;
    }
  }, [selectionRange, blockList]);

  const addLink = () => {
    const { range, value, rangeIsLink } = inputConfig;
    if (range) {
      if (rangeIsLink && range) {
        (range.commonAncestorContainer.parentNode as HTMLAnchorElement).href = value;
      } else {
        const link = document.createElement('a');
        link.target = '_black';
        link.href = value;
        range.surroundContents(link);
      }
      setTextContent();
      closeModal();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setInputConfig({ value: '', range: null });
  };

  const addLinkTag = () => {
    const selection = window.getSelection();
    if (selection) {
      const range = selection.getRangeAt(0);
      const rangeParentNode = range.commonAncestorContainer.parentNode;
      const rangeIsLink = rangeParentNode?.nodeName === 'A';
      const newInputConfig = { ...inputConfig, range };
      if (rangeIsLink) {
        newInputConfig.rangeIsLink = true;
        newInputConfig.value = (rangeParentNode as HTMLAnchorElement).href.replace('https://', '');
      }
      setInputConfig(newInputConfig);
      setIsModalOpen(true);
      setTextContent();
    }
  };

  return (
    <>
      <button
        className={classNames(
          'rich-text-tools-button ',
          node ? 'rich-text-tools-button-active' : '',
        )}
        title='Link'
        onClick={addLinkTag}
      >
        <FontAwesomeIcon
          icon={faLink}
          className='rich-text-tools-button-icon'
        />
      </button>
      <button
        className={classNames('rich-text-tools-button')}
        title='Unlink'
        onClick={() => {
          modifyText('unlink', false, null);
          setTextContent();
        }}
      >
        <FontAwesomeIcon
          icon={faUnlink}
          className='rich-text-tools-button-icon'
        />
      </button>
      <Modal
        title='添加超链接'
        open={isModalOpen}
        zIndex={1100}
        onOk={addLink}
        onCancel={closeModal}
        okText='确定'
        cancelText='取消'
      >
        <Input
          addonBefore='https://'
          value={inputConfig.value.replace('https://', '')}
          onChange={(event) =>
            setInputConfig({ ...inputConfig, value: 'https://' + event.target.value })
          }
        />
      </Modal>
    </>
  );
};

export default Link;

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faMobileAlt, faUndo, faRedo } from '@fortawesome/free-solid-svg-icons';
import classNames from '../../utils/classNames';
// import { deepClone } from "../../utils/helpers";
import { deepClone } from '../../utils/helpers';
import { useEmailEditorContext } from '../../hooks/useEmailEditorContext';
import { Block } from '../../types/Block';
import { BodySettings } from '../../types/BodySettings';
import { PREVIEW_MODE_ENUM } from '../../constants/previewMode';

interface History {
  blockList: Block[];
  bodySettings: BodySettings;
}

interface BlockListHistory {
  histories: History[];
  index: number;
}

const Header = () => {
  const {
    previewMode,
    setPreviewMode,
    bodySettings,
    blockList,
    actionType,
    setBlockList,
    setBodySettings,
  } = useEmailEditorContext();
  const [blockListHistory, setBlockListHistory] = useState<BlockListHistory>({
    histories: [],
    index: 0,
  });
  const { histories, index } = blockListHistory;

  useEffect(() => {
    const newBlockList = deepClone(blockList);
    const newBodySettings = deepClone(bodySettings);
    if (actionType === 'firstRender') {
      setBlockListHistory({
        histories: [
          {
            blockList: newBlockList,
            bodySettings: newBodySettings,
          },
        ],
        index: 0,
      });
    } else if (!actionType.includes('set_history')) {
      let newHistories = deepClone(histories);

      newHistories = newHistories.slice(0, index + 1);
      newHistories.push({
        blockList: newBlockList,
        bodySettings: newBodySettings,
      });

      setBlockListHistory({
        histories: newHistories,
        index: index + 1,
      });
    }
  }, [blockList, bodySettings, actionType]);

  const prevHistory = () => {
    if (histories[index - 1]) {
      const newHistories = deepClone(histories[index - 1]);
      setBlockListHistory({ ...blockListHistory, index: index - 1 });
      setBlockList(newHistories.blockList, `set_history_${index - 1}`);
      setBodySettings(newHistories.bodySettings);
    }
  };

  const nextHistory = () => {
    if (histories[index + 1]) {
      const newHistories = deepClone(histories[index + 1]);
      setBlockListHistory({ ...blockListHistory, index: index + 1 });
      setBlockList(newHistories.blockList, `set_history_${index + 1}`);
      setBodySettings(newHistories.bodySettings);
    }
  };

  return (
    <>
      <div className='header'>
        <div className='header-box'>
          <FontAwesomeIcon
            onClick={() => setPreviewMode(PREVIEW_MODE_ENUM.DESKTOP)}
            icon={faDesktop}
            className={classNames(
              'header-icon-small',
              previewMode === PREVIEW_MODE_ENUM.DESKTOP ? 'header-icon_active' : '',
              previewMode !== PREVIEW_MODE_ENUM.DESKTOP ? 'header-icon_disabled' : '',
            )}
          />
          <FontAwesomeIcon
            icon={faMobileAlt}
            onClick={() => setPreviewMode(PREVIEW_MODE_ENUM.MOBILE)}
            className={classNames(
              'header-icon-small',
              previewMode === PREVIEW_MODE_ENUM.MOBILE ? 'header-icon_active' : '',
              previewMode !== PREVIEW_MODE_ENUM.MOBILE ? 'header-icon_disabled' : '',
            )}
          />
        </div>
        <div className='header-box text-center'></div>
        <div className='header-box text-right'>
          <FontAwesomeIcon
            onClick={prevHistory}
            icon={faUndo}
            className={classNames(
              'header-icon-history',
              histories[index - 1] ? 'header-icon-history_active' : '',
              !histories[index - 1] ? 'header-icon-history_disabled' : '',
            )}
          />
          <FontAwesomeIcon
            onClick={nextHistory}
            icon={faRedo}
            className={classNames(
              'header-icon-history',
              histories[index + 1] ? 'header-icon-history_active' : '',
              !histories[index + 1] ? 'header-icon-history_disabled' : '',
            )}
          />
        </div>
      </div>
    </>
  );
};

export default Header;

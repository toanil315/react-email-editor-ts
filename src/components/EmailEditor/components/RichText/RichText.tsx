import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faExpandAlt, faCompressAlt } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { deepClone } from '../../utils/helpers';

import Bold from './Bold';
import Italic from './Italic';
import Underline from './Underline';
import Strikethrough from './Strikethrough';
import InsertOrderedList from './InsertOrderedList';
import InsertUnorderedList from './InsertUnorderedList';
import Link from './Link';
import TextAlign from './TextAlign';
import FontColor from './FontColor';
import { Style } from '../../types/Block';
import { useEmailEditorContext } from '../../hooks/useEmailEditorContext';

interface Props {
  index: string;
  textBlock: React.RefObject<HTMLDivElement | null>;
  styles: Style;
}

const RichText = ({ index, textBlock, styles }: Props) => {
  const { blockList, setBlockList, currentItem, setCurrentItem } = useEmailEditorContext();
  const richTextRef = useRef<HTMLDivElement | null>(null);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (richTextRef.current) {
      const viewportOffset = (
        richTextRef.current.parentNode as HTMLElement | null
      )?.getBoundingClientRect();
      const preview = document.querySelector('#preview');
      const previewOffset = preview?.getBoundingClientRect();
      if (previewOffset && viewportOffset) {
        if (viewportOffset.top - 190 < 0) {
          richTextRef.current.style.bottom = 'auto';
          richTextRef.current.style.top = '110%';
        } else {
          richTextRef.current.style.bottom = '110%';
          richTextRef.current.style.top = 'auto';
        }
        if (viewportOffset.left + 375 > previewOffset.left + previewOffset.width) {
          richTextRef.current.style.left = 'auto';
          richTextRef.current.style.right = '0';
        } else {
          richTextRef.current.style.left = '0';
          richTextRef.current.style.right = 'auto';
        }
      }
    }
  }, []);

  const modifyText = (command: string, defaultUi: boolean, value: string | null) => {
    document.execCommand(command, defaultUi, value as any);
  };

  const fontSizeList = [
    '8px',
    '10px',
    '12px',
    '14px',
    '16px',
    '18px',
    '20px',
    '22px',
    '24px',
    '26px',
    '28px',
    '30px',
    '32px',
    '34px',
    '36px',
    '38px',
    '40px',
    '44px',
    '48px',
    '72px',
  ];

  const fontname_configs = [
    'sans-serif',
    'Arial',
    '仿宋',
    '黑体',
    'Verdana',
    'Times New Roman',
    'Garamond',
    'Georgia',
    'Courier New',
    'cursive',
  ];

  const setTextContent = () => {
    if (textBlock.current && currentItem) {
      const indexArray = index.split('-').map((item) => Number(item));
      const newBlockList = deepClone(blockList);
      const newCurrentItem = deepClone(currentItem);
      newCurrentItem.data.text = textBlock.current.innerHTML;
      newBlockList[indexArray[0]].children[indexArray[1]].children[indexArray[2]].text =
        textBlock.current.innerHTML;
      setCurrentItem({ ...newCurrentItem });
      setBlockList(newBlockList);
    }
  };

  const selectElement = (
    selectList: string[],
    defaultValue: string,
    type: string,
    onChange: (item: string) => void,
  ) => {
    const hideOptions = () => {
      const options: HTMLElement | null = document.querySelector(
        `#richText-options-${type}-${index}`,
      );
      const mask: HTMLElement | null = document.querySelector(`#richText-mask-${type}-${index}`);
      if (options && mask) {
        options.style.animation = 'leave 0.2s linear';
        setTimeout(() => {
          options.style.display = 'none';
          mask.style.display = 'none';
        }, 100);
      }
    };

    const showOptions = () => {
      const options: HTMLElement | null = document.querySelector(
        `#richText-options-${type}-${index}`,
      );
      const mask: HTMLElement | null = document.querySelector(`#richText-mask-${type}-${index}`);
      if (options && mask) {
        options.style.display = 'block';
        mask.style.display = 'block';
        options.style.animation = 'move 0.2s linear';
      }
    };
    return (
      <div className='richText-select'>
        <div
          className='richText-select-select'
          onClick={(event) => {
            event.stopPropagation();
            const options: HTMLElement | null = document.querySelector(
              `#richText-options-${type}-${index}`,
            );
            if (options?.style.display === 'block') {
              hideOptions();
            } else {
              showOptions();
            }
          }}
        >
          <span
            className='richText-select-value'
            id={`richText-select-value-${type}-${index}`}
          >
            {defaultValue}
          </span>
          <FontAwesomeIcon
            icon={faAngleDown}
            className='richText-select-icon'
          />
        </div>
        <div
          className='richText-mask'
          id={`richText-mask-${type}-${index}`}
          onClick={hideOptions}
        ></div>
        <div
          className='richText-select-option'
          id={`richText-options-${type}-${index}`}
        >
          {selectList.map((item) => {
            return (
              <div
                className='richText-select-option_item'
                key={item}
                onClick={() => {
                  const currentValueDom: HTMLElement | null = document.querySelector(
                    `#richText-select-value-${type}-${index}`,
                  );
                  if (currentValueDom) {
                    currentValueDom.innerHTML = item;
                  }
                  hideOptions();
                  onChange && onChange(item);
                  setTextContent();
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const editFontSize = (item: string) => {
    document.execCommand('fontSize', false, '7');
    const fontElements = document.getElementsByTagName('font');
    for (let idx = 0, len = fontElements.length; idx < len; ++idx) {
      if (fontElements[idx].size === '7') {
        fontElements[idx].removeAttribute('size');
        fontElements[idx].style.fontSize = item;
      }
    }
  };

  const editFontName = (item: string) => {
    modifyText('fontName', false, item);
  };

  return (
    <div
      className='rich-text'
      ref={richTextRef}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      <div
        className='rich-text-tools'
        style={{ width: isHidden ? 'auto' : '375px' }}
      >
        <div className='rich-text-tools-body items-center'>
          {!isHidden && (
            <>
              {selectElement(fontSizeList, styles.fontSize + 'px', 'fontSize', editFontSize)}
              {selectElement(fontname_configs, String(styles.fontFamily), 'fontName', editFontName)}

              <FontColor modifyText={modifyText} />

              <Bold
                modifyText={modifyText}
                setTextContent={setTextContent}
              />

              <Italic
                modifyText={modifyText}
                setTextContent={setTextContent}
              />

              <Underline
                modifyText={modifyText}
                setTextContent={setTextContent}
              />

              <Strikethrough
                modifyText={modifyText}
                setTextContent={setTextContent}
              />

              <InsertOrderedList
                modifyText={modifyText}
                setTextContent={setTextContent}
              />

              <InsertUnorderedList
                modifyText={modifyText}
                setTextContent={setTextContent}
              />

              <Link
                modifyText={modifyText}
                setTextContent={setTextContent}
              />

              <TextAlign
                modifyText={modifyText}
                setTextContent={setTextContent}
              />
            </>
          )}
          <button
            className='rich-text-tools-button'
            onClick={() => setIsHidden(!isHidden)}
          >
            {
              <FontAwesomeIcon
                icon={isHidden ? faExpandAlt : faCompressAlt}
                className='rich-text-tools-button-icon'
              />
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default RichText;

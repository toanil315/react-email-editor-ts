import { InputNumber, Input } from 'antd';
import { useEmailEditorContext } from '../../hooks/useEmailEditorContext';
import useLayout from '../../hooks/useStyleLayout';
import ColorPicker from '../ColorPicker';
import StyleSettings from '../StyleSettings';

const RightSetting = () => {
  const { currentItem, isDragStart, bodySettings, setBodySettings } = useEmailEditorContext();
  const { cardItemElement } = useLayout();
  const blockTitle = () => {
    let title = 'Block';
    const type = currentItem?.data.key;
    switch (type) {
      case 'text':
        title = 'Text Settings';
        break;
      case 'column':
        title = 'Column Settings';
        break;
      case 'heading':
        title = 'Heading Settings';
        break;
      case 'button':
        title = 'Button Settings';
        break;
      case 'divider':
        title = 'Divider Settings';
        break;
      case 'image':
        title = 'Image Settings';
        break;
      case 'social_link':
        title = 'Social Link Settings';
        break;
      default:
        break;
    }
    return title;
  };

  const colorChange = (key: string) => (color: { hex: string }) => {
    setBodySettings(
      { ...bodySettings, styles: { ...bodySettings.styles, [key]: color.hex } },
      'set_body_settings',
    );
  };

  const themeElement = () => {
    return (
      <>
        <div className='subject-settings'>Body Settings</div>
        <div className='margin-top-32'>
          {cardItemElement(
            'Text Color',
            <ColorPicker
              color={bodySettings.styles.color}
              setColor={colorChange('color')}
            />,
          )}
          {cardItemElement(
            'Email Theme Background Color',
            <ColorPicker
              color={bodySettings.styles.backgroundColor}
              setColor={colorChange('backgroundColor')}
            />,
          )}
          {cardItemElement(
            'Width',
            <InputNumber
              className='input-width'
              addonAfter='px'
              min={0}
              max={900}
              value={Number(bodySettings.contentWidth)}
              onChange={(value) =>
                setBodySettings(
                  { ...bodySettings, contentWidth: Number(value) || 600 },
                  'set_body_settings',
                )
              }
            />,
          )}
          <div>
            <div className='pre_header'>Pre-header</div>
            <Input
              className='margin-top-12'
              value={bodySettings.preHeader}
              onChange={(event) =>
                setBodySettings(
                  { ...bodySettings, preHeader: event.target.value },
                  'set_body_settings',
                )
              }
            />
            <div className='pre_header-desc'>
              The pre-header is a short summary text that follows the subject line when viewing an
              email in the inbox.
            </div>
          </div>
        </div>
      </>
    );
  };

  const stopPropagation = (event: any) => {
    event.stopPropagation();
  };

  return (
    <div
      className='right-settings default-scrollbar'
      onClick={stopPropagation}
    >
      {!isDragStart && currentItem && currentItem.type === 'edit' ? (
        <div key={0}>
          <h2 className='right-setting-block-title'>{blockTitle()}</h2>
          <div className='margin-top-18'>
            <StyleSettings />
          </div>
        </div>
      ) : (
        <div key={1}>{themeElement()}</div>
      )}
    </div>
  );
};

export default RightSetting;

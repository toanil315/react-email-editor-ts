import ColumnStyleSettings from './ColumnStyleSettings';
import TextStyleSettings from './TextStyleSettings';
import HeadingStyleSettings from './HeadingStyleSettings';
import ButtonStyleSettings from './ButtonStyleSettings';
import ImageStyleSettings from './ImageStyleSettings';
import SocialLinkSettings from './SocialLinkSettings';
import { useEmailEditorContext } from '../../hooks/useEmailEditorContext';
import DividerStyleSettings from './DividerStyleSettings';

const StyleSettings = () => {
  const { currentItem } = useEmailEditorContext();

  return (
    <>
      {currentItem?.data.key === 'column' && <ColumnStyleSettings />}
      {currentItem?.data.key === 'text' && <TextStyleSettings />}
      {currentItem?.data.key === 'heading' && <HeadingStyleSettings />}
      {currentItem?.data.key === 'button' && <ButtonStyleSettings />}
      {currentItem?.data.key === 'divider' && <DividerStyleSettings />}
      {currentItem?.data.key === 'image' && <ImageStyleSettings />}
      {currentItem?.data.key === 'social_link' && <SocialLinkSettings />}
    </>
  );
};

export default StyleSettings;

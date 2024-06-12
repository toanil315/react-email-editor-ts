import { useState } from 'react';
import { Popover } from 'antd';
import { ChromePicker } from 'react-color';

interface Props {
  color: string;
  setColor: (color: { hex: string }) => void;
}

const ColorPicker = ({ color, setColor }: Props) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <Popover
      zIndex={1070}
      content={
        <div className='select-none'>
          <ChromePicker
            color={color}
            onChange={setColor}
          />
        </div>
      }
      trigger='click'
      open={popoverOpen}
      onOpenChange={setPopoverOpen}
    >
      <button
        className='color-picker-button'
        style={{ background: color }}
      ></button>
    </Popover>
  );
};

export default ColorPicker;

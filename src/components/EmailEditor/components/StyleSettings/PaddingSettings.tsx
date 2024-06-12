import { InputNumber } from 'antd';
import { PaddingConfig } from '../../types/Block';

interface Props {
  padding: PaddingConfig;
  setPadding: (padding: PaddingConfig) => void;
}

const PaddingSettings = ({ padding, setPadding }: Props) => {
  const paddingChange = (key: string) => (value: number) => {
    const newPadding = { ...padding, [key]: value };
    setPadding(newPadding);
  };
  return (
    <div className='padding-settings'>
      {[
        { name: 'Top', value: 'paddingTop' },
        { name: 'Right', value: 'paddingRight' },
        { name: 'Left', value: 'paddingLeft' },
        { name: 'Bottom', value: 'paddingBottom' },
      ].map(({ name, value }) => {
        const style = padding[value as keyof PaddingConfig];
        return (
          <div key={value}>
            <div>{name}</div>
            <InputNumber
              className='width-full'
              addonAfter='px'
              min={0}
              value={style}
              onChange={paddingChange(value) as any}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PaddingSettings;

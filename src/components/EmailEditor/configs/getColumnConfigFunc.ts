import { BLOCK_TYPE_ENUM } from '../constants/blockType';
import { Block } from '../types/Block';

const getColumnConfigFunc = () => {
  return (item?: Block): Block => {
    const contentConfig: Block = {
      name: 'Drag Block Here',
      key: BLOCK_TYPE_ENUM.EMPTY,
      width: '100%',
      styles: {
        desktop: {
          backgroundColor: 'transparent',
          paddingTop: 0,
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 0,
        },
        mobile: {},
      },
      children: [],
    };

    return {
      name: 'Column',
      key: BLOCK_TYPE_ENUM.COLUMN,
      type: 'full',
      styles: {
        key: 'column',
        desktop: {
          backgroundColor: 'transparent',
          paddingTop: 0,
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 0,
          contentBackground: '#fff',
        },
        mobile: {},
      },
      children: [
        {
          name: 'Content',
          key: BLOCK_TYPE_ENUM.CONTENT,
          width: '100%',
          styles: {
            key: 'column',
            desktop: {
              backgroundColor: 'transparent',
              paddingTop: 0,
              paddingLeft: 0,
              paddingRight: 0,
              paddingBottom: 0,
              contentBackground: 'transparent',
            },
            mobile: {},
          },
          children: [item ? item : contentConfig],
        },
      ],
    };
  };
};

export default getColumnConfigFunc;

import { BLOCK_TYPE_ENUM } from '../constants/blockType';
import { Block } from '../types/Block';

const getColumnsSettings = (): Record<string, Block> => {
  const defaultStyles = {
    desktop: {
      textAlign: 'center',
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 12,
      paddingRight: 12,
    },
    mobile: {},
  };

  return {
    full: {
      columns: 1,
      type: 'full',
      children: [
        {
          name: 'Drag Block Here',
          width: '100%',
          styles: defaultStyles,
          key: BLOCK_TYPE_ENUM.EMPTY,
          children: [],
        },
      ],
    },
    '1-1': {
      columns: 2,
      type: '1-1',
      children: Array.from({ length: 2 }).map(() => {
        return {
          name: 'Content',
          key: BLOCK_TYPE_ENUM.CONTENT,
          width: '50%',
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
          children: [
            {
              name: 'Drag Block Here',
              key: BLOCK_TYPE_ENUM.EMPTY,
              width: '100%',
              styles: defaultStyles,
              children: [],
            } as unknown as Block,
          ],
        };
      }),
    },
    '1-1-1': {
      columns: 3,
      type: '1-1-1',
      children: Array.from({ length: 3 }).map(() => {
        return {
          name: 'Content',
          key: BLOCK_TYPE_ENUM.CONTENT,
          width: '33.3%',
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
          children: [
            {
              name: 'Drag Block Here',
              key: BLOCK_TYPE_ENUM.EMPTY,
              width: '100%',
              styles: defaultStyles,
              children: [],
            } as unknown as Block,
          ],
        };
      }),
    },
    '1-1-1-1': {
      columns: 4,
      type: '1-1-1-1',
      children: Array.from({ length: 4 }).map(() => {
        return {
          name: 'Content',
          key: BLOCK_TYPE_ENUM.CONTENT,
          width: '25%',
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
          children: [
            {
              name: 'Drag Block Here',
              key: BLOCK_TYPE_ENUM.EMPTY,
              width: '100%',
              styles: defaultStyles,
              children: [],
            } as unknown as Block,
          ],
        };
      }),
    },
    '1-2': {
      columns: 2,
      type: '1-2',
      children: Array.from({ length: 2 }).map((item, index) => {
        return {
          name: 'Content',
          key: BLOCK_TYPE_ENUM.CONTENT,
          width: index === 0 ? '33.3%' : '66.6%',
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
          children: [
            {
              name: 'Drag Block Here',
              key: BLOCK_TYPE_ENUM.EMPTY,
              width: '100%',
              styles: defaultStyles,
              children: [],
            } as unknown as Block,
          ],
        };
      }),
    },
    '2-1': {
      columns: 2,
      type: '2-1',
      children: Array.from({ length: 2 }).map((item, index) => {
        return {
          name: 'Content',
          key: BLOCK_TYPE_ENUM.CONTENT,
          width: index === 0 ? '66.6%' : '33.3%',
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
          children: [
            {
              name: 'Drag Block Here',
              key: BLOCK_TYPE_ENUM.EMPTY,
              width: '100%',
              styles: defaultStyles,
              children: [],
            } as unknown as Block,
          ],
        };
      }),
    },
    '2-4-2-4': {
      columns: 4,
      type: '2-4-2-4',
      children: Array.from({ length: 4 }).map((item, index) => {
        return {
          name: 'Content',
          key: BLOCK_TYPE_ENUM.CONTENT,
          width: index % 2 === 0 ? '16.6%' : '33.3%',
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
          children: [
            {
              name: 'Drag Block Here',
              key: BLOCK_TYPE_ENUM.EMPTY,
              width: '100%',
              styles: defaultStyles,
              children: [],
            } as unknown as Block,
          ],
        };
      }),
    },
    '4-2-4-2': {
      columns: 4,
      type: '4-2-4-2',
      children: Array.from({ length: 4 }).map((item, index) => {
        return {
          name: 'Content',
          key: BLOCK_TYPE_ENUM.CONTENT,
          width: index % 2 === 0 ? '33.3%' : '16.6%',
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
          children: [
            {
              name: 'Drag Block Here',
              key: BLOCK_TYPE_ENUM.EMPTY,
              width: '100%',
              styles: defaultStyles,
              children: [],
            } as unknown as Block,
          ],
        };
      }),
    },
  } as unknown as Record<string, Block>;
};

export default getColumnsSettings;

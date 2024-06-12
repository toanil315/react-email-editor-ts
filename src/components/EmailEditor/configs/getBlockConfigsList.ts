import { BLOCK_TYPE_ENUM } from '../constants/blockType';
import { Block } from '../types/Block';

const getBlockConfigsList = (): Block[] => {
  return [
    {
      name: 'Column',
      key: BLOCK_TYPE_ENUM.COLUMN,
      type: 'full',
      styles: {
        key: BLOCK_TYPE_ENUM.COLUMN,
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
            key: BLOCK_TYPE_ENUM.COLUMN,
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
            },
          ],
        },
      ],
    },
    {
      name: 'Text',
      key: BLOCK_TYPE_ENUM.TEXT,
      text: 'This is a text, click to edit text',
      styles: {
        desktop: {
          fontSize: 14,
          fontFamily: 'sans-serif',
          lineHeight: '140%',
          paddingTop: 12,
          paddingBottom: 12,
          paddingLeft: 12,
          paddingRight: 12,
          textAlign: 'left',
        },
        mobile: {},
      },
      children: [],
    },
    {
      name: 'Heading',
      key: BLOCK_TYPE_ENUM.HEADING,
      text: 'This is a heading, click to edit heading',
      type: 'h1',
      styles: {
        desktop: {
          fontSize: 22,
          lineHeight: '140%',
          fontFamily: 'sans-serif',
          paddingTop: 12,
          paddingBottom: 12,
          paddingLeft: 12,
          paddingRight: 12,
          textAlign: 'left',
          fontWeight: 'bold',
        },
        mobile: {},
      },
      children: [],
    },
    {
      name: 'Button',
      key: BLOCK_TYPE_ENUM.BUTTON,
      text: 'Button',
      type: 'link',
      linkUrl: '',
      contentStyles: {
        desktop: {
          textAlign: 'center',
          paddingTop: 12,
          paddingBottom: 12,
          paddingLeft: 12,
          paddingRight: 12,
        },
        mobile: {},
      },
      styles: {
        desktop: {
          width: 'auto',
          fontSize: 12,
          lineHeight: '140%',
          borderRadius: 4,
          fontFamily: 'sans-serif',
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 20,
          paddingRight: 20,
          backgroundColor: '#2faade',
          color: '#fff',
          display: 'inline-block',
        },
        mobile: {},
      },
      children: [],
    },
    {
      name: 'Divider',
      key: BLOCK_TYPE_ENUM.DIVIDER,
      contentStyles: {
        desktop: {
          paddingTop: 12,
          paddingBottom: 12,
          paddingLeft: 12,
          paddingRight: 12,
          textAlign: 'center',
        },
        mobile: {},
      },
      styles: {
        desktop: {
          width: '100%',
          borderTopStyle: 'solid',
          borderTopColor: '#ccc',
          borderTopWidth: 1,
          display: 'inline-block',
          verticalAlign: 'middle',
        },
        mobile: {},
      },
      children: [],
    },
    {
      name: 'Image',
      key: BLOCK_TYPE_ENUM.IMAGE,
      src: '',
      alt: 'Image',
      type: 'link',
      linkUrl: '',
      contentStyles: {
        desktop: {
          paddingTop: 12,
          paddingBottom: 12,
          paddingLeft: 12,
          paddingRight: 12,
          textAlign: 'center',
        },
        mobile: {},
      },
      styles: {
        desktop: {
          width: 'auto',
        },
        mobile: {},
      },
      children: [],
    },
    {
      name: 'Social Link',
      key: BLOCK_TYPE_ENUM.SOCIAL_LINK,
      list: [
        {
          image: 'https://iili.io/HMnhdkN.png',
          title: 'facebook',
          linkURL: '',
        },
        {
          image: 'https://iili.io/J9qWqNV.png',
          title: 'Instagram',
          linkURL: '',
        },
        {
          image: 'https://iili.io/J9qWBDB.png',
          title: 'TikTok',
          linkURL: '',
        },
        {
          image: 'https://iili.io/J9qWnoP.png',
          title: 'Twitter',
          linkURL: '',
        },
      ],
      imageWidth: 32,
      contentStyles: {
        desktop: {
          paddingTop: 12,
          paddingBottom: 12,
          paddingLeft: 12,
          paddingRight: 12,
          textAlign: 'left',
        },
        mobile: {},
      },
      styles: {
        desktop: { paddingTop: 4, paddingBottom: 4, paddingLeft: 6, paddingRight: 6 },
        mobile: {},
      },
      children: [],
    },
  ];
};

export default getBlockConfigsList;

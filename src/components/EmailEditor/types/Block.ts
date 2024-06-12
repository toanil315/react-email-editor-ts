import { ACTION_TYPE_ENUM } from '../constants/actionType';
import { BLOCK_TYPE_ENUM } from '../constants/blockType';

export type Style = Record<string, string | number>;
export interface BlockStyle {
  key?: string;
  desktop: Style;
  mobile: Style;
}
export interface StyleConfig {
  className: string;
  desktop: string;
  mobile: string;
}

export interface SocialList {
  image: string;
  title: string;
  linkURL: string;
}

export interface Block {
  name: string;
  index?: string;
  key: BLOCK_TYPE_ENUM;
  width?: string;
  type?: string;
  text?: string;
  linkUrl?: string;
  src?: string;
  alt?: string;
  list?: SocialList[];
  imageWidth?: number;
  styles: BlockStyle;
  contentStyles?: BlockStyle;
  children: Block[];
  styleConfig?: StyleConfig;
  contentStyleConfig?: StyleConfig;
  columns?: number;
}

export interface CurrentItem {
  data: Block;
  index: string;
  type: ACTION_TYPE_ENUM;
}

export interface PaddingConfig {
  paddingTop: number;
  paddingRight: number;
  paddingLeft: number;
  paddingBottom: number;
}

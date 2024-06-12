import { ACTION_TYPE_ENUM } from '../constants/actionType';
import { PREVIEW_MODE_ENUM } from '../constants/previewMode';
import { REDUCER_ACTION_ENUM } from '../constants/reducerAction';
import { Block, CurrentItem } from '../types/Block';
import { BodySettings } from '../types/BodySettings';

export interface ReducerState {
  blockList: Block[];
  actionType: ACTION_TYPE_ENUM | string;
  previewMode: PREVIEW_MODE_ENUM;
  currentItem: CurrentItem | null;
  bodySettings: BodySettings;
  isDragStart: boolean;
  selectionRange: Range | null;
  textRange: string | null;
}

export interface ReducerAction extends Pick<ReducerState, keyof ReducerState> {
  type: REDUCER_ACTION_ENUM;
}

export const setTextRange = (textRange: string | null) => {
  return {
    type: REDUCER_ACTION_ENUM.SET_TEXT_RANGE,
    textRange,
  } as ReducerAction;
};

export const setSelectionRange = (selectionRange: Range | null) => {
  return {
    type: REDUCER_ACTION_ENUM.SET_SELECTION_RANGE,
    selectionRange,
  } as ReducerAction;
};

export const setBlockList = (blockList: Block[]) => {
  return {
    type: REDUCER_ACTION_ENUM.SET_BLOCK_LIST,
    blockList,
  } as ReducerAction;
};

export const setIsDragStart = (isDragStart: boolean) => {
  return {
    type: REDUCER_ACTION_ENUM.SET_IS_DRAG_START,
    isDragStart,
  } as ReducerAction;
};

export const setActionType = (actionType: ACTION_TYPE_ENUM | string) => {
  return {
    type: REDUCER_ACTION_ENUM.SET_ACTION_TYPE,
    actionType,
  } as ReducerAction;
};

export const setPreviewMode = (previewMode: PREVIEW_MODE_ENUM) => {
  return {
    type: REDUCER_ACTION_ENUM.SET_PREVIEW_MODE,
    previewMode,
  } as ReducerAction;
};

export const setCurrentItem = (currentItem: CurrentItem | null) => {
  return {
    type: REDUCER_ACTION_ENUM.SET_CURRENT_ITEM,
    currentItem,
  } as ReducerAction;
};

export const setBodySettings = (bodySettings: BodySettings) => {
  return {
    type: REDUCER_ACTION_ENUM.SET_BODY_SETTINGS,
    bodySettings,
  } as ReducerAction;
};

export const defaultBlockList = [] as Block[];
export const defaultIsDragStart = false;
export const defaultActionType = ACTION_TYPE_ENUM.FIRST_RENDER; // firstRender, add, move, delete,edit, set_history_${index}, edit_${Date.now()}
export const defaultPreviewMode = PREVIEW_MODE_ENUM.DESKTOP;
export const defaultCurrentItem = null;
export const defaultSelectionRange = null;
export const textRange = null;
export const defaultBodySettings = {
  preHeader: '',
  contentWidth: 600,
  styles: {
    backgroundColor: '#9ca3af',
    color: '#000',
    fontFamily: 'Arial',
  },
};

export const defaultState: ReducerState = {
  blockList: defaultBlockList,
  isDragStart: defaultIsDragStart,
  actionType: defaultActionType,
  previewMode: defaultPreviewMode,
  currentItem: defaultCurrentItem,
  bodySettings: defaultBodySettings,
  selectionRange: defaultSelectionRange,
  textRange: textRange,
};

export function reducer(state: ReducerState, action: ReducerAction): ReducerState {
  switch (action.type) {
    case REDUCER_ACTION_ENUM.SET_BLOCK_LIST:
      return {
        ...state,
        blockList: action.blockList,
      };
    case REDUCER_ACTION_ENUM.SET_IS_DRAG_START:
      return {
        ...state,
        isDragStart: action.isDragStart,
      };
    case REDUCER_ACTION_ENUM.SET_ACTION_TYPE:
      return {
        ...state,
        actionType: action.actionType,
      };
    case REDUCER_ACTION_ENUM.SET_PREVIEW_MODE:
      return {
        ...state,
        previewMode: action.previewMode,
      };
    case REDUCER_ACTION_ENUM.SET_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.currentItem,
      };
    case REDUCER_ACTION_ENUM.SET_BODY_SETTINGS:
      return {
        ...state,
        bodySettings: action.bodySettings,
      };
    case REDUCER_ACTION_ENUM.SET_SELECTION_RANGE:
      return {
        ...state,
        selectionRange: action.selectionRange,
      };
    case REDUCER_ACTION_ENUM.SET_TEXT_RANGE:
      return {
        ...state,
        textRange: action.textRange,
      };
    default:
      return state;
  }
}

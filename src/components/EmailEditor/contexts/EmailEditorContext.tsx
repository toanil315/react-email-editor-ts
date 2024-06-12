import { createContext, useReducer } from 'react';
import { Block, CurrentItem } from '../types/Block';
import { ACTION_TYPE_ENUM } from '../constants/actionType';
import { BodySettings } from '../types/BodySettings';
import { PREVIEW_MODE_ENUM } from '../constants/previewMode';
import {
  reducer,
  defaultState,
  setIsDragStart,
  setActionType,
  setBodySettings,
  setBlockList,
  setPreviewMode,
  setCurrentItem,
  setSelectionRange,
  setTextRange,
} from '../reducers';

interface IEmailEditorContext {
  blockList: Block[];
  actionType: ACTION_TYPE_ENUM | string;
  previewMode: PREVIEW_MODE_ENUM;
  currentItem: CurrentItem | null;
  bodySettings: BodySettings;
  isDragStart: boolean;
  selectionRange: Range | null;
  textRange: string | null;
  setIsDragStart: (isDragStart: boolean) => void;
  setBodySettings: (bodySettings: BodySettings, actionType?: ACTION_TYPE_ENUM | string) => void;
  setBlockList: (blockList: Block[], actionType?: ACTION_TYPE_ENUM | string) => void;
  setPreviewMode: (previewMode: PREVIEW_MODE_ENUM) => void;
  setCurrentItem: (currentItem: CurrentItem | null) => void;
  setSelectionRange: (selectionRange: Range | null) => void;
  setTextRange: (textRange: string | null) => void;
  setActionType: (actionType: ACTION_TYPE_ENUM | string) => void;
}

interface EmailEditorProviderProps {
  children: React.ReactNode;
}

export const EmailEditorContext = createContext<IEmailEditorContext | null>(null);

export const EmailEditorProvider = ({ children }: EmailEditorProviderProps) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <EmailEditorContext.Provider
      value={{
        ...state,
        setIsDragStart: (isDragStart: boolean) => dispatch(setIsDragStart(isDragStart)),
        setBodySettings: (bodySettings: BodySettings, actionType?: ACTION_TYPE_ENUM | string) => {
          actionType && dispatch(setActionType(actionType));
          dispatch(setBodySettings(bodySettings));
        },
        setBlockList: (blockList: Block[], actionType?: ACTION_TYPE_ENUM | string) => {
          actionType && dispatch(setActionType(actionType));
          dispatch(setBlockList(blockList));
        },
        setPreviewMode: (previewMode: PREVIEW_MODE_ENUM) => dispatch(setPreviewMode(previewMode)),
        setCurrentItem: (currentItem: CurrentItem | null) => dispatch(setCurrentItem(currentItem)),
        setSelectionRange: (selectionRange: Range | null) =>
          dispatch(setSelectionRange(selectionRange)),
        setTextRange: (textRange: string | null) => dispatch(setTextRange(textRange)),
        setActionType: (actionType: ACTION_TYPE_ENUM | string) =>
          dispatch(setActionType(actionType)),
      }}
    >
      {children}
    </EmailEditorContext.Provider>
  );
};

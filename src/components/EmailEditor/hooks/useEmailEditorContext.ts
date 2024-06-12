import { useContext } from 'react';
import { EmailEditorContext } from '../contexts/EmailEditorContext';

export const useEmailEditorContext = () => {
  const context = useContext(EmailEditorContext);

  if (!context) {
    throw new Error('useEmailEditorContext must be used within a EmailEditorProvider');
  }

  return context;
};

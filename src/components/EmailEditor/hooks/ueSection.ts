import { useCallback } from 'react';

const useSection = () => {
  const getSelectionNode = (node: Node | null, tagName: string): Node | null => {
    if (!node) return null;
    if ((node as HTMLElement).classList?.contains('text-content_editable')) return null;

    if (node && (node as HTMLElement).tagName?.toLocaleLowerCase() === tagName) {
      return node;
    }
    return getSelectionNode(node.parentNode as Node, tagName);
  };

  const getSectionStyle = useCallback((node: Node, styleName: string) => {
    if (!node) return null;
    if ((node as HTMLElement).classList?.contains('text-content_editable')) return null;
    if (node && (node as HTMLElement).style?.[styleName as keyof CSSStyleDeclaration]) {
      return (node as HTMLElement).style[styleName as keyof CSSStyleDeclaration];
    }

    return getSectionStyle(node.parentNode as Node, styleName);
  }, []);

  return { getSelectionNode, getSectionStyle };
};

export default useSection;

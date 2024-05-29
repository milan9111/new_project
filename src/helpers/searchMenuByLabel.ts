interface MenuItem {
  key: string;
  label: string;
  children: MenuItem[];
  path: string;
}

export const searchMenuByLabel = (
  menu: MenuItem[],
  label: string
): MenuItem[] => {
  const result: MenuItem[] = [];
  const lowerCaseLabel = label.toLowerCase();

  menu.forEach((item) => {
    const match = item.label.toLowerCase().includes(lowerCaseLabel);
    const childrenMatches =
      item.children.length > 0 ? searchMenuByLabel(item.children, label) : [];

    if (match || childrenMatches.length > 0) {
      result.push({
        ...item,
        children: childrenMatches.length > 0 ? childrenMatches : [],
      });
    }
  });

  return result;
};

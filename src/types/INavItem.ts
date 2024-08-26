export interface INavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  subItems?: INavItem[];
};

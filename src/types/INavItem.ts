export interface INavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  subItems?: INavItem[];
}

export interface MenuItem {
  name: string;
  href: string;
  subItems?: MenuItem[];
  icon: React.ElementType;
}

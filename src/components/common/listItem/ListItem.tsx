interface ListItemProps {
  item: string;
  id: string;
}

const ListItem: React.FC<ListItemProps> = ({ item, id }: ListItemProps) => {
  return <li id={id}>{item}</li>;
};

export default ListItem;

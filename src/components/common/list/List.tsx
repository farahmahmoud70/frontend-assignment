import ListItem from "../listItem/ListItem";

interface ListProps {
  items: Array<any>;
  id: string;
}

const List: React.FC<ListProps> = ({ id, items }: ListProps) => {
  return (
    <ul id={id}>
      {items.map((item, index) => (
        <ListItem item={item} id={`${id}-item-${index}`} />
      ))}
    </ul>
  );
};

export default List;

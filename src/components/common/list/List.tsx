interface ListProps {
  items: Array<any>;
  id: string;
}

const List: React.FC<ListProps> = ({ id, items }: ListProps) => {
  return <ul id={id}>{items.map((item) => item)}</ul>;
};

export default List;

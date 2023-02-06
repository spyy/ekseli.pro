import ArrowRightCircle from './ArrowRightCircle';



const Firstname = props => {
  const what = props.lastname + '+' + props.item.name;
 
  const onSelect = () => {
    console.log('onSelect');
  }

  return (
    <tr>
      <th scope="row">{ props.number }</th>
      <td>{ props.item.name }</td>
      <td>{ props.item.count }</td>
      <td>
        <ArrowRightCircle useTablet={props.useTablet} url={url} onPress={onSelect} />
      </td>
    </tr>
  );
}


export default Firstname;
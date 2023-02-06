

const Row = props => {
 
  const onSelect = () => {
    console.log('onSelect');
  }

  return (
    <tr>
      <th scope="row">{ props.number }</th>
      <td>{ props.item[0] }</td>
      <td>{ props.item[1] }</td>
      <td>{ props.item[2] }</td>
      <td>{ props.item[3] }</td>
      <td>{ props.item[4] }</td>
      <td>{ props.item[5] }</td>
      <td>{ props.item[6] }</td>
    </tr>
  );
}


export default Row;
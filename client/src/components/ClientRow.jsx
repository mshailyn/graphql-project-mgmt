import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import { GET_PROJECTS } from '../queries/projectQueries'
// import UpdateClientModal from './UpdateClientModal';

//Delete client then update cache so UI updates w/o refresh
function ClientRow({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries:[{ query: GET_CLIENTS }, {query: GET_PROJECTS}],    
  });

  return (
    <tr>
        <td>{ client.name }</td>
        <td>{ client.email }</td>
        <td>{ client.phone }</td>
        <td>
            <button className="btn btn-dark btn-sm mx-2" onClick={deleteClient}>
                <FaTrash />
            </button>
            {/* <UpdateClientModal key={ client.id } client={ client } /> */}
        </td>
    </tr>
  )
}

export default ClientRow
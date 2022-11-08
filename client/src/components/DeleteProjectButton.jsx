import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { GET_PROJECTS} from '../queries/projectQueries';
import { DELETE_PROJECT } from '../mutations/projectMutations';
import { useMutation } from '@apollo/client';

function DeleteProjectButton({ projectId }) {
    //To reroute back to homepage
    const navigate = useNavigate();

    const [deleteProject] = useMutation( DELETE_PROJECT, {
        variables: {id: projectId},
        onCompleted: () => navigate('/'),
        refetchQueries: [{ query : GET_PROJECTS }],
    });

    return (
        <div className='d-flex mt-5 ms-auto'>
            <button className='btn btn-dark m-2' onClick={deleteProject}>
                <FaTrash className='icon' /> Delete Project
            </button>
        </div>
    )
}

export default DeleteProjectButton
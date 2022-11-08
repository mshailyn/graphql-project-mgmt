import { FaEdit } from 'react-icons/fa';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_PROJECTS } from '../queries/projectQueries'
import { UPDATE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';


function UpdateClientModal({ client }) {
    const [name, setName] = useState(client.name);
    const [email, setEmail] = useState(client.email);
    const [phone, setPhone] = useState(client.phone);

    
    const [updateClient] = useMutation( UPDATE_CLIENT, {
        variables: { id: client.id , name, email, phone },
        refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
    });
   

    const onSubmit = (e) => {
        e.preventDefault();

        if( !name || !email || !phone ){
            return alert("Please fill out all fields");
        }

        updateClient( name, email, phone );
    }
  
    return (
        <>
        <button type="button" className="btn p-2 btn-secondary" data-bs-toggle="modal" data-bs-target="#updateClientModal">
            <div className='d-flex align-items-center'>
                <FaEdit />
            </div>
        </button>

        <div className="modal fade" id="updateClientModal" aria-labelledby="updateClientModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="updateClientModalLabel">Update Client</h1>
                <p>{client.id}</p>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form onSubmit={onSubmit}>
                    <div className='mb-3'>
                    <label className='form-label'>Name</label>
                    <input 
                        type='text' 
                        className='form-control' 
                        id='name' 
                        value={name} 
                        onChange={ (e) => setName(e.target.value)}/>
                </div>
                    <div className='mb-3'>
                        <label className='form-label'>Email</label>
                        <input 
                            type='email' 
                            className='form-control' 
                            id='email' 
                            value={email} 
                            onChange={ (e) => setEmail(e.target.value)}/>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Phone Number</label>
                        <input 
                            type='text' 
                            className='form-control' 
                            id='phone' 
                            value={phone} 
                            onChange={ (e) => setPhone(e.target.value)}/>
                    </div>
                    <button type="submit" data-bs-dismiss="modal" className="btn btn-secondary">Submit</button>
                </form>
            </div>
            </div>
        </div>
        </div>
    </>
  )
}

export default UpdateClientModal
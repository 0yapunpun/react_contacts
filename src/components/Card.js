import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";


function Card({user, deleteContact}) {
  let navigate = useNavigate();

  const editCard = () => {
    navigate('/form', { state: user});
  }

  const deleteCard = async () => {
    if (window.confirm('Esta seguro de eliminar este contacto')) {
      let response = await fetch(`/user/deleteUser/${user._id}`);
          response = await response.json();

      if (response.success) {
        deleteContact(user._id) 
      } else {
        alert('No fue posible eliminar el contacto')
      }
    }
  }

  return (
    <div className='card w-50'>
      <div className='d-flex flex-column p-3'>
        <span>Name: {user.name}</span>
        <span>Number: {user.gender}</span>
      </div>

      <div className='card-footer d-flex justify-content-center gap-2'>
        <div className='btn btn-warning' onClick={editCard}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </div>
        <div className='btn btn-danger' onClick={deleteCard}>
          <FontAwesomeIcon icon={faTrash} />
        </div>
      </div>
    </div>
  );
}

export default Card;

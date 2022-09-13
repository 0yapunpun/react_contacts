import { Link, useLocation  } from "react-router-dom";

function Navbar() {
  const location = useLocation()
  console.log(location.pathname)

  return (
    <div className="d-flex flex-column align-items-center">
      <span className="fs-1">Contacts</span>  
      <div className=''>
        {location.pathname == '/list'
          ? <Link to="/form">New</Link>
          : <Link to="/list">List</Link>
        }
      </div>
    </div>
  );
}
 
export default Navbar;

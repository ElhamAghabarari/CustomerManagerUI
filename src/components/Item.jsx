
import { Link } from "react-router-dom";

const Item= (props) => {

    return(
        <li className="item">
            <div className="content">
                {props.src_id===0 && <Link to={`orders/${props.id}`}>{props.children}</Link>}
                {props.src_id>0 && <p>{props.children}</p>}

            </div>
            <div className="button-container">
                <button onClick={() => props.onOpenEdit(props.id)} className="btn edit-btn">Edit</button>
                <button onClick={() => props.onOpenDelete(props.id)} className="btn delete-btn">Delete</button>
            </div>
        </li>
    );
}

export default Item;
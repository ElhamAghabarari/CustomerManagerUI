

const CustomerItem= (props) => {

    return(
        <li className="customer-item">
            <div className="content">
                <p>{props.children}</p>
            </div>
            <div className="button-container">
                <button onClick={() => props.onEditHandler(props.id)} className="btn edit-btn">Edit</button>
                <button onClick={() => props.onDeleteHandler(props.id)} className="btn delete-btn">Delete</button>
            </div>
        </li>
    );
}

export default CustomerItem;
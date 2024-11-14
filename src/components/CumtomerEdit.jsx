import { useRef,useEffect } from "react";

export default function CustomerEdit(props){
    const ref=useRef();

    useEffect(() => {
        ref.current.showModal();
    },[]);

    function onSumbitHandler(event){
        event.preventDefault();

        const data=new FormData(event.target);
        const finalData = Object.fromEntries(data.entries());
        
        props.onEdit({...finalData,id:props.id});
    }

    function onCloseModal(){
        ref.current.close();
        props.onClose();
    }

    return(
        <dialog ref={ref} onClose={onCloseModal}>
            <form onSubmit={onSumbitHandler} method="dialog">

                <div style={{ marginBottom: '20px' }}>
                    <label className="label" htmlFor="id">ID:</label>
                    <input className="input" type="text" id="id" name="id" defaultValue={props.id} disabled required/>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label className="label" htmlFor="name">Name:</label>
                    <input className="input" type="text" id="name" name="name" defaultValue={props.name} required/>
                </div>

                <div className="button-container">
                    <button className="btn edit-btn">{props.id>0?"Update":"Add"}</button>
                    <button onClick={onCloseModal} className="btn delete-btn">Closs</button>
                </div>

                
            </form>
        </dialog>
    )
}
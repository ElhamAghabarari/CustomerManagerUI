import { useRef,useEffect } from "react";
import { useRevalidator } from "react-router-dom";

export default function DeleteDialog(props){
    const validator=useRevalidator();
    const ref=useRef();

    useEffect(() => {
        ref.current.showModal();
    },[]);

    async function  onDeleteHandler(){

        let url="";
        if(props.src_id>0){
            url="https://localhost:7259/api/orders/"+props.id;
        }
        else{
            url="https://localhost:7076/api/customers/"+props.id;
        }

        const res = await fetch(url,{method:"DELETE"});

        if(res.ok){
            onCloseHandler(); 
            validator.revalidate();
        }
    }

    function onCloseHandler(){
        ref.current.close();
        props.onClose();
    }

    return(
        <dialog ref={ref} onClose={onCloseHandler}>
            <span>{`Are you sure you want to delete this ${props.src_id>0?"order":"customer"}?`}</span>

            <div className="button-container">
                <button onClick={onDeleteHandler} className="btn edit-btn">OK</button>
                <button onClick={onCloseHandler} className="btn delete-btn">Cancle</button>
            </div>
        </dialog>
    )
}
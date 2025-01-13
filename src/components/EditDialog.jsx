import { useRef,useEffect } from "react";
import { useRevalidator } from "react-router-dom";

export default function EditDialog(props){
    const validator = useRevalidator();
    const ref=useRef();

    useEffect(() => {
        ref.current.showModal();
    },[]);

    async function  onSumbitHandler(event){
        event.preventDefault();

        const data=new FormData(event.target);
        const finalData = Object.fromEntries(data.entries()); 
        finalData["id"]=props.id;

        var url="";
        
        if(props.src_id>0){
            url="https://localhost:7259/api/orders";
            finalData["customerid"]=props.src_id;
        }
        else{
            url="https://localhost:7076/api/customers";
        }

        const res = await fetch(url,{method:(props.id>0 ? "POST":"PUT") ,body:JSON.stringify(finalData),headers:{'content-type': 'application/json'}});

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
            <form onSubmit={onSumbitHandler} method="dialog">

                <div style={{ marginBottom: '20px' }}>
                    <label className="label" htmlFor="id">Id:</label>
                    <input className="input" type="text" id="id" name="id" defaultValue={props.id} disabled required/>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label className="label" htmlFor="name">Name:</label>
                    <input className="input" type="text" id="name" name="name" defaultValue={props.name} required/>
                </div>

                <div className="button-container">
                    <button className="btn edit-btn">{props.id>0 ? "Update":"Add"}</button>
                    <button type="button" onClick={onCloseHandler} className="btn delete-btn">Close</button>
                </div>
                
            </form>
        </dialog>
    )
}

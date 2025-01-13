import { Suspense, useRef, useState } from 'react';
import Item from './Item';
import './List.css'
import {useLoaderData , useParams, Await} from "react-router-dom";
import EditDialog from "./EditDialog.jsx"
import DeleteDialog from "./DeleteDialog.jsx"
import Search from "./Search.jsx"
import { useQuery } from '@tanstack/react-query';
const List= () => {

    const timeoutparam = useRef();
    const [changeStatus,setChangeStatus]=useState({editing:-1,deleting:-1})
    const [searchText,setSearchText] =useState("");
    const customerInfo=useLoaderData();
    const param=useParams();
    
    var querykey,queryFunc;
    if(param.src_id>0){
        queryFunc=() => loadListOrder({search:searchText,src_id:param.src_id});
        querykey='ListOrder'
    }
    else{
        queryFunc=() => loadListCustomer({search:searchText});
        querykey='ListCustomer'
    }
    const { data, isPending, isError, error } = useQuery({queryKey:[querykey,param.src_id,searchText],queryFn:queryFunc});
    
    //---edit dialog
    function OpenDialogEditHandler(id){
        setChangeStatus({editing:id,deleting:-1})
    }

    //---delete dialog
    function OpenDialogDeleteHandler(id){
        setChangeStatus({editing:-1,deleting:id})
    }

    function CloseDialogHandler(){
        setChangeStatus({editing:-1,deleting:-1})
    }

    function changeSearchHandler(event){
        if(timeoutparam.current) clearTimeout(timeoutparam);

        timeoutparam.current = setTimeout(() => {
            timeoutparam.current=null;
            setSearchText(event.target.value)
        }, 500);
    }

    function clickSearchHandler(){

    }

    return(
        <>
            {changeStatus.editing!=-1 && <EditDialog id={changeStatus.editing} name={changeStatus.editing>0 ? data.filter((x) => x.id===changeStatus.editing)[0]?.name :""} src_id={param.src_id || 0} onClose={CloseDialogHandler}/>}
            {changeStatus.deleting!=-1 && <DeleteDialog id={changeStatus.deleting} src_id={param.src_id || 0} onClose={CloseDialogHandler}/>}

            <div className="head-list">

                <div style={{display:'flex',justifyContent: 'space-between'}}>
                    <button onClick={() => OpenDialogEditHandler(0)} className="btn edit-btn">{param.src_id ? "Add Order":"Add Customer"}</button>
                    <Search onClick={clickSearchHandler} onChange={changeSearchHandler}/>
                </div>
                
                {customerInfo && <div style={{textAlign:'center'}}>
                    <h3>{`Customer: ${customerInfo.name}`}</h3>
                </div>}
                

                {isPending && <p style={{textAlign:'center'}}>Loading...</p>}

                {isError && <p style={{textAlign:'center'}}>{error.info?.message ||'Failed to load list.'}</p>}
    
                {data && (
                    (data.length==0 && <p style={{textAlign:'center'}}>There is no {param.src_id?"order":"customer"}!</p>) ||
                    (data.length>0 && <ul className="list"> 
                        {data.map((item) => <Item key={item.id} id={item.id} src_id={param.src_id || 0} onOpenEdit={OpenDialogEditHandler} onOpenDelete={OpenDialogDeleteHandler}>{item.name}</Item>)}   
                    </ul>))}

                {/*<Suspense fallback={<p style={{textAlign:'center'}}>Loading...</p>}>
                    <Await resolve={list}>
                        {
                            (datalist) => <ul className="list">
                                {datalist.map((item) => <Item key={item.id} id={item.id} src_id={param.src_id || 0} onOpenEdit={OpenDialogEditHandler} onOpenDelete={OpenDialogDeleteHandler}>{item.name}</Item>)}   
                            </ul>
                        }
                    </Await>
                </Suspense>*/}
            </div>
        </>
    );
}

/*async function loadList(params)  {

    const res = await fetch(params.src_id ? "https://localhost:7259/api/orders/customerOrders/"+params.src_id: "https://localhost:7076/api/customers");

    if(res.ok) {
        const resData= await res.json();
        return(resData)
    }
    else{
        throw new Response(JSON.stringify({message:'Can not load list.'}),{status:500});
    }
}

export function loader({params})  {

    return {
        list:loadList(params)
    }
}*/

async function loadListCustomer({search})  {

    const res = await fetch("https://localhost:7076/api/customers"+(search?"?search=":"")+search);

    if(res.ok) {
        const resData= await res.json();
        return(resData)
    }
    else{
        throw new Response(JSON.stringify({message:'Can not load list.'}),{status:500});
    }
}

async function loadListOrder({search,src_id})  {

    const res = await fetch("https://localhost:7259/api/orders/customerOrders/"+src_id+(search?"?search=":"")+search);

    if(res.ok) {
        const resData= await res.json();
        return(resData)
    }
    else{
        throw new Response(JSON.stringify({message:'Can not load list.'}),{status:500});
    }
}

export async function OrderLoader({params})  {

    const res = await fetch("https://localhost:7076/api/customers/"+params.src_id);

    if(res.ok) {
        const resData= await res.json();
        return(resData)
    }
    else{
        throw new Response(JSON.stringify({message:'Can not load info.'}),{status:500});
    }
}

export default List;
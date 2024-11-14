import { useEffect ,useState} from "react";  
import './CustomerList.css'
import CustomerItem from './CustomerItem.jsx'
import CustomerEdit from './CumtomerEdit.jsx'

const CustomerList= () => {
    const [customers,setCustomers] = useState({list:[],selected:-1});

    useEffect(() => {
        async function getCustomerList()  {

            const res = await fetch("https://localhost:7076/api/customers");

            if(res.ok) {
                const resData= await res.json();
                setCustomers({list:resData,selected:-1});
            }
        }

        getCustomerList();
    },[]);

    async function onDeleteHandler(id){
        const res = await fetch("https://localhost:7076/api/customers/"+id,{method: "DELETE"});

        if(res.ok){
            setCustomers((pre) => {
                return {selected:-1, list:pre.list.filter((item) => item.id!=id)};
            });
        }
    };

    function onEditHandler(id){
        setCustomers((pre) => {
            return {...pre, selected:id};
        });
    };

    function onCloseHandler(){
        setCustomers((pre) => {
            return {...pre, selected:-1};
        });
    };

    async function onUpdateHandler(newItem){
        var body = JSON.stringify(newItem)
        const method=newItem.id>0?"POST":"PUT";

        const res = await fetch("https://localhost:7076/api/customers",{method:method ,body:body,headers:{'content-type': 'application/json'}});

        if(res.ok){
            
            if(newItem.id>0){
                setCustomers((pre) => {
                    return {list:[...pre.list.filter(item => item.id!=newItem.id),newItem], selected:-1};
                });
            }
            else{
                const newId= await res.json();
                newItem.id=newId;
                
                setCustomers((pre) => {
                    return {list:[...pre.list,newItem], selected:-1};
                });
            }
        }
    };

    return(
        <>
            
            {customers.selected>=0 && <CustomerEdit 
                onClose={onCloseHandler} 
                onEdit={onUpdateHandler}
                id={customers.selected} 
                name={customers.selected>0 ? customers.list.find((item) => item.id==customers.selected).name : ""}/>}
                
            

            <ul className="customer-list">
                <button onClick={() => onEditHandler(0)} className="btn edit-btn">Add</button>

                {customers.list.map((item) => <CustomerItem key={item.id} id={item.id} onEditHandler={onEditHandler} onDeleteHandler={onDeleteHandler}>{item.name}</CustomerItem>)}
                
            </ul>

            
        </>
    );
}

export default CustomerList;
import { useRouteError } from "react-router-dom";   

export default function Error (){
    const error=useRouteError();

    var title="";
    var msg="";
    if(error.status===500){
        title=error.status +": Bad request! ";
        msg=JSON.parse(error.data).message;
    }
    if(error.status===404){
        title=error.status +": Not found! ";
        msg="Could not find page";
    }
    return (<div style={{textAlign: 'center',width:'100%', position:"fixed"}}>
      <h1>{title}</h1>
      <p>{msg}</p>
    </div>);
}
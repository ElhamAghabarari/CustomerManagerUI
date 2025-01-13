
import './App.css'
import List,{OrderLoader} from './components/List.jsx'
import Error from './components/Error.jsx'
import Header from './components/Header.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'   
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


function App() {


  const router=createBrowserRouter([
    {path:"/",element:<Header/>,children:[
      {index:true,element:<List/>,errorElement:<Error/>/*,loader:listLoader,children:[
        {path:"customer/:customer_id/edit",element:<EditDialog/>,errorElement:<Error/>,loader:customerInfoLoader},
        {path:"customer/:customer_id/delete",element:<DeleteDialog/>,errorElement:<Error/>},
      ]*/},
      {path:"orders/:src_id",element:<List/>,errorElement:<Error/>, loader:OrderLoader/*,children:[
        {path:"edit/:order_id",element:<EditDialog/>,errorElement:<Error/>,loader:orderInfoLoader},
        {path:"delete/:order_id",element:<DeleteDialog/>,errorElement:<Error/>}
      ]*/}
      
    ]}
  ]);

  const queryClient=new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
    
  )
}

export default App

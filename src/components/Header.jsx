import classes from './Header.module.css'
import { Outlet,Link ,useParams} from 'react-router-dom';

const Header=()=>{
    const params=useParams();

    return(
        <>
            <header className={classes.header}>
                {params.src_id>0 && <Link className="back-link" to=".." >Back</Link>}

                <h1 className={classes.title}>CustomerManagement</h1>
            </header>
            <Outlet/>
        </>
        
    );
}

export default Header;
import style from './admin.module.css';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {useState} from 'react';
import {AllProductsDb} from './AllProductsDb';
import {useDispatch} from 'react-redux';
import {showProductsDb} from '../../fetchs/fetchsAdmin';


export const Admin = () => {
const dispatch = useDispatch();
const {user} = useTypedSelector(store => store.main);
const[allProductsDb, setallProductsDb] = useState(false);
const[uppdateOne, setUppdateOne] = useState(false);
const[deleteOne, setDeleteOne] = useState(false);


    return (
        <>
            {user.role === "admin"
            ?   <div>
                    <div>Hello admin {user.userName}</div>
                    <div>
                    {!allProductsDb &&
                        <button onClick={()=>{setallProductsDb(true); showProductsDb(dispatch); setUppdateOne(false); setDeleteOne(false)}}>See All</button>
                    }
                    </div>
                    <div>
                        {allProductsDb && <AllProductsDb/>}
                    </div>
                </div>
            : <div>You are not admin</div>
            }
            
        </>
    )
}
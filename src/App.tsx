import  style from './app.module.css';
import {ProductList} from './components/ProductList/ProductList';
import { useTypedSelector } from './hooks/useTypedSelector';
import {Routes, Route} from 'react-router-dom';
import {Layout} from './components/Layout/Layout';
import {ProductCard} from './components/ProductCard/ProductCard';
import { TProduct } from './types/TProduct';
import {NotFound} from './components/NotFound/NotFound';
import {useLocalStorage} from './hooks/useLocalStorage';
import {Admin} from './components/Admin/Admin';
import {ComentsProduct} from './components/Coments/ComentsProduct';
import {GPT} from './components/GPT/GPT'

function App() {
  const [favorites, setFavorites] = useLocalStorage('favorites', [])
  const {allProducts, productForRoute} = useTypedSelector(store =>store.products);
  const productFindForRoute = (productForRoute: TProduct) => {
      let result: TProduct = {
        _id: '',
        name: '',
        img: '',
        discription: '',
        price: 0,
        pictures: [''],
        oldPrice: 0,
        presence: 0,
      }
    allProducts.forEach((item) => productForRoute._id === item._id ? result = item : null)
      return result
  }

  return (
    <Routes>
      <Route path='/'
        element={<Layout favorites={favorites} setFavorites={setFavorites}/>}
      >
        <Route index 
          element={
            <ProductList 
              favorites={favorites} 
              setFavorites={setFavorites}
            />
          }
        />
        <Route path={`product${productForRoute._id}`} 
          element={
            <div className={style.productCardWrapper}>
              <div className={style.productCard}>
                <ProductCard 
                    product={productFindForRoute(productForRoute)} 
                    favorites={favorites} 
                    setFavorites={setFavorites}
                />
              </div>
              <div className={style.coments}>
                <ComentsProduct product={productForRoute}/>
              </div>
            </div>
          }
        />
        <Route path='admin' element={<Admin/>}/>
        <Route path='GPT' element={<GPT/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Route>
    </Routes>
  )
}

export default App;

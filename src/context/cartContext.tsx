import { AddToCartAction } from '@/cartACTIONS/addToCart';
import { cartUpdateAction } from '@/cartACTIONS/cartUpdate';
import { clearCartAction } from '@/cartACTIONS/clearCart';
import { getUserCartAction } from '@/cartACTIONS/getUserCart'
import { removeCartItemAction } from '@/cartACTIONS/removeCartItem';
import { cart, CartProduct } from '@/types/cart.type';
import React, { createContext, useEffect, useState } from 'react'


type CartContextType = {
  numOfCart: number;
  products: CartProduct[];
  totalPrice: number;
  isLoading: boolean;
  addProductToCart: (id: string) => Promise<CartProduct | void>;
  removeCartItem: (id: string) => Promise<void>;
  updateCart: (id: string, count: number) => Promise<void>;
  clearCart: () => Promise<void>;
  cartId: string;
  afterPayment: () => void;
};


export const cartContext = createContext<CartContextType>({
  numOfCart: 0,
  products: [],
  totalPrice: 0,
  isLoading: false,
  addProductToCart: async () => {},
  removeCartItem: async () => {},
  updateCart: async () => {},
  clearCart: async () => {},
  cartId: '',
  afterPayment: () => {},
});


function CartContextProvider({children} : {children : React.ReactNode}) {


const [numOfCart, setNumOfCart] = useState(0)
const [totalPrice, setTotalPrice] = useState(0)
const [isLoading, setIsLoading] = useState(false)
const [cartId, setCartId] = useState('')

const [products, setProducts] = useState<CartProduct[]>([])


 function afterPayment (): void {
  setCartId('')
  setNumOfCart(0)
  setTotalPrice(0)
  setProducts([])
}

async function addProductToCart(id : string){

try {
const data =await AddToCartAction(id)
await getUserCart()

  return data
} catch (error) {
  console.log(error);
  
}
}
async function removeCartItem(id:string){
try {
    
    const data:cart = await removeCartItemAction(id)
setNumOfCart(data.numOfCartItems)
setProducts(data.data.products)
setTotalPrice(data.data.totalCartPrice)


} catch (error) {
    console.log(error);

}

}

async function getUserCart (){
setIsLoading(true)
try {
    
    const data:cart = await getUserCartAction()
setNumOfCart(data.numOfCartItems)
setProducts(data.data.products)
setTotalPrice(data.data.totalCartPrice)
setCartId(data.cartId)
  setIsLoading(false)

} catch (error) {
    console.log(error);
    setIsLoading(false)

}
    
}

async function updateCart(id : string , count :number) {
  try {
    const data = await cartUpdateAction(id , count)
    setNumOfCart(data.numOfCartItems)
setProducts(data.data.products)
setTotalPrice(data.data.totalCartPrice)
  } catch (error) {
    console.log(error);
    
  }
}

async function clearCart(){
try {
  const data = await clearCartAction()
    setNumOfCart(0)
setProducts([])
setTotalPrice(0)
  
} catch (error) {
  throw Error('error')
}

}

useEffect(function (){

    getUserCart()
} , []) 

  return (
    <cartContext.Provider value={{
numOfCart,
products ,
totalPrice,
isLoading ,
addProductToCart,
removeCartItem,
updateCart,
clearCart,
cartId,
afterPayment,
    }}>

        {children}
    </cartContext.Provider>
  )
}

export default CartContextProvider
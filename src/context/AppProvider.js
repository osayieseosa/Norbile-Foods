import { createContext, useState, useEffect } from "react";
import useScrollPosition from "../Hooks/useScrollPostion";
import axios from "../api/axios";

const AppContext = createContext({})

export const AppProvider = ({children}) => {
    const [fixed, setFixed] = useState(false);
  const [menu, setMenu] = useState(false);
  const [headerHeight, setHeaderHeight] = useState()
  const [cart, setCart ] = useState([])
  const [location, setLocation] = useState('');
  const [items, setItems] = useState([]);
  const [address, setAddress] = useState('')
  const [editFood, setEditFood] = useState({})
  const [tel, setTel] = useState('')
  const [prices, setPrices] = useState('')
  const scrollPosition = useScrollPosition();
  const [charges, setCharges] = useState();
  const [delivery, setDelivery] = useState({});
  const [id, setId] = useState('')
  const lga = [
    { location: "oredo", price: "1000" },
    { location: "egor", price: "2000" },
    { location: "ikpoba-okha", price: "2500" },
    { location: "ovia north east", price: "1500" },
  ];
  const loadFoodItems = async () => {
    try {
      const response = await axios.get("/food");
      setItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadPrices = async () => {
    try{
      const response = await axios.get('/prices')
        setId(response.data[0]._id)
        setCharges(response.data[0].charges);
        setDelivery(response.data[0].delivery);
    }catch(error) {
      console.log(error)
    }
  }
  useEffect(() => {
    loadFoodItems()
    loadPrices()
  },[])
  const addToCart = (item) => {
    const isItemInCart = cart.find((cartItem) => cartItem.name === item.name)
    if(isItemInCart){
        setCart(
            cart.map((cartItem) => 
            cartItem.name === item.name? {...cartItem,quantity: cartItem.quantity+1}: cartItem
            )
        )
    }else{
        setCart([...cart, {...item, quantity: 1}])
    }
  }
  const removeFromCart = (item) => {
    const isItemInCart = cart.find((cartItem) => cartItem.name === item.name)
    if(isItemInCart.quantity === 1){
        setCart(
            cart.filter((cartItem) => 
            item.name !== cartItem.name
            )
        )
    }else{
        setCart(
            cart.map((cartItem) => cartItem.name === item.name? {...cartItem, quantity: cartItem.quantity - 1}: cartItem)
        )
    }
}
    return (
        <AppContext.Provider value={{menu, setMenu, scrollPosition, fixed, setFixed, cart, setCart, addToCart, removeFromCart,headerHeight, setHeaderHeight,location, setLocation,delivery, address, setAddress,tel, setTel,items, setItems, loadFoodItems, editFood, setEditFood, prices, setPrices,setDelivery,charges, setCharges, loadPrices,id,lga}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext
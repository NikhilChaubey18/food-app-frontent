import { useGetMyRestaurant } from "@/api/MyRestaurantApi"
import MenuItem from "@/components/MenuItem";
import RestaurantInfo from "@/components/ReastaurantInfo";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useParams } from "react-router-dom"
import { Card, CardFooter} from "@/components/ui/card";
import OrderSummary from "@/components/OrderSummary";
import { useState } from "react";
import {MenuItem as MenuItemType} from "../types";
import { set } from "react-hook-form";
import CheckoutButton from "@/components/CheckoutButton";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}


const DetailPage = () => {
  const {restaurantId} = useParams();
  const { restaurant, isLoading } = useGetMyRestaurant(restaurantId);

  const [cartItems, setCartItems] = useState<CartItem[]>(()=>{
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

const addToCart = (menuItem: MenuItemType) => {
  setCartItems((prevCartItems) => {
    // 1 check if item is already in the cart
    const existingCartItem = prevCartItems.find(
      (carItem) => carItem._id === menuItem._id);

      let updatedCartItems;
    //2 if item is in cart, update the quantity
    if(existingCartItem){
      updatedCartItems = prevCartItems.map((cartItem) => 
        cartItem._id === menuItem._id? {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          }: cartItem
      )
    }else{
      updatedCartItems = [ 
        ...prevCartItems,
        {
          _id: menuItem._id,
          name: menuItem.name,
          price: menuItem.price,
          quantity: 1,
        },
      ];
    }
    sessionStorage.setItem( `cartItems-${restaurantId}`, JSON.stringify(updatedCartItems));
    return updatedCartItems;
    //3 if item is not in cart, add it as a new item
  });
};


const removeFromCart = (cartItem: CartItem) => {
  setCartItems((prevCartItems) => {
    const updatedCartItems = prevCartItems.filter(
      (item) => item._id !== cartItem._id
    );
    return updatedCartItems;
  });
};

const onCheckout = (userFormData:UserFormData) => {
     console.log("userFormData",userFormData)
}

  if (isLoading || !restaurant) {
    return "Loading...";
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
      <img src={restaurant.imageUrl}  className=" round -md object-cover h-full w-full" />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr-2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={ restaurant } />
          <span className="text-2xl  font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem) => (
            <MenuItem menuItem={menuItem} addToCart={() => { addToCart(menuItem)}} />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary restaurant={restaurant} cartItems={cartItems} removeFromCart={removeFromCart} />
          </Card>
          <CardFooter>
            <CheckoutButton 
              onCheckout={onCheckout} 
              disabled={cartItems.length === 0} 
              isLoading={false} 
            />
          </CardFooter>
        </div>  
      </div>
    </div>
  )
}

export default DetailPage
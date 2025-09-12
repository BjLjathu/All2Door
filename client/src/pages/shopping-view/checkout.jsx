import { useSelector } from "react-redux";
import img from "../../assets/account.jpg";
import Address from "./address";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);

    const totalCardAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={img}
          alt=""
          className="h-full w-full object-cover object-center "
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
        <Address />

        <div className="flex flex-col gap-5">
        {cartItems && cartItems.items && cartItems.items.length > 0
          ? cartItems.items.map((item) => (
              <UserCartItemsContent cartItem={item} />
            ))
          : null}

           <div className="flex justify-between ">
        <span className="font-bold ">Total</span>
        <span className="font-bold ">${totalCardAmount}</span>
      </div>
      </div>
      </div>
      
    </div>
  );
}

export default ShoppingCheckout;

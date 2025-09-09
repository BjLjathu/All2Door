import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import { Link, useNavigate,  } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "@radix-ui/react-label";



function MenuItems() {
const navigate = useNavigate()
function handleNavigate(getCurrentMenuItem) {
  sessionStorage.removeItem('filters')
  const currentFilter = getCurrentMenuItem.id !=='home' ? {
    category : [getCurrentMenuItem.id]
  } : null

  sessionStorage.setItem('filters',JSON.stringify(currentFilter))
  navigate(getCurrentMenuItem.path)
}
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={()=>handleNavigate(menuItem)}
          className="text-sm font-medium cursor-pointer"
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openCartSheet, setOpenCartSheet] = useState(false);
  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    dispatch(fetchCartItems(user.id));
  }, [dispatch]);
  console.log(cartItems, "jathu");

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-2 ">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          className=""
          size="icon"
          variant="outline"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="sr-only">User Cart</span>
        </Button>
        <UserCartWrapper
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg=black text-white font-extrabold">
              {user?.userName?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56 bg-white">
          <DropdownMenuLabel>Logged in as {user.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className="mr-2 h-4 w-4" />
            Accoun t
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 w-4 h-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
function ShoppingHeader() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  console.log(user, "userDetails");

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-backgroud ">
      <div className="flex h-16 items-center justify-between px-4 md:px-6 ">
        <Link to="/shop/home" className="flex items-center gap-2 ">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">All2Door</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />{" "}
              <span className="sr-only">Toggle Header Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs bg-white p-5">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="lg:block hidden">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;

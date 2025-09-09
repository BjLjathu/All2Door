import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { setProductDetails } from "@/store/shop/product-slice";
import { StarIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function ProductDetails({ open, setOpen, productDetails }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  //this is for the handling the add to card to the shop

  function handleAddtoCard(getCurrentProductId) {
    if (!user?.id) {
      alert("You must log in first");
      return;
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
      }
      toast("item added to the card Successfully");
    });
  }

  function handledialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
  }
  return (
    <Dialog open={open} onOpenChange={handledialogClose}>
      <DialogContent className="bg-gray-200 grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-b-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            with={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="">
          <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-forground text-2xl mb-5 mt-4">
              {productDetails?.description}
            </p>{" "}
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-forground">
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
            </div>
            <span className="text-muted-forground">(4.5)</span>
          </div>
          <div className="mt-5 mb-5">
            <Button
              className="w-[100px] mx-auto bg-blue-500 text-white font-medium px-2 py-1 rounded-md shadow hover:bg-blue-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300  cursor-pointer"
              onClick={() => handleAddtoCard(productDetails?._id)}
            >
              Add to Card
            </Button>
          </div>
          <Separator className="bg-gray-500" />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1 ">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold ">Sangam Mukhejee</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                  </div>
                  <p className="text-muted-forground">
                    This is a Awsome Product{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid gap-6">
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1 ">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold ">Sangam Mukhejee</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                  </div>
                  <p className="text-muted-forground">
                    This is a Awsome Product{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid gap-6">
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1 ">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold ">Sangam Mukhejee</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                  </div>
                  <p className="text-muted-forground">
                    This is a Awsome Product{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <Input placeholder="Write a Reviw..." />
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetails;

import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTow from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heading,
  Heater,
  icons,
  Image,
  Shirt,
  ShirtIcon,
  ShoppingBagIcon,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductsDetails } from "@/store/shop/product-slice";
import ShoppingProductTile from "./product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "sonner";
import ProductDetails from "./productDetails";

function ShoppingHome() {
  const slides = [bannerOne, bannerTow, bannerThree];
  const dispatch = useDispatch();
  const { productList , productDetails  } = useSelector((state) => state.shopProducts);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const {user} = useSelector(state=>state.auth)
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate()
  const categoriesWithIcon = [
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: CloudLightning },
    { id: "kids", label: "Kids", icon: BabyIcon },
    { id: "accessories", label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
  ];
  const brandwithIcon =[
      { id: "nike", label: "Nike" ,icon :Shirt },
      { id: "adidas", label: "Adidas" , icon:WashingMachine },
      { id: "puma", label: "Puma" , icon : ShoppingBagIcon },
      { id: "levi", label: "Levi"  , icon:Airplay},
      { id: "Zara", label: "Zara" , icon: Image},
      { id: "h&m", label: "H&M" , icon:Heater },
    ]

    function handleNavigateToListingPage(getCurrentItem , section) {
      sessionStorage.removeItem('filters')
      const currentFilter = {
        [section] :[getCurrentItem.id]
      }
      sessionStorage.setItem('filters' , JSON.stringify(currentFilter))
      navigate('/shop/listing')
    }


    function handleGetProductDetails(getCurrentProductId) {
        dispatch(fetchProductsDetails({ id: getCurrentProductId }));
      }
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
      if(data?.payload?.success){
        dispatch(fetchCartItems(user?.id))
      }
      toast("item added to the card Successfully")
    });
  }

    useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  });

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price Low to High",
      })
    );
  }, dispatch);

  console.log(productList, "productList");

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            src={slide}
            key={index}
            className={` ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } absolute top-0 left-0 w-full h-full object-cover transition-opacity mx-auto duration-1000`}
          />
        ))}
        <Button
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
            )
          }
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 cursor-pointer "
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
          }
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80  cursor-pointer"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            {" "}
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card onClick={()=>handleNavigateToListingPage(categoryItem ,'category' )} className="cursor-pointer hover:shadow-lg transition-shadow ">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            {" "}
            Shop by Brand
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandwithIcon.map((brandItem) => (
              <Card  onClick={()=>handleNavigateToListingPage(brandItem ,'brand' )}  className="cursor-pointer hover:shadow-lg transition-shadow ">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4 ">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
            {
              productList && productList.length >0 ? productList.map(productItem=> <ShoppingProductTile handleAddtoCard={handleAddtoCard} handleGetProductDetails={handleGetProductDetails} product={productItem} /> ) :null
            }
          </div>
        </div>
      </section>
       <ProductDetails
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;

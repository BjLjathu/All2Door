import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardFooter} from "@/components/ui/card"

function ShoppingProductTile({ product ,handleGetProductDetails,handleAddtoCard }) {
  return (
    <Card className="w-full  max-w-sm mx-auto">
      <div onClick={()=>handleGetProductDetails(product?._id)} >
      <div className="relative   ">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-[200px] object-cover rounded-b-lg"
        />
        {product?.salePrice > 0 ? (
          <Badge className="absolute top-2 left-2 bg-red-500 text-white hover:bg-red-600">
            Sale
          </Badge>
        ) : null}
      </div>
      </div>
      <CardContent className="p-1 ">
        <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
        <div className="flex item-center justify-between uppercase ">
          <span className="text-[16px] text-muted-foreground">
            {product?.category}
          </span>
          <span className="text-[16px] text-muted-foreground">
            {product?.brand}
          </span>
        </div>
        <div className="flex item-center justify-between uppercase">
          <span
            className={`${
              product?.salePrice > 0 ? "line-through" : ""
            } text-lg font-semibold text-primary`}
          >
            ${product?.price}
          </span>
          {product?.salePrice > 0 ? (
            <span className="text-lg font-semibold text-primary">
              ${product?.salePrice}
            </span>
          ) : (
            ""
          )}
        </div>
      </CardContent>
      <CardFooter >
        <Button onClick={()=>handleAddtoCard(product?._id)} className='w-[100px] mx-auto bg-blue-500 text-white font-medium px-2 py-1 rounded-md shadow hover:bg-blue-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 '>Add to Card</Button>
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile

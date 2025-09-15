import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

function ShoppingProductTile({ product, handleGetProductDetails, handleAddtoCard }) {
  return (
    <Card className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border-0">
      <div onClick={() => handleGetProductDetails(product?._id)} className="cursor-pointer">
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[220px] object-cover rounded-lg transition-transform duration-300 hover:scale-105"
          />
          {product?.salePrice > 0 && (
            <Badge className="absolute top-3 left-3 bg-red-500 text-white font-medium px-2 py-1 rounded-lg shadow">
              Sale
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        <h2 className="text-lg md:text-xl font-semibold mb-2 text-gray-800 hover:text-primary transition-colors duration-200">
          {product?.title}
        </h2>

        <div className="flex justify-between text-sm text-gray-500 mb-3 uppercase tracking-wide">
          <span>{product?.category}</span>
          <span>{product?.brand}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className={`text-lg font-bold ${product?.salePrice > 0 ? "line-through text-gray-400" : "text-primary"}`}>
            ${product?.price}
          </span>
          {product?.salePrice > 0 && (
            <span className="text-lg font-bold text-primary">
              ${product?.salePrice}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="px-4 pb-4">
        <Button
          onClick={() => handleAddtoCard(product?._id)}
          className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;

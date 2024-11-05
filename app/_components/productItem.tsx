import { Card, CardContent } from "app/_components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  productTitle: string;
  description: string;
  price: number;
  imageUrl: string;
  league: string;
  team: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ProductItemProps {
  product: Product;
}
const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <Card className="max-w-[200px]">
      <CardContent className="p-0">
        <div className="relative h-[200px] w-[200px] border-b-2 border-b-amber-300">
          <Image
            alt={product.productTitle}
            src={product.imageUrl}
            fill
            className="object-cover rounded-t-xl"
          />
        </div>
        <div className="flex flex-col items-center gap-1 py-3">
          <p className="text-xs text-center h-[30px]">{product.productTitle}</p>
          <p className="font-semibold">R${product.price.toFixed(2)}</p>
          <button className="px-5 py-2 font-bold text-white text-sm bg-amber-600 rounded-3xl">
            <Link href={`/products/${product.id}`}>Comprar</Link>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductItem;

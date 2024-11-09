import { db } from "@/lib/prisma";
import ProductDetails from "@/components/productDetails";
import { auth, currentUser } from "@clerk/nextjs/server";

interface ProductsPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params }: ProductsPageProps) => {
  const { id } = await params; // Next require this, unless shows a annoying warning

  const user = await currentUser();

  const product = await db.product.findUnique({
    where: {
      id: id,
    },
  });

  if (!product) {
    return <p className="p-4">Product not found</p>;
  }

  return (
    <>
      <h1 className=" text-gray-400 p-4">{`Início > ${product?.league} > ${product?.team}`}</h1>
      <div className="px-4 pb-4">
        <ProductDetails product={product} userId={user?.id} />
      </div>

      {/* <Card className="px-4 bg-gray-100">
        <CardContent className="p-0">
          <div className="relative h-[450px]">
            <Image
              alt={product?.productTitle || "Product image"}
              src={product?.imageUrl || "GKlogo.svg"}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4 flex flex-col gap-2 items-start">
            <h1>{product?.productTitle}</h1>
            <p className="font-semibold">R${product?.price.toFixed(2)}</p>
            <p className="text-md">Tamanho:</p>
            <div className="flex gap-2">
              <ShirtSizes />
            </div>
            <p>Personalização:</p>
            <CustomizationSelector />
            <div className="flex justify-between w-full">
              <ProductQuantity />
              <button className="px-5 font-bold text-white text-sm bg-amber-600 rounded-3xl">
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </CardContent>
      </Card> */}
    </>
  );
};

export default ProductPage;

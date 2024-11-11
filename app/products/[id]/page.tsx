import { db } from "@/lib/prisma";
import ProductDetails from "@/components/productDetails";
import { currentUser } from "@clerk/nextjs/server";



const ProductPage = async ({ params }: any) => {
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
    </>
  );
};

export default ProductPage;

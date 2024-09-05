import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Pencil } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useDeleteDashboardProductsMutation, useGetDashboardProductsQuery } from '@/app/services/ApiSlice';
import { SkeletonDashboard } from './SkelatonDashboard';
import { Link } from 'react-router-dom';
import { AlertDialogCustom } from '@/shared/AlertDialogueCustom';
import { AlertDeleteDialogue } from '@/shared/AlertDeleteDialogue';

interface ProductAttributes {
  title: string;
  image: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
  price: number;
  stock: number;
  rate: number;
  des: string;
}

type Product = {
  id: string;
  title: string;
  price: number;
  attributes: ProductAttributes;
};

interface ProductCardProps {
  id: string | number; // Adjust based on the type of your id
  attributes: ProductAttributes;
}

const ITEMS_PER_PAGE = 5;

const DashboardProductsTable: React.FC<ProductCardProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [clikedProductId,setClikedProductId]=useState(null)
  const { isLoading, data, error } = useGetDashboardProductsQuery(
    { page:currentPage });
 console.log(error);
 const [destroyProduct,{isLoading:isDestroy,
  isSuccess}]=  useDeleteDashboardProductsMutation();

  useEffect(() =>{
  if(isSuccess){
    setClikedProductId(null)
    setIsDeleteOpen(false)
  }
  },[isSuccess])
 
  if (isLoading) return <SkeletonDashboard />;
  // if (error) return <div>Error: {error.message}</div>;

   const products = data?.data || []; // Assuming `data?.data` is the array of products

  const handleDelete = (id: string) => {
    // Handle delete logic here
    console.log('Delete product with id:', id);
    setIsDeleteOpen(true);
  };

  const handleEdit = (id: string) => {
    // Handle edit logic here
    console.log('Edit product with id:', id);
    setIsOpen(true); // Open the dialog when edit is clicked
  };

  const handleNextPage = () => {
    if (products.length === ITEMS_PER_PAGE) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <>
     <div className="w-full mb-56">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.length > 0 ? (
              products?.map((product: Product) => (
                <TableRow key={product.id}>
                  <TableCell>{product?.id}</TableCell>
                  <TableCell>{product?.attributes?.title}</TableCell>
                  <TableCell>{`$${product?.attributes?.price.toFixed(2)}`}</TableCell>
                  <TableCell>
                    <div className="flex justify-items-end items-center gap-3">
                      <Button onClick={() =>{
                        handleDelete(product.id)
                        setClikedProductId(product.id)
                      } }
                      className='bg-red-500 px-7'>
                        <Trash2 />
                      </Button>
                      <Button onClick={()=>{handleEdit(product.id)}}
                      className='bg-green-500 px-7'>
                        <Pencil />
                      </Button>
                         <Link
                           to={`/Products/${product?.id}`}>
                          <Button 
                             className="px-4 bg-cyan-600">
                               Detail
                           </Button> 
                        </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No products available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between mt-4">
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <Button onClick={handleNextPage} disabled={products.length < ITEMS_PER_PAGE}>
          Next
        </Button>
      </div>
    </div>

    <AlertDialogCustom 
    onOpen={() => setIsOpen(true)} 
    onClose={() => setIsOpen(false)} 
    isOpen={isOpen} />

    <AlertDeleteDialogue
     onOpen={() => setIsDeleteOpen(true)} 
     onClose={() => setIsDeleteOpen(false)}
     isDeleteOpen={isDeleteOpen}
     isLoading={isDestroy}
     onOkHandleDelete={() => destroyProduct(clikedProductId)}
     />
    
    </>
   
  );
};

export default DashboardProductsTable;

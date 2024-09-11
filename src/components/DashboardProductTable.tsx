import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Pencil, X } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useCreateDashboardProductMutation, useDeleteDashboardProductsMutation,
  useEditDashboardProductsMutation,
  useGetDashboardProductsQuery } from '@/app/services/ApiSlice';
import { SkeletonDashboard } from './SkelatonDashboard';
import { Link } from 'react-router-dom';
import { AlertDialogCustom } from '@/shared/AlertDialogueCustom';
import { AlertDeleteDialogue } from '@/shared/AlertDeleteDialogue';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from './ui/textarea';

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
  des:string
  attributes: ProductAttributes;
};

type NProduct = {
  title: string;
  price: number;
  des:string
  image:File | null

};

interface ProductCardProps {
  id: string | number; // Adjust based on the type of your id
  attributes: ProductAttributes;
}

const ITEMS_PER_PAGE = 5;

const DashboardProductsTable: React.FC<ProductCardProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [clikedProductId,setClikedProductId]=useState<string | null>(null);
  const [productToEdit,setProductToEdit]=useState<Product | null>(null);
  const [images,setImages]=useState<File | null>(null)
  const [newProduct, setNewProduct] = useState<NProduct>({
    title: '',
    price:0,
    des: '',
    image: null,
  });
  const { isLoading, data, error } = useGetDashboardProductsQuery(
    { page:currentPage });
  console.log(newProduct);
 const [destroyProduct,{isLoading:isDestroy,isSuccess}
]=  useDeleteDashboardProductsMutation();

  const [editProduct,{isLoading:isEditing,isSuccess:isEditingSuccess}
  ]=  useEditDashboardProductsMutation();

  const [createProduct,{isLoading:iscreate,
    isSuccess:iscreateSuccess}]=useCreateDashboardProductMutation();



  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    if (productToEdit) {
      setProductToEdit({
        ...productToEdit,
        [name]: value,
        attributes: {
          ...productToEdit.attributes,
          [name]: value,
        },
      });
     
    }
     
  };
  
   const onChangeHandlerPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
     const value = e.target.value;
  
    if (productToEdit) {
    setProductToEdit({
         ...productToEdit,
      attributes: {
          ...productToEdit.attributes,
           price: parseFloat(value), // Assurez-vous que le prix est un nombre
        },
      });
     
    }
  };
  
  const onChangeDescriptionHandler = (e: 
    React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
  
    if (productToEdit) {
      setProductToEdit({
        ...productToEdit,
        attributes: {
          ...productToEdit.attributes,
          // price: +value,
          des: value, // Mise à jour de la description
        },
      });
    }
  };
  

  const onChangeImage = (e:React.ChangeEvent<HTMLInputElement>) =>{
    // setImages(e.target.files[0])
    if (e.target.files && e.target.files[0]) {
      setImages(e.target.files[0]);
    }
  }
  
  const onSubmitHandler = (e:React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("data",JSON.stringify({
         title:productToEdit?.title,
         price: productToEdit?.attributes.price,
         des:productToEdit?.des
        }));
        if(images){
          formData.append("files.image",images);
        }
        
        editProduct({id:clikedProductId,body:formData})
  }

    
  const onNewChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const onNewChangePriceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Vérifiez que la valeur peut être convertie en nombre
    const price = parseFloat(value);
    if (!isNaN(price)) {
      setNewProduct({
        ...newProduct,
        price: price,
      });
    }
  };
  

  const onNewChangeThumbnailHandler = (e:any) => {
    setNewProduct({
      ...newProduct,
      image: e.target.files[0],
    });
  };

  // const onSubmitHandlerCreat = () => {
  //   const formData = new FormData();
  //   formData.append('data', JSON.stringify({
  //     title: newProduct.title,
  //     price: newProduct.price,
  //     des: newProduct.des,
  //   }));
  //   formData.append('files.image', newProduct.image);
  
  //   createProduct(formData)
  //     .unwrap()
  //     .then(() => {
  //       // onCreateModalClose();
  //       // handleCreate()
  //       setIsCreateOpen(true)
  //       setNewProduct({
  //         title: '',
  //         price: 0,
  //         des: '',
  //         image: null,
  //       });
  //     })
  //     .catch((error) => {
  //       console.error('Failed to create product:', error);
  //     });
  // };
  
  const onSubmitHandlerCreat = () => {
    const formData = new FormData();
  
    // Vérifiez que le price est un nombre avant de l'envoyer
    if (!isNaN(newProduct.price)) {
      formData.append('data', JSON.stringify({
        title: newProduct.title,
        price: newProduct.price, // Assurez-vous que c'est bien un nombre
        des: newProduct.des,
      }));
  
      if (newProduct.image) {
        formData.append('files.image', newProduct.image);
      }
  
      createProduct(formData)
        .unwrap()
        .then(() => {
          setIsCreateOpen(false);
          setNewProduct({
            title: '',
            price: 0,
            des: '',
            image: null,
          });
        })
        .catch((error) => {
          console.error('Failed to create product:', error);
        });
    } else {
      console.error("Price is not a valid number");
    }
  };
  
  

  useEffect(() =>{
  if(isSuccess){
    setClikedProductId(null)
    setIsDeleteOpen(false)
  }

  if(isEditingSuccess){
    setClikedProductId(null)
    setIsOpen(false)
  } 

  if(iscreateSuccess){
    setNewProduct({
      title: '',
      price: 0,
      des: '',
      image: null,
    })
  }

  },[isSuccess,isEditingSuccess,iscreateSuccess])
 
  if (isLoading) return <SkeletonDashboard />;

  if (error) {
    if ('data' in error) {
      // FetchBaseQueryError, afficher les détails de l'erreur
      return <div>Error: {JSON.stringify(error.data)}</div>;
    } else if ('message' in error) {
      // SerializedError, afficher le message d'erreur
      return <div>Error: {error.message}</div>;
    } else {
      // Si l'erreur ne correspond pas à un des types connus
      return <div>An unknown error occurred.</div>;
    }
  }
  

   const products = data?.data || []; // Assuming `data?.data` is the array of products

  const handleDelete = (id:string) => {
    
     console.log('Delete product with id:', id);
    setIsDeleteOpen(true);
  };

  const handleEdit = (id: string) => {
    // Handle edit logic here
    console.log('Edit product with id:', id);
    setIsOpen(true); // Open the dialog when edit is clicked
  };

  const handleCreate = () => {
    setIsCreateOpen(true); // Open the dialog when edit is clicked
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
           <div className='my-6 flex justify-end'>

            <Button onClick={()=>{handleCreate()}}
               className='bg-cyan-500 px-7'>
                Create
            </Button>

           </div>
                      

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
                  <TableCell>{`$${product?.attributes?.price ? product?.attributes?.price.toFixed(2) :'0.00'}`}</TableCell>
                  <TableCell>
                    <div className="flex justify-items-end items-center gap-3">
                      <Button onClick={() =>{
                        handleDelete(product.id)
                        setClikedProductId(product.id)
                      } }
                      className='bg-red-500 px-7'>
                        <Trash2 />
                      </Button>
                      <Button onClick={()=>{
                        setProductToEdit(product)
                        handleEdit(product.id)
                        setClikedProductId(product.id)
                      }}
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
    title={'Edit profile'}
    des={'update this product'}
     save={'Save changes'}
     closeb={'close'}
    onOpen={() => setIsOpen(true)} 
    onClose={() => setIsOpen(false)} 
    isOpen={isOpen}
    onOkClick={onSubmitHandler}
    isLoading={isEditing} >
      
       <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input id="title" placeholder='title...' 
            value={productToEdit ? productToEdit.attributes.title : ''} 
            className="col-span-3" name='title'
            onChange={onChangeHandler}
             />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>

            <Input
              type='number'
              id="price"
              name="price" // Vérifiez bien que le name est "price"
              value={productToEdit ? productToEdit.attributes.price : ''} 
               className="col-span-3"
               onChange={onChangeHandlerPrice} // Utilisez bien la fonction onChangeHandlerPrice ici
             />
 
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Descreption
            </Label>
            <Textarea id="des" placeholder='descreption...' 
            value={productToEdit ? productToEdit.attributes.des : ''} 
            className="col-span-3" name='des'
            onChange={onChangeDescriptionHandler}
             />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Image
            </Label>
            <Input type='file' id="image" onChange={onChangeImage} 
             className="col-span-3" />
          </div>
        </div>
        
    </AlertDialogCustom>

    <AlertDeleteDialogue
     onOpen={() => setIsDeleteOpen(true)} 
     onClose={() => setIsDeleteOpen(false)}
     isDeleteOpen={isDeleteOpen}
     isLoading={isDestroy}
     onOkHandleDelete={() => destroyProduct(clikedProductId)}
     />

 <AlertDialogCustom 
    title={'Create'}
    des={'Create new  product'}
     save={'Create'}
     closeb={<X />}
    onOpen={() => setIsCreateOpen(true)} 
    onClose={() => setIsCreateOpen(false)} 
    isOpen={isCreateOpen}
    onOkClick={onSubmitHandlerCreat}
    isLoading={iscreate}  >
       <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input id="title" placeholder='title...' name='title'
             value={newProduct.title} onChange={onNewChangeHandler}  
            className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input type='number' id="price" name='price' 
            value={newProduct.price} onChange={onNewChangePriceHandler}
             className="col-span-3" />
          </div>
           
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Descreption
            </Label>
            <Input id="title" placeholder='descreption...' name='des'
             value={newProduct.des} onChange={onNewChangeHandler}  
            className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Image
            </Label>
            <Input type='file' id="image"
            //  accept='image/png ,image/gif ,imag/jpeg' 
             name='image'
             onChange={onNewChangeThumbnailHandler}
             className="col-span-3" />
          </div>
        </div>
    </AlertDialogCustom>
    
    </>
   
  );
};

export default DashboardProductsTable;

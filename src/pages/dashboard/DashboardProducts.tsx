import DashboardProductsTable from "@/components/DashboardProductTable"


const DashboardProducts = () => {

  const product = {
    id: "1",
    attributes: {
      title: "Product Title",
      image: {
        data: {
          attributes: {
            url: "image-url.jpg"
          }
        }
      },
      price: 100,
      stock: 10,
      rate: 5,
      des: "Product description"
    }
  };
  
  return (
    <>
     <DashboardProductsTable {...product} />
      
    </>
  )
}

export default DashboardProducts
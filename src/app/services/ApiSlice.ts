 import CookiesService from '@/services/CookiesService';
import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    'reducerPath':'api',
    tagTypes:['Products'],
    refetchOnReconnect:true,
    refetchOnMountOrArgChange:true,
    baseQuery:fetchBaseQuery({baseUrl:import.meta.env.VITE_SERVER_URL}),
    endpoints:(build) =>({

        getDashboardProducts:build.query({
            query:(arg) =>{
              const {page}= arg;
              return {
                url:`/api/products?populate=categories,image&pagination[page]=${page}&pagination[pageSize]=5`
              }
            },
            providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }:{id:string | number}) => ({ type: 'Products' , id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
        }),


        deleteDashboardProducts:build.mutation({
            query(id){
              return {
                url:`/api/products/${id}`,
                method:'DELETE',
                headers:{
                  Authorization:`Bearer ${CookiesService.get('jwt')}`
                }
              }
            },
            invalidatesTags: [{ type: 'Products', id: 'LIST' }],
        }),


        editDashboardProducts:build.mutation({
          query:({id,body}) =>({
            
              url:`/api/products/${id}`,
              method:'PUT',
              headers:{
                Authorization:`Bearer ${CookiesService.get('jwt')}`
              },
              body,
          }),
          async onQueryStarted({id,...path},{dispatch,queryFulfilled}){
             const patchResult = dispatch(
              apiSlice.util.updateQueryData("getDashboardProducts",
              id,draft =>{
                Object.assign(draft,path)
              })
             )
             try {
              await queryFulfilled
             } catch {
              patchResult.undo()
             }
          },
          invalidatesTags: [{ type: 'Products', id: 'LIST' }],
      }),

      createDashboardProduct: build.mutation({
        query: (formData) => ({
          url: `/api/products`,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${CookiesService.get('jwt')}`
          },
          body: formData,
        }),
        async onQueryStarted(body, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            apiSlice.util.updateQueryData('getDashboardProducts', undefined, (draft) => {
              draft.data.push(body);
            })
          );
          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
          }
        },
        invalidatesTags: [{ type: 'Products', id: 'LIST' }],
      }),
      
    })
})

export const {useGetDashboardProductsQuery,
    useDeleteDashboardProductsMutation,
  useEditDashboardProductsMutation,
  useCreateDashboardProductMutation} = apiSlice



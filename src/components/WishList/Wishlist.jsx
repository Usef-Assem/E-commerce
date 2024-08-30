import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { CartContext } from '../../context/cartContext';
import { wishlistContext } from '../../context/WishlistContext';
import { BallTriangle } from "react-loader-spinner";

export default function Wishlist() {
    const { getLoggedUserWishlist, removeProductFromWishlist } = useContext(wishlistContext);
    const { addTOCart } = useContext(CartContext);
    const queryClient = useQueryClient();

    // State to manage loading states for each product
    const [loadingStates, setLoadingStates] = React.useState({});

    // Fetch wishlist data using react-query
    const { data, isLoading, error } = useQuery('wishlist', getLoggedUserWishlist, {
        staleTime: 5000,  // Cache the data for 5 seconds
        onError: () => toast.error('Error fetching wishlist items')
    });

    // Add product to cart mutation
    const addProductMutation = useMutation(addTOCart, {
        onMutate: async (productId) => {
            setLoadingStates((prev) => ({ ...prev, [productId]: true }));
            return { productId };
        },
        onSuccess: () => {
            toast.success('Product added successfully', { duration: 2000 });
        },
        onError: () => {
            toast.error('Error adding product');
        },
        onSettled: (data, error, productId) => {
            setLoadingStates((prev) => ({ ...prev, [productId]: false }));
            queryClient.invalidateQueries('wishlist'); // Refetch wishlist data after mutation
        }
    });

    // Remove product from wishlist mutation with optimistic update
    const removeProductMutation = useMutation(removeProductFromWishlist, {
        onMutate: async (productId) => {
            await queryClient.cancelQueries('wishlist');
            const previousWishlist = queryClient.getQueryData('wishlist');
            queryClient.setQueryData('wishlist', (old) => {
                return {
                    ...old,
                    data: {
                        ...old.data,
                        data: old.data.data.filter(product => product._id !== productId)
                    }
                };
            });
            return { previousWishlist };
        },
        onError: (err, productId, context) => {
            toast.error('Error deleting product');
            queryClient.setQueryData('wishlist', context.previousWishlist);
        },
        onSuccess: () => {
            toast.success('Product deleted successfully', { duration: 2000 });
        },
        onSettled: () => {
            queryClient.invalidateQueries('wishlist'); // Refetch wishlist data after mutation
        }
    });

    if (isLoading) return (
        <div className='d-flex justify-content-center align-items-center'>
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperClass={{}}
                wrapperStyle=""
                visible={true}
            />
        </div>
    );
    
    if (error) return <p>Error loading wishlist</p>;

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Wishlist</title>
            </Helmet>
            <div className='w-75 mx-auto bg-main-light p-3'>
                <h2>My Wishlist</h2>
                {data?.data.data.map((product) => (
                    <div key={product._id} className="row">
                        <div className="col-md-2 py-2">
                            <img className='w-100' src={product.imageCover} alt="" />
                        </div>

                        <div className="col-md-10 col-sm-10 border-bottom">
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className="mt-2 w-75 py-3 col-md-9 col-sm-2">
                                    <h2 className="h6 w-75 "> {product.title} </h2>
                                    <h2 className="h6 text-main">Price: {product.price} EGP</h2>
                                    <button onClick={() => removeProductMutation.mutate(product._id)} className="btn p-0 text-danger">
                                        <i className="text-danger fas fa-trash-can"></i> Remove
                                    </button>
                                </div>
                                <div className='col-md-3 col-sm-7'>
                                    <button
                                        onClick={() => addProductMutation.mutate(product._id)}
                                        className='btn btn-outline-success position-relative'
                                        disabled={loadingStates[product._id]} // Disable button while loading
                                    >
                                        {loadingStates[product._id] ? (
                                            <BallTriangle
                                                height={20}
                                                width={100}
                                                color="#000"
                                                ariaLabel="loading"
                                                style={{
                                                    position: "absolute",
                                                    top: "50%",
                                                    left: "50%",
                                                    transform: "translate(-50%, -50%)",
                                                }}
                                            />
                                        ) : (
                                            "Add to Cart"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

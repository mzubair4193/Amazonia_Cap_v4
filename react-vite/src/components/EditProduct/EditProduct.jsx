import { useState } from "react"
import { useDispatch } from "react-redux"
import { thunkUpdateProduct, thunkGetAllProducts } from "../../redux/product"
import { useModal } from "../../context/Modal"

const UpdateProduct = ({ product }) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const [productName, setProductName] = useState(product.name)
    const [price, setPrice] = useState(product.price)
    const [description, setDescription] = useState(product.description)
    const [returnPolicy, setReturnPolicy] = useState(product.return_policy)
    const [category, setCategory] = useState(product.category)

    const categories = ['headphones', 'laptops', 'tv_video', 'pet_supplies', 'kids_toys', 'automotive_industrial', 'spots_outdoors', 'beauty_health', 'movies_music_games']

    const updatedProduct = {
        name: productName,
        price: parseFloat(price),
        description,
        category,
        return_policy: returnPolicy
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(product)
        await dispatch(thunkUpdateProduct(product.id, updatedProduct))
        await dispatch(thunkGetAllProducts())
        closeModal()
    }

    return (
        <div className="createmodal">
            <h1>Create A Product</h1>
            <form onSubmit={handleSubmit} className='prodform'>
                <label>
                    <select
                        className='inputdrop'
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}>
                        <option value=''>Select A Category</option>
                        {categories.map((category) => (
                            <option key={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Return Policy"
                        value={returnPolicy}
                        onChange={(e) => setReturnPolicy(e.target.value)}
                    />
                </label>
                <button type='submit' className="submitProd" disabled={productName.length === 0 || description.length === 0 || price === 0 || returnPolicy.length === 0}>Submit</button>
            </form>
        </div>
    )

}

export default UpdateProduct

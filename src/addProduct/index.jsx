import React, { useState, useRef } from 'react';

const initialProductState = {
    imageFile: null,
    imageURL: "",
    name: "",
    price: "",
    category: "",
};

export function AddProduct() {
    const [product, setProduct] = useState(initialProductState);
    const [popup, setPopup] = useState({ message: null, isSuccess: false });
    const pImgRef = useRef(null);

    const showPopup = (text, isSuccess = false) => {
        clearTimeout(window.popupTimer);
        setPopup({ message: text, isSuccess });
        window.popupTimer = setTimeout(() => setPopup({ message: null, isSuccess: false }), 3000);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setProduct(prev => ({ ...prev, [id]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setProduct(prev => ({ ...prev, imageFile: file, imageURL: url }));
        }
    };

    const addProductFunc = async () => {
        const { imageFile, name, price, category } = product;

        if (!imageFile) return showPopup("Image Required!");
        if (!name.trim()) return showPopup("Product Name Required!");
        if (!price || price <= 0) return showPopup("Price Required!");
        if (!category) return showPopup("Category Required!");

        const img = new Image();
        img.src = product.imageURL;
        await new Promise(r => img.onload = r);

        if (img.width !== img.height) {
            return showPopup("Image square honi chahiye!");
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const products = JSON.parse(localStorage.getItem('products') || '[]');
            products.push({
                image: e.target.result,
                name: name.trim(),
                price: parseFloat(price),
                category,
            });
            localStorage.setItem('products', JSON.stringify(products));
            setProduct(initialProductState);
            if (pImgRef.current) pImgRef.current.value = "";
            showPopup("Product add ho gaya!", true);
        };
        reader.readAsDataURL(imageFile);
    };

    return (
        <>
            <style jsx>{`
                * { margin: 0; 
                    padding: 0; 
                    box-sizing: 
                    border-box; 
                }
                
                body, .container {
                    min-height: 100vh;
                    background: #000000;
                    color: #ffffff;
                    font-family: 'Segoe UI', sans-serif;
                    padding: 30px 15px;
                }

                .popup {
                    position: fixed;
                    top: 30px;
                    left: 50%;
                    transform: translateX(-50%);
                    padding: 14px 32px;
                    border-radius: 50px;
                    font-weight: 600;
                    z-index: 9999;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.8);
                    animation: pop 0.4s ease-out;
                }
                .popup.success { 
                    background: #00ff88; 
                    color: black; 
                }
                .popup.error { 
                    background: #ff2d55; 
                }

                @keyframes pop {
                    0% { 
                        transform: translate(-50%, -100px); 
                        opacity: 0; 
                    }
                    100% { 
                        transform: translateX(-50%); 
                        opacity: 1; 
                    }
                }

                .main-title {
                    text-align: center;
                    font-size: 3rem;
                    font-weight: 800;
                    background: white;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: 40px;
                    text-shadow: 2px 2px 10px rgba(255, 255, 255, 0.5);
                }

                .form-card {
                    background: #0f0f0f;
                    border: 1px solid #333;
                    border-radius: 24px;
                    padding: 40px;
                    max-width: 520px;
                    margin: 0 auto 60px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.9),
                                inset 0 0 30px rgba(255, 255, 255, 0.05);
                }

                .form-title {
                    text-align: center;
                    font-size: 2rem;
                    margin-bottom: 35px;
                    color: #ffffffff;
                    text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
                }

                .input-group {
                    margin-bottom: 28px;
                }

                label {
                    display: block;
                    margin-bottom: 10px;
                    font-size: 1.1rem;
                    color: #aaaaaa;
                }

                input, select {
                    width: 100%;
                    padding: 18px 20px;
                    background: #1a1a1a;
                    border: 1px solid #444;
                    border-radius: 16px;
                    color: white;
                    font-size: 1.1rem;
                    transition: all 0.3s ease;
                }

                input:focus, select:focus {
                    outline: none;
                    border-color: #ffffffff;
                    box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
                    background: #222;
                }

                input::placeholder {
                    color: #666;
                }

                .image-upload {
                    height: 200px;
                    background: #111;
                    border: 2px dashed #555;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    overflow: hidden;
                    transition: 0.4s;
                    position: relative;
                }

                .image-upload:hover {
                    border-color: #ffffffff;
                    box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
                }

                .image-upload input {
                    position: absolute;
                    inset: 0;
                    opacity: 0;
                    cursor: pointer;
                }

                .image-upload img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .upload-text {
                    color: #ffffffff;
                    font-size: 1.3rem;
                }

                .add-btn {
                    width: 100%;
                    padding: 20px;
                    background-color: #ffffff27;
                    color: black;
                    border: none;
                    border-radius: 16px;
                    font-size: 1.5rem;
                    font-weight: bold;
                    cursor: pointer;
                    margin-top: 20px;
                    transition: 0.4s;
                    box-shadow: 0 5px 20px rgba(255, 255, 255, 0.4);
                    color: white;
                }

                .add-btn:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 6px 20px rgba(255, 254, 255, 0.6);
                }

                .preview-title {
                    text-align: center;
                    font-size: 2.5rem;
                    margin: 60px 0 30px;
                    color: #ffffffff;
                    text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
                }

                .preview-card {
                    background: #111;
                    border: 1px solid #333;
                    border-radius: 24px;
                    padding: 35px;
                    max-width: 420px;
                    margin: 0 auto;
                    text-align: center;
                    box-shadow: 0 15px 40px rgba(0,0,0,0.8);
                }

                .preview-card img {
                    width: 200px;
                    height: 200px;
                    object-fit: cover;
                    border-radius: 20px;
                    border: 3px solid #333;
                    box-shadow: 0 0 30px rgba(255,0,255,0.2);
                }

                .placeholder {
                    width: 200px;
                    height: 200px;
                    background: #222;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #555;
                    font-size: 1.2rem;
                    border: 2px dashed #444;
                    margin: 0 auto;
                }

                .preview-card h3 {
                    margin: 25px 0 10px;
                    font-size: 1.8rem;
                    color: #fff;
                }

                .preview-card .price {
                    font-size: 2.2rem;
                    font-weight: bold;
                    background-color: #ffffffff;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .preview-card .category {
                    margin-top: 15px;
                    padding: 10px 25px;
                    background: #222;
                    border-radius: 50px;
                    display: inline-block;
                    color: #ffffffff;
                    border: 1px solid #444;
                }

                @media (max-width: 768px) {
                    .main-title { font-size: 2.3rem; }
                    .form-card, .preview-card { padding: 25px; }
                }
            `}</style>

            <div className="container">
                {/* Popup */}
                {popup.message && (
                    <div className={`popup ${popup.isSuccess ? 'success' : 'error'}`}>
                        {popup.message}
                    </div>
                )}

                <h1 className="main-title">ADD PRODUCT</h1>

                {/* Form */}
                <div className="form-card">
                    <h2 className="form-title">Product Information</h2>

                    <div className="input-group">
                        <label>Product Image (Square Only)</label>
                        <div className="image-upload">
                            <input type="file" accept="image/*" ref={pImgRef} onChange={handleImageChange} />
                            {product.imageURL ? (
                                <img src={product.imageURL} alt="preview" />
                            ) : (
                                <div className="upload-text">Click to Upload Image</div>
                            )}
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Product Name</label>
                        <input type="text" id="name" placeholder="Enter name" value={product.name} onChange={handleInputChange} />
                    </div>

                    <div className="input-group">
                        <label>Price ($)</label>
                        <input type="number" id="price" placeholder="0.00" step="0.01" value={product.price} onChange={handleInputChange} />
                    </div>

                    <div className="input-group">
                        <label>Category</label>
                        <select id="category" value={product.category} onChange={handleInputChange}>
                            <option value="" disabled>Select Category</option>
                            <option value="electronics">Electronics</option>
                            <option value="clothing&Apparel">Clothing & Apparel</option>
                            <option value="homeAppliances">Home Appliances</option>
                            <option value="books&Media">Books & Media</option>
                            <option value="sports&Outdoors">Sports & Outdoors</option>
                            <option value="beauty&PersonalCare">Beauty & Personal Care</option>
                            <option value="mobilePhones">Mobile Phones</option>
                            <option value="furniture">Furniture</option>
                            <option value="toys&Games">Toys & Games</option>
                            <option value="grocery">Grocery</option>
                            <option value="accessories">Accessories</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <button className="add-btn" onClick={addProductFunc}>
                        ADD TO STORE
                    </button>
                </div>

                {/* Preview */}
                <h2 className="preview-title">LIVE PREVIEW</h2>
                <div className="preview-card">
                    {product.imageURL ? (
                        <img src={product.imageURL} alt="Product" />
                    ) : (
                        <div className="placeholder">No Image</div>
                    )}
                    <h3>{product.name || "Product Name"}</h3>
                    <div className="price">${product.price || "0.00"}</div>
                    <div className="category">{product.category || "No Category"}</div>
                </div>
            </div>
        </>
    );
}
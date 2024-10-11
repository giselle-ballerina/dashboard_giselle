'use client';
import React, { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid'; // Import UUID for generating unique IDs
import { useUser } from '@auth0/nextjs-auth0/client';
export function AddItemForm({ handleCloseModal }) {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [varients, setVarients] = useState([]);
  const { shopg } = useSelector(state => state); // Get shopg from redux state
  const [fileUrls, setFileUrls] = useState([]);
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const { user, isLoading } = useUser();
  useEffect(() => {
    const fetchShop = async () => {
      console.log("Shopg:", shopg);
      if (shopg) {
        setValue('shopName', shopg.shopId); // Set shopName field from shopg.shopName
      } else {
        if (user) { }
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
          const response = await fetch(`/api/shop/${user.sub}`, {
            method: 'GET',
          });

          const result = await response.json();
          dispatch({ type: 'SET_SHOP', payload: result });
          if (result.shopName) {
            setShop(result);
          } else {
            setError('No shop found for this user.');
            window.location.href = '/profile';
          }
        } catch (error) {
          setError('Error fetching shop data.');
          dispatch({ type: 'SET_ERROR', payload: 'Error fetching shop data' });
        } finally {
          // setLoading(false);
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      }
    }
    fetchShop();
    setValue('itemId', uuidv4()); // Generate and set a unique ID for itemId
  }, [shopg, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
  
    // Append form fields to FormData object
    formData.append('itemId', data.itemId);
    formData.append('shopId', data.shopName);
    formData.append('price', data.price);
    formData.append('productName', data.productName);
    formData.append('description', data.description);
    formData.append('brand', data.brand);
    formData.append('tags', tags.join(',')); // Convert tags array to a string
    formData.append('varients', JSON.stringify(varients)); // Convert varients array to a JSON string
  
    // Handle file upload, if any (make sure you have file inputs)
    fileUrls.forEach((file, index) => {
      formData.append(`file${index}`, file); // Assuming fileUrls contain File objects
    });
  
    await fetch('/api/item', {
      method: 'POST',
      body: formData, // Sending as multipart/form-data
    });
  
    console.log("Item Data Submitted:", formData);
    reset();
    handleCloseModal();
  };
  

  const addTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const addVarient = (varient) => {
    setVarients([...varients, varient]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    setUploading(true);
    const formData = new FormData(event.target);
    try {
      const response = await fetch('/api/upload/multiple', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setFileUrls(result.fileUrls);
        setUploading(false);
      } else {
        console.error('File upload failed:', result.message);
        setUploading(false);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Item ID (Disabled) */}
        <div>
          <Label htmlFor="itemId">Item ID</Label>
          <Input id="itemId" {...register("itemId")} disabled />
        </div>

        {/* Shop Name (Disabled) */}
        <div>
          <Label htmlFor="shopName">Shop Name</Label>
          <Input id="shopName" {...register("shopName")} disabled />
        </div>

        {/* Product Name */}
        <div>
          <Label htmlFor="productName">Product Name</Label>
          <Input id="productName" {...register("productName", { required: true })} />
        </div>

        {/* Price */}
        <div>
          <Label htmlFor="price">Price</Label>
          <Input id="price" type="number" {...register("price", { required: true })} />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description</Label>
          <Input id="description" {...register("description")} />
        </div>

        {/* Brand */}
        <div>
          <Label htmlFor="brand">Brand</Label>
          <Input id="brand" {...register("brand")} />
        </div>

        {/* Tags */}
        <div>
          <Label htmlFor="tags">Tags</Label>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Enter tag"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag(e.currentTarget.value);
                  e.currentTarget.value = "";
                }
              }}
            />
          </div>
          <div className="flex space-x-2 mt-2">
            {tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-200 rounded-full">{tag}</span>
            ))}
          </div>
        </div>

        {/* Varients */}
        <div>
          <Label htmlFor="varients">Varients</Label>
          <div className="flex space-x-2">
            <Input placeholder="Color" id="varient-color" />
            <Input placeholder="Size" id="varient-size" />
            <Input type="number" placeholder="Quantity" id="varient-qty" />
            <Button
              type="button"
              onClick={() => {
                const color = document.getElementById("varient-color").value;
                const size = document.getElementById("varient-size").value;
                const qty = parseInt(document.getElementById("varient-qty").value);
                if (color && size && qty) {
                  addVarient({ color, size, qty });
                }
              }}
            >
              Add Varient
            </Button>
          </div>
          <div className="flex space-x-2 mt-2">
            {varients.map((varient, index) => (
              <span key={index} className="px-2 py-1 bg-gray-200 rounded-full">
                {varient.color} / {varient.size} / {varient.qty}
              </span>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>

      {/* File Upload Form */}
      <form onSubmit={handleUpload} encType="multipart/form-data">
        <div className="grid  w-full items-center gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div className=" grid-cols-1">
              <Label htmlFor="files">Add images</Label>
              <Input type="file" name="files" id="files" multiple />
            </div>
            <div className=" grid-cols-1">
              <Button
                type="submit"
                variant="secondary"
                className="text-white mt-4 w-full"
              >
                Upload
              </Button>
            </div>
          </div>
        </div>
      </form>

      {fileUrls && (
        <p className="mt-4">
          {uploading ? 'Uploading files...' : 'Files uploaded successfully!'}
          {fileUrls.map((url, index) => (
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mx-1">
              View File {index + 1}
            </a>
          ))}
        </p>
      )}
    </div>
  )
}

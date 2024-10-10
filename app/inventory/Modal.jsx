'use client';
import React, { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"



export function AddItemForm({ handleCloseModal }) {
  const { register, handleSubmit, reset } = useForm()
  const [tags, setTags] = useState([])
  const [images, setImages] = useState([])
  const [varients, setVarients] = useState([])
  const [fileUrls, setFileUrls] = useState([]);
  const onSubmit = (data) => {
    console.log("Item Data:", data)
    reset()
    handleCloseModal()
  }

  const addTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag])
    }
  }

  const addImage = (image) => {
    if (image && !images.includes(image)) {
      setImages([...images, image])
    }
  }

  const addVarient = (varient) => {
    setVarients([...varients, varient])
  }
  const handleUpload = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target); // Get the form data
    try {
      const response = await fetch('/api/upload/multiple', {
        method: 'POST',
        body: formData, // Send form data including the file
      });

      const result = await response.json();

      if (result.success) {
        setFileUrls(result.fileUrls); // Set the file URL from the response
      } else {
        console.error('File upload failed:', result.message);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Item ID */}
        <div>
          <Label htmlFor="itemId">Item ID</Label>
          <Input id="itemId" {...register("itemId", { required: true })} />
        </div>

        {/* Shop ID */}
        <div>
          <Label htmlFor="shopId">Shop ID</Label>
          <Input id="shopId" {...register("shopId", { required: true })} />
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
                  e.preventDefault()
                  addTag(e.currentTarget.value)
                  e.currentTarget.value = ""
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

        {/* Images */}
        {/* <div>
        <Label htmlFor="images">Images</Label>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Enter image URL"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addImage(e.currentTarget.value)
                e.currentTarget.value = ""
              }
            }}
          />
        </div>
        <div className="flex space-x-2 mt-2">
          {images.map((image, index) => (
            <span key={index} className="px-2 py-1 bg-gray-200 rounded-full">{image}</span>
          ))}
        </div>
      </div> */}

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
                const color = (document.getElementById("varient-color")).value
                const size = (document.getElementById("varient-size")).value
                const qty = parseInt(
                  (document.getElementById("varient-qty")).value
                )
                if (color && size && qty) {
                  addVarient({ color, size, qty })
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
      <form onSubmit={handleUpload} encType="multipart/form-data">
        <div className="grid  w-full items-center gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div className=" grid-cols-1">
              <Label htmlFor="shopId" for="files" >Add images</Label>
              <Input type="file" name="files" id="files" multiple />
            </div>
            <div className=" grid-cols-1">
              <Button
                type="submit"
                variant="secondary"
                className="text-white mt-4 w-full "
              >
                Upload
              </Button>
            </div>
          </div>
          <div className=" grid-cols-1">

          </div>
        </div>
      </form>

      {fileUrls && (
        <p className="mt-4">
          Files uploaded successfully!{' '}
          {fileUrls.map((url, index) => {
            return <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mx-1">
              View File {index + 1}
            </a>
          })}
        </p>
      )}
    </div>
  )
}

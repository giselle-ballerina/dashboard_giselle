import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"



export function AddItemForm({ handleCloseModal }) {
  const { register, handleSubmit, reset } = useForm()
  const [tags, setTags] = useState([])
  const [images, setImages] = useState([])
  const [varients, setVarients] = useState([])

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

  return (
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
        <textarea id="description" {...register("description")} />
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
      <div>
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
  )
}

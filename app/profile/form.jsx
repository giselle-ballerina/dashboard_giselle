"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"

import { useUser } from '@auth0/nextjs-auth0/client';


const formSchema = z.object({
    shopId: z.string().min(1, { message: "Shop ID is required." }),
    shopName: z.string().min(1, { message: "Shop Name is required." }),
    ownerName: z.string().min(1, { message: "Owner Name is required." }),
    ownerEmail: z.string().email({ message: "Invalid email address." }),
    ownerUserId: z.string().min(1, { message: "Owner User ID is required." }),
    ownerPhone: z.string().min(1, { message: "Owner Phone is required." }),
    ownerAddress: z.string().optional(),
    description: z.string().optional(),
    background: z.string().optional(),
    colorPrimary: z.string().optional(),
    colorSecondary: z.string().optional(),

    fontPrimary: z.string().optional(),
    fontSecondary: z.string().optional(),
})

export function ProfileForm() {
    const { user, isLoading } = useUser() // Fetching user details from useUser hook
    const [fileUrl, setFileUrl] = useState('');
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            shopId: "",
            shopName: "",
            ownerName: "",
            ownerEmail: "",
            ownerUserId: "",
            ownerPhone: "",
            ownerAddress: "",
            description: "",
            background: "",
            colorPrimary: "",
            colorSecondary: "",

            fontPrimary: "",
            fontSecondary: "",
        },
    })

    // Auto-fill user details when available
    useEffect(() => {
        if (user && !isLoading) {
            console.log(user)
            const generatedShopId = `shop_${Math.floor(Math.random() * 100000)}`;
            form.setValue("ownerName", user.name || "")
            form.setValue("ownerEmail", user.email || "")
            form.setValue("ownerUserId", user.sub || "")
            form.setValue("shopId", generatedShopId || "")
        }
    }, [user, isLoading, form])
    const onSubmit = async (values) => {
        try {
            const formData = new FormData();
            console.log('hi')

            // Append form fields to FormData
            Object.entries(values).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(key, value);
                }
            });

            if (fileUrl == '') {
                alert('Please upload a logo')
                return
            }
            formData.append('fileUrl', fileUrl);
            // Make the POST request with multipart/form-data
            const response = await fetch("/api/shop", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                console.log("Shop added successfully", result);
            } else {
                console.error("Error adding shop:", result.message);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };



    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target); // Get the form data
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData, // Send form data including the file
            });

            const result = await response.json();

            if (result.success) {
                setFileUrl(result.fileUrl); // Set the file URL from the response
            } else {
                console.error('File upload failed:', result.message);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };
    return (
        <div>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="grid grid-cols-2 w-full items-center gap-3">
                    <div className="grid grid-cols-2 gap-3">
                        <div className=" grid-cols-1">
                            <Label htmlFor="shopId" for="file" >Logo</Label>
                            <Input type="file" name="file" id="file" />
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

            {fileUrl && (
                <p className="mt-4">
                    File uploaded successfully!{' '}
                    <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        View File
                    </a>
                </p>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 w-full items-center gap-3">
                    {/* Left Column */}
                    <div className="grid-cols-1">
                        <div>
                            <Label htmlFor="shopId">Shop ID</Label>
                            <Input {...form.register("shopId")} type="text" id="shopId" placeholder="Shop ID" disabled />
                        </div>
                        <div>
                            <Label htmlFor="shopName">Shop Name</Label>
                            <Input {...form.register("shopName")} type="text" id="shopName" placeholder="Shop Name" />
                        </div>
                        <div>
                            <Label htmlFor="ownerName">Owner Name</Label>
                            <Input {...form.register("ownerName")} type="text" id="ownerName" placeholder="Owner Name" disabled />
                        </div>
                        <div>
                            <Label htmlFor="ownerEmail">Owner Email</Label>
                            <Input {...form.register("ownerEmail")} type="email" id="ownerEmail" placeholder="Owner Email" />
                        </div>
                        <div>
                            <Label htmlFor="ownerUserId">Owner User ID</Label>
                            <Input {...form.register("ownerUserId")} type="text" id="ownerUserId" placeholder="Owner User ID" disabled />
                        </div>
                        <div>
                            <Label htmlFor="ownerPhone">Owner Phone</Label>
                            <Input {...form.register("ownerPhone")} type="tel" id="ownerPhone" placeholder="Owner Phone" />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="grid-cols-1">
                        <div>
                            <Label htmlFor="ownerAddress">Owner Address</Label>
                            <Input {...form.register("ownerAddress")} type="text" id="ownerAddress" placeholder="Owner Address" />
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Input {...form.register("description")} type="text" id="description" placeholder="Description" />
                        </div>
                        <div className="grid-cols-3 grid gap-2">
                            <div>
                                <Label htmlFor="background">Background</Label>
                                <Input {...form.register("background")} type="color" id="background" placeholder="Background" />
                            </div>
                            <div>
                                <Label htmlFor="colorPrimary">Primary Color</Label>
                                <Input {...form.register("colorPrimary")} type="color" id="colorPrimary" placeholder="Primary Color" />
                            </div>
                            <div>
                                <Label htmlFor="colorSecondary">Secondary Color</Label>
                                <Input {...form.register("colorSecondary")} type="color" id="colorSecondary" placeholder="Secondary Color" />
                            </div>
                        </div>
                        {/* <div>
                        <Label htmlFor="logo">Logo URL</Label>
                        <Input {...form.register("logo")} type="file" id="logo" placeholder="Logo URL" />
                    </div> */}
                        <div>
                            <Label htmlFor="fontPrimary">Primary Font</Label>
                            <Input {...form.register("fontPrimary")} type="text" id="fontPrimary" placeholder="Primary Font" />
                        </div>
                        <div>
                            <Label htmlFor="fontSecondary">Secondary Font</Label>
                            <Input {...form.register("fontSecondary")} type="text" id="fontSecondary" placeholder="Secondary Font" />
                        </div>
                        <div>
                            <Button type="submit" variant="secondary" className="mt-4 w-full text-white">Submit</Button>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    )
}

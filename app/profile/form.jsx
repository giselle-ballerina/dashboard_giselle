"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
// import {
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})
export function ProfileForm(name, email, phone, address) {
    const form = useForm < z.infer < typeof formSchema >> ({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <div className="grid grid-cols-2 w-full items-center gap-1.5">
            {/* Left Column */}
            <div className="grid-cols-1">
                <div>
                    <Label htmlFor="shopId">Shop ID</Label>
                    <Input type="text" id="shopId" placeholder="Shop ID" />
                </div>
                <div>
                    <Label htmlFor="shopName">Shop Name</Label>
                    <Input type="text" id="shopName" placeholder="Shop Name" />
                </div>
                <div>
                    <Label htmlFor="ownerName">Owner Name</Label>
                    <Input type="text" id="ownerName" placeholder="Owner Name" />
                </div>
                <div>
                    <Label htmlFor="ownerEmail">Owner Email</Label>
                    <Input type="email" id="ownerEmail" placeholder="Owner Email" />
                </div>
                <div>
                    <Label htmlFor="ownerUserId">Owner User ID</Label>
                    <Input type="text" id="ownerUserId" placeholder="Owner User ID" />
                </div>
                <div>
                    <Label htmlFor="ownerPhone">Owner Phone</Label>
                    <Input type="tel" id="ownerPhone" placeholder="Owner Phone" />
                </div>
                <div>
                    <Label htmlFor="ownerAddress">Owner Address</Label>
                    <Input type="text" id="ownerAddress" placeholder="Owner Address" />
                </div>
                <div>
                    <Label htmlFor="description">Description</Label>
                    <Input type="" id="description" placeholder="Description" />
                </div>
            </div>

            {/* Right Column */}
            <div className="grid-cols-1">
                <div className="grid-cols-3 grid">
                    <div>
                        <Label htmlFor="background">Background</Label>
                        <Input type="color" id="background" placeholder="Background" />
                    </div>
                    <div>
                        <Label htmlFor="colorPrimary">Primary Color</Label>
                        <Input type="text" id="colorPrimary" placeholder="Primary Color" />
                    </div>
                    <div>
                        <Label htmlFor="colorSecondary">Secondary Color</Label>
                        <Input type="text" id="colorSecondary" placeholder="Secondary Color" />
                    </div>
                </ div>
                <div>
                    <Label htmlFor="logo">Logo URL</Label>
                    <Input type="url" id="logo" placeholder="Logo URL" />
                </div>
                <div>
                    <Label htmlFor="fontPrimary">Primary Font</Label>
                    <Input type="text" id="fontPrimary" placeholder="Primary Font" />
                </div>
                <div>
                    <Label htmlFor="fontSecondary">Secondary Font</Label>
                    <Input type="text" id="fontSecondary" placeholder="Secondary Font" />
                </div>
                <div>
                    <Label htmlFor="insightsTotalViews">Total Views</Label>
                    <Input type="number" id="insightsTotalViews" placeholder="Total Views" />
                </div>
                <div>
                    <Label htmlFor="insightsTotalLikes">Total Likes</Label>
                    <Input type="number" id="insightsTotalLikes" placeholder="Total Likes" />
                </div>
                <div>
                    <Label htmlFor="insightsTotalShares">Total Shares</Label>
                    <Input type="number" id="insightsTotalShares" placeholder="Total Shares" />
                </div>
                <div>
                    <Label htmlFor="insightsTotalOrders">Total Orders</Label>
                    <Input type="number" id="insightsTotalOrders" placeholder="Total Orders" />
                </div>
                <div>
                    <Label htmlFor="insightsTotalRevenue">Total Revenue</Label>
                    <Input type="number" id="insightsTotalRevenue" placeholder="Total Revenue" step="0.01" />
                </div>
                <div>
                    <Label htmlFor="insightsTotalProducts">Total Products</Label>
                    <Input type="number" id="insightsTotalProducts" placeholder="Total Products" />
                </div>
            </div>
        </div>

    )
}
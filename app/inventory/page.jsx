'use client';
// import { useSelector } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux';
import { ProductCard } from './Card';
import Image from "next/image"
import Link from "next/link"
import {
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useState , useEffect, use } from 'react'
import { AddItemForm } from "./Modal"
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { set } from 'react-hook-form';
export const description =
  "An products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions."

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState([])
  const[shop, setShop] = useState({
    logo : ""
  })
  const dispatch = useDispatch();
  const { shopg } = useSelector(state => state); 
  const handleOpenModal = () => setIsOpen(true)
  const handleCloseModal = () => setIsOpen(false)
  const { user, isLoading } = useUser();
  useEffect(() => {
    if (!shopg || !shopg.logo) {
      // If the dispatched shopg is null, fetch the shop data manually
      const fetchShopData = async () => {
        try {
          const response = await fetch(`/api/shop/${user.sub}`, {
            method: 'GET',
          });
          const data = await response.json();
          if (data) {
            setShop(data);
            dispatch({ type: 'SET_SHOP', payload: data });
          }
        } catch (error) {
          console.error('Error fetching shop:', error);
        }
      };
      fetchShopData();
    } else {
      // If shopg exists, set it to shop
      setShop(shopg);
    
    }
    const fetchItems = async (shopID) => {
      const response = await fetch(`/api/item/shop`, {
        method: 'POST', // Change to POST
        headers: {
          'Content-Type': 'application/json', // Specify the content type if sending JSON
        },
        body: JSON.stringify({ shopID }), // Send shopID in the body if required
      });
    
      if (!response.ok) {
        throw new Error(`Failed to fetch items: ${response.status}`);
      }
    
      const data = await response.json();
      console.log(data);
      setItems(data);
    };
    console.log(shopg.shopId)
    fetchItems(shopg.shopId);
  }, [shopg, dispatch]);
  useEffect(()=>{
   
    
  },[shop, shopg, dispatch]);
  // const { shopg, loadingg, errorg } = useSelector(state => state);
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Item</h2>
              <button onClick={handleCloseModal} className="text-xl font-bold">&times;</button>
            </div>

            {/* AddItemForm component */}
            <AddItemForm handleCloseModal={handleCloseModal} />

          </div>
        </div>
      )}
    
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Users2 className="h-5 w-5" />
                  Customers
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src={shop.logo  }
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My accc</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
                <TabsTrigger value="archived" className="hidden sm:flex">
                  Archived
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Archived
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" variant="outline" className="h-8 gap-1">
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
                </Button>
                <Button size="sm" className="h-8 gap-1" onClick={handleOpenModal}>
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap" >
                    Add Product
                  </span>
                </Button>
              </div>
            </div>
            <TabsContent value="all">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {/* Card for each product */}
  {items.map((element, index) => (
    <Card key={index}> {/* Always provide a unique key */}
      <CardHeader>
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="200"
          src={element.images[0].url}
          width="200"
        />
        <CardTitle>{element.productName}</CardTitle>
        <CardDescription>
          <Badge variant="outline">{element.brand}</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{element.description}</p>
        <p className="text-sm">Price: {element.price}</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-haspopup="true"
              size="icon"
              variant="ghost"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  ))}
</div>

</TabsContent>

          </Tabs>
        </main>
      </div>
    </div>
  )
}
//fwe9
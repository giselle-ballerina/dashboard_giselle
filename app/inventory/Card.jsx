import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper'; // Optional modules for navigation and pagination
import Image from 'next/image';

export const ProductCard = ({ element, index }) => {
  return (
    <Card key={index}> {/* Always provide a unique key */}
      <CardHeader>
        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation, Pagination]} // Add navigation and pagination if needed
          spaceBetween={10}                  // Space between slides
          slidesPerView={1}                  // Only show 1 slide at a time
          navigation                         // Add navigation arrows
          pagination={{ clickable: true }}   // Add pagination dots
        >
          {element.images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <Image
                alt={`Product image ${idx + 1}`}
                className="aspect-square rounded-md object-cover"
                height="200"
                width="200"
                src={img.url} // Assuming 'img.url' holds the image URL
              />
            </SwiperSlide>
          ))}
        </Swiper>
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
  );
};

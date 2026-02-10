"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ImageUpload, { ImageFile, ImageUploadProps } from "../image-upload";
import { ArrowDownAzIcon, ImageUp } from "lucide-react";
import {
  getCategories,
  uploadImage,
  Categories,
  uploadProduct,
  ProductRequest,
} from "@/lib/data/upload-data";
import { tr } from "zod/v4/locales";
import { toNamespacedPath } from "path";

const formSchema = z.object({
  //Validation rule (most important)
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  price: z.coerce.number().positive("Price must be positive."),
  images: z.any(),
  category: z
    .string()
    .min(1, "Please Select Category!")
    .refine((val) => val !== "auto", {
      message: "Please Select Specific Category!",
    }),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
});

export function ProductForm() {
  const [categories, setCategories] = React.useState<Categories[]>([]);

  //1. Set up form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: 0,
      category: "",
      images: [],
      description: "",
    },
  });

  const [images, setImages] = React.useState<ImageFile[]>([]);
  const [imageForm, setImageForm] = React.useState<string[]>([]);
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();
      formData.append("file", images[0].file);
      const resUploadImg = await uploadImage(formData);
      // for (const img of images) {
      //   formData.append("file", img.file);
      //   const res = await uploadImage(formData);
      //   setImageForm(res.location);
      //   data.images = res.location;
      // }

      console.log("image form : ", imageForm);
      const productData: ProductRequest = {
        title: data.title,
        price: data.price,
        description: data.description,
        categoryId: Number(data.category),
        images: [resUploadImg.location],
      };

      console.log("data of form", productData);
      const resUpload = await uploadProduct(productData);
      // form.reset();

      if (!resUpload || resUpload.id) {
        toast.success("Product Uploaded Successfully!");
        form.reset();
        setImages([]);
      } else {
        toast.error("Product upload failed");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleImageChange(images: ImageFile[]) {
    console.log("catch file for create data form");
    setImages(images);
  }

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <Card className="w-full sm:max-w-md md:max-w-2xl">
      <CardHeader>
        <CardTitle>Product Form </CardTitle>
        <CardDescription>
          Help us improve by reporting bugs you encounter.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Product Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Product Name"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-price">
                    Produt Price
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-price"
                    aria-invalid={fieldState.invalid}
                    placeholder="Product Price"
                    autoComplete="off"
                    type="number"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="category"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="responsive"
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel htmlFor="form-rhf-demo-category">
                    Product Category
                  </FieldLabel>

                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="form-rhf-select-language"
                      aria-invalid={fieldState.invalid}
                      className="md:w-74 w-auto"
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectSeparator />
                      {categories.map((cate) => (
                        <SelectItem key={cate.id} value={cate.id.toString()}>
                          {cate.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldContent>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Description
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-demo-description"
                      placeholder="Product description."
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/100 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription>
                    Include steps to reproduce, expected behavior, and what
                    actually happened.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Image Upload */}
            <Controller
              name="images"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Description
                  </FieldLabel>
                  <ImageUpload
                    {...field}
                    aria-invalid={fieldState.invalid}
                    onImagesChange={handleImageChange}
                  />

                  <FieldDescription>
                    Include steps to reproduce, expected behavior, and what
                    actually happened.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-demo">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}

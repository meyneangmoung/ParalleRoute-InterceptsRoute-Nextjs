"use client";

import { useCallback, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircleIcon, CircleX, CloudUpload, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ImageFile {
  id: string;
  file: File;
  preview: string;
  progress: number;
  status: "uploading" | "completed" | "error";
  error?: string;
}

export interface ImageUploadProps {
  maxFiles?: number;
  maxSize?: number;
  accept?: string;
  className?: string;
  onImagesChange?: (images: ImageFile[]) => void;
  onUploadComplete?: (images: ImageFile[]) => void;
}

export default function ImageUpload({
  maxFiles = 10,
  maxSize = 2 * 1024 * 1024,
  accept = "image/*",
  className,
  onImagesChange,
  onUploadComplete,
}: ImageUploadProps) {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [visibleDefaultImages, setVisibleDefaultImages] = useState<ImageFile[]>([]);

  const validateFile = (file: File) => {
    if (!file.type.startsWith("image/")) return "File must be an image";
    if (file.size > maxSize) return `File size must be less than ${(maxSize / 1024 / 1024).toFixed(1)}MB`;
    if (images.length + visibleDefaultImages.length >= maxFiles) return `Maximum ${maxFiles} files allowed`;
    return null;
  };

  const addImages = useCallback(
    (files: FileList | File[]) => {
      const newImages: ImageFile[] = [];
      const newErrors: string[] = [];

      Array.from(files).forEach((file) => {
        const error = validateFile(file);
        if (error) {
          newErrors.push(`${file.name}: ${error}`);
          return;
        }

        newImages.push({
          id: `${Date.now()}-${Math.random()}`,
          file,
          preview: URL.createObjectURL(file),
          progress: 0,
          status: "uploading",
        });
      });

      if (newErrors.length > 0) setErrors((prev) => [...prev, ...newErrors]);

      if (newImages.length > 0) {
        setImages((prev) => {
          const updated = [...prev, ...newImages];
          onImagesChange?.(updated);
          return updated;
        });

        newImages.forEach((img) => simulateUpload(img));
      }
    },
    [images, visibleDefaultImages, maxFiles, maxSize, onImagesChange]
  );

  const simulateUpload = (imageFile: ImageFile) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        setImages((prev) => {
          const updated = prev.map((img) =>
            img.id === imageFile.id ? { ...img, progress: 100, status: "completed" as const } : img
          );
          if (updated.every((img) => img.status === "completed")) onUploadComplete?.(updated);
          return updated;
        });
      } else {
        setImages((prev) =>
          prev.map((img) => (img.id === imageFile.id ? { ...img, progress } : img))
        );
      }
    }, 100);
  };

  const removeImage = useCallback((id: string) => {
    setVisibleDefaultImages((prev) => prev.filter((img) => img.id !== id));
    setImages((prev) => {
      const removed = prev.find((img) => img.id === id);
      if (removed) URL.revokeObjectURL(removed.preview);
      const updated = prev.filter((img) => img.id !== id);
      onImagesChange?.(updated);
      return updated;
    });
  }, [onImagesChange]);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) addImages(e.dataTransfer.files);
  };

  const openFileDialog = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = accept;
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files) addImages(target.files);
    };
    input.click();
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <div className={cn("w-full max-w-4xl", className)}>
      {/* Default images grid */}
      <div className="grid grid-cols-4 gap-2.5 mb-4">
        {visibleDefaultImages.map((img) => (
          <Card key={img.id} className="relative group">
            <img src={img.preview} alt="default" className="h-32 w-full object-cover rounded-md" />
            <Button
              size="icon"
              variant="outline"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
              onClick={() => removeImage(img.id)}
            >
              <CircleX className="size-4" />
            </Button>
          </Card>
        ))}
      </div>

      {/* Uploaded images grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-4 gap-2.5 mb-4">
          {images.map((img) => (
            <Card key={img.id} className="relative group">
              <img src={img.preview} alt={img.file.name} className="h-32 w-full object-cover rounded-md" />
              <Button
                size="icon"
                variant="outline"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
                onClick={() => removeImage(img.id)}
              >
                <CircleX className="size-4" />
              </Button>
            </Card>
          ))}
        </div>
      )}

      {/* Upload area */}
      <Card
        className={cn(
          "border-dashed rounded-md transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50"
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <CardContent className="text-center">
          <div className="mx-auto mb-3 w-8 h-8 flex items-center justify-center border rounded-full">
            <CloudUpload className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold mb-1">Choose a file or drag & drop here</h3>
          <p className="text-xs text-muted-foreground mb-3">JPEG, PNG, up to {formatBytes(maxSize)}</p>
          <Button size="sm" variant="default" onClick={openFileDialog}>
            Browse File
          </Button>
        </CardContent>
      </Card>

      {/* Progress cards */}
      {images.length > 0 && (
        <div className="mt-4 space-y-3">
          {images.map((img) => (
            <Card key={img.id} className="shadow-none rounded-md">
              <CardContent className="flex items-center gap-2 p-3">
                <div className="w-8 h-8 flex items-center justify-center border rounded-md shrink-0">
                  <ImageIcon className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs font-medium">{img.file.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">{formatBytes(img.file.size)}</span>
                      {img.status === "uploading" && <span className="text-xs text-muted-foreground ml-2">{Math.round(img.progress)}%</span>}
                    </div>
                    <Button size="icon" variant="ghost" onClick={() => removeImage(img.id)}>
                      <CircleX className="w-4 h-4" />
                    </Button>
                  </div>
                  <Progress value={img.progress} className="h-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Errors */}
      {errors.length > 0 && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircleIcon />
          <div>
            <AlertTitle>Upload Error</AlertTitle>
            <AlertDescription>
              {errors.map((e, i) => (
                <p key={i}>{e}</p>
              ))}
            </AlertDescription>
          </div>
        </Alert>
      )}
    </div>
  );
}

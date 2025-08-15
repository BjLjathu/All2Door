import { Label } from "@radix-ui/react-label";
import { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  imageLoadingState,
  isEditedMode
}) {
  const inputRef = useRef(null);
  console.log(isEditedMode,'editedmode');
  

  function handleImageFileChange(event) {
    console.log(event.target.files);
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }
  
  async function uploadImageToCloudinary() {
    setImageLoadingState(true)
    const data = new FormData()
     data.append('my_file',imageFile)
     const response = await axios.post('http://localhost:5000/api/admin/products/upload-image',data)
      if(response?.data?.success) {
        setUploadedImageUrl(response.data.result.url)
        setImageLoadingState(false)
      }
        console.log(response,'response of the imagefile uploaded');
        
  }

  useEffect(()=>{
    if(imageFile!== null) uploadImageToCloudinary()

  },[imageFile])
  return (
    <div className="w-full max-w-md mx-auto mt-4 ">
      <Label className="text-lg font-semibold mb-2 block ">Upload Image</Label>
      <div
        className={`${isEditedMode ? 'opacity-60':''} border-2 border-dashed rounded-lg p-4 `}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditedMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${isEditedMode ? 'cursor-not-allowed' : ''} flex flex-col items-center justify-center cursor-pointer `}
          >
            <UploadCloudIcon className="w-10 h-10 text-nuted-foreground my-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : (
          imageLoadingState? <Skeleton className='h-10 bg-gray-100'/> :

          <div className="flex items-center justify-between ">
            <div className="flex items-center">
              <FileIcon className="w-8 h-8 text-primary mr-2" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4 " />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;

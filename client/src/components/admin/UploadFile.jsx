import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer";
import { removeFiles, uploadFiles } from "../../api/Product";
import useEcomStore from "../../stores/ecom-store";
// import { image } from "../../../../server/configs/prisma";
// import { Card, CardHeader, CardContent } from '@components/ui/card';
import { Typography, Box, Button } from "@mui/material";
import { UploadCloud, XCircle } from "lucide-react";

const UploadFile = ({ dataform, datasetForm }) => {
  const token = useEcomStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);
  const [localImage ,setLocalImage] = useState(dataform?.images || [])  // set local image

 // Sync local images with dataform images on dataform reset
 useEffect(()=> {
  setLocalImage(dataform?.images || [])
 },[dataform.images])

  console.log(" ใน upload file data : ",dataform);
  //chnage file for uploading
  const handleFileChange = (e) => {
    const files = e.target.files;
    console.log(files);

    console.log(" ใน file upload file data : ",dataform);
    if (files) {
      setIsLoading(true);

      let allFiles = dataform?.images || []; //[] empty array

      for (let i = 0; i < files.length; i++) {
        console.log(files[i]);

        const file = files[i];

        if (!file.type.startsWith("image/")) {
          toast.error(
            `ไฟล์ ${file.name} ไม่ใช่ไฟล์ image กรุณา upload ไฟล์ image `
          );
          continue;
        }

        //Image resize
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (data) => {
            // get endpoint to server
            // console.log(data);

            uploadFiles(token, data)
              .then((res) => {
                console.log(res);

                allFiles.push(res.data);
                setLocalImage(allFiles)  // Update local state image
                datasetForm({
                  ...dataform,
                  images: allFiles,
                });

                setIsLoading(false);
                toast.success("Upload image Sucess!!!");
              })
              .catch((err) => {
                console.log(err);
                toast.error("Upload image failed");
              })
              .finally(() => setIsLoading(false));
          },
          "base64"
        );
      }
    }
    e.target.value = ""; // Reset input file เพื่อให้สามารถอัปโหลดไฟล์เดิมได้อีกครั้ง
  };

  // delete file image
  const handleDelete = (public_id) => {
    console.log(public_id);
    removeFiles(token, public_id)
      .then((res) => {
        console.log(res);
        datasetForm((dataform) => ({
          ...dataform,
          images: dataform.images.filter((img) => img.public_id !== public_id),
        }));
        toast.error("Deleted Image successfully!");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to delete image");
      });
  };

  console.log(" นอก upload file data : ",dataform);
  
  return (
    <div>
      <Typography variant="body2">รูปภาพสินค้า</Typography>

      <div className="flex mx-4 gap-4 my-4">
        {dataform?.images?.length > 0 ? (
          dataform.images.map((image, index) => (
            <div className="relative" key={index}>
              <img
                className="w-24 h-24 object-cover hover:scale-105 rounded-md"
                src={image.url}
                alt="Product Image"
              />
              <span
                onClick={() => handleDelete(image.public_id)}
                className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1 rounded-full cursor-pointer transform hover:scale-110 transition duration-200"
              >
                <XCircle size={16} />
              </span>
            </div>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            No images available.
          </Typography>
        )}
      </div>

      <Box className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors duration-200">
        <Box className="space-y-2 text-center">
          <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
          <Typography variant="body2" color="textSecondary">
            <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
              <span>Upload a file</span>
              <input
                onChange={handleFileChange}
                name="images"
                multiple
                type="file"
                className="sr-only"
              />
            </label>
            <span>หรือลากไฟล์มาวาง</span>
          </Typography>
          <Typography variant="caption" color="textSecondary">
            PNG, JPG, GIF ขนาดไม่เกิน 10MB
          </Typography>
          {isLoading && (
            <Typography variant="body2" color="primary">
              กำลังอัปโหลด...
            </Typography>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default UploadFile;

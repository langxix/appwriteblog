import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostFrom({ post }) {
  //useForm to initialize Default values
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  //handle Form submittion
  const submit = async (data) => {
    if (post) {
      //Update existing post logic
      //if new image (data.image[0]) is provided it upLoads new imageFile using appwriteService.uploadFile(data.image[0] ) method
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      //if new Imagefile is uploaded it deletes old features image
      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      //this calls appwrite.updatePost to update post in database including newData and the id of new featured image File
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      //navigate to uploaded post
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      } else {
        //to create new post
        //uploads image using appwriteService.uploadFile(data.image[0])
        const file = await appwriteService.upload(data.image[0]);

        // if image upload succefull obtail fileid and assign to the featuredImage property of dataset
        if (file) {
          const fileId = file.$id;
          data.featuredImage = fileId;

          //calls appwriteService.createPost to create a new post in the database,
          //including the new data and the user ID obtained from the Redux store
          const dbPost = await appwriteService.createPost({
            ...data,
            userId: userData.$id,
          });

          //navigates to the newly created post page.
          if (dbPost) {
            navigate(`/post${dbPost.$id}`);
          }
        }
      }
    }
  };

  //callBack is use to prevent unecessary renders in presence of useEffect , use memo 
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {

    //watch : function from react-hook-form used to subscribe changes in the form field
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

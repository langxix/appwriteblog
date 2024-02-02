import React from 'react'
import {Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'


//Rich Test Editor 
/*
name: name of input field used by react-form-hook (name is unique id for the inputField when working with react-hook-form)
control: The object from react-hook-form for managing the form state
label: An optional label for editor
defaultValue: defaultValue for the editor

*/
export default function RTE ({name , control , label , defaultValue = ""} ) {
  return (

    <div className='w-full'> 
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

//CONTROLLER component from react-hook-form used to integrate Yinymce editor into the form
    <Controller
    name={name || "content"}
    control={control} //pass controller component for managing form state
    render={({field: {onChange}}) => (
        // Editor component from Tinymce to render tinymce editor
        <Editor
        initialValue={defaultValue}
        //init configuration option for Tinymce , plugins, toolbar options and content Styles
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={onChange}
        />
        /*
        he onChange method in the line
        render={({field: {onChange}}) => 
        ( is a part of the field object provided 
        by react-hook-form. 
        it's a function provided by the react-hook-form library.
        When you use the Controller component 
        from react-hook-form, it injects the 
        field object into the render prop function. 
        The field object includes various properties and 
        methods that help manage the state of the form field.
        One of these properties is onChange, 
        a function that should be called whenever 
        the value of the field changes.
        */
    )}
    />

     </div>
  )
}


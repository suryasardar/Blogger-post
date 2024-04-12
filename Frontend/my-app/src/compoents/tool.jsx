import React from 'react'

import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Marker from  "@editorjs/marker"
import Image from  "@editorjs/image"
import Header from "@editorjs/header"
import Quote from "@editorjs/quote"
import aws from '../common/aws';
import Inclinecode from  "@editorjs/inline-code"
 
const uploadImageUrl = (e) => {
    let Linknew = new Promise((resolve,reject) => {
        try {
          resolve(e)
        }
        catch(err) {
            reject(err)
        }
    })
    return Linknew.then(url => {
        return {
            success: 1,
            file:{url}
        }
    })
}

const uploadImageFile = (e) => {
    console.log(e,"I");
  return  aws(e).then(url => {
        if (url) {
            return {
                success: 1,
                file:{url}
            }
        }
    })
}


export const tools = {
    emded:Embed,
    list: {
        class: List,
      inlineToolbar:true  
    },
    image: {
        class: Image,
        config: {
            uploader: {
                uploadByUrl:uploadImageUrl,
                uploadByFile:uploadImageFile
            }
        }
    },
    header: {
        class: Header,
        config: {
            placeholder: "Type Heading...",
            levels: [2, 3],
            defaultlevel:2
        }
    },
    marker: Marker,
    quote: {
        class: Quote,
        inlineToolbar:true  
    },
    inlinecode:Inclinecode
}
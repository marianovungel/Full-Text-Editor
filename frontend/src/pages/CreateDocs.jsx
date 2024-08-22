import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import React, {useState, useRef} from 'react';
import JoditEditor from "jodit-pro-react";

export default function CreateDocs() {
    let {docsId} = useParams()
    const editor = useRef(null)
    const [content, setContent] = useState('')
  return (
    <>
      <Navbar />
      <div className='px-[100px] mt-3'>
        <JoditEditor
                ref={editor}
                value={content}
                tabIndex={1} // tabIndex of textarea 
                onChange={newContent => {}}
        />
      </div>
    </>
  )
}

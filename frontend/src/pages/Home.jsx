import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { MdNoteAdd } from "react-icons/md";
import Docs from '../components/Docs';
import { MdOutlineTitle } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { api_base_url } from '../Helper';


export default function Home() {
  const navigate = useNavigate()
  const [createModelShow, setCreateModelShow] = useState(false)
  const [title, setTitle] = useState("")
  const [error, setError] = useState("")
  const [data, setData] = useState(null)

  const createDoc = async ()=>{
    if(title === ""){
      setError("Digite o título")
    }else{
      fetch(api_base_url + "/createDoc", {
        mode:"cors",
        method: "POST",
        headers:{
          "Content-Type":"application/json",
        },
        body: JSON.stringify({
          docName:title,
          userId: localStorage.getItem("userId"),
        }),
      })
      .then((res)=> res.json())
        .then((data)=>{
            if(data.success){
              setCreateModelShow(false)
              navigate(`/createDocs/${data.docId}`)
            }else{
                setError(data.message)
            }
        })
    }
  }

  
  const getData = async ()=>{
    fetch(api_base_url + "/getAllDocs", {
      mode:"cors",
      method: "POST",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
      }),
    })
    .then((res)=> res.json())
      .then((data)=>{
          setData(data.docs)
      })
}
useEffect(()=>{
  getData()
}, [])

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-between px-[100px]">
        <h3 className="mt-7 mb-3 text-3xl">All Documents</h3>
        <button className="btnBlue" onClick={()=>{
          setCreateModelShow(true);
          document.getElementById('title').focus()
          
          }}><i><MdNoteAdd /></i> Create New Document</button>
      </div>

      <div key={1} className="allDocs px-[100px] mt-4">
        {
          data? data.map((el, index)=>{
            return (
              <>
                <Docs docs={el} docId={`doc-${index + 1}`} />
              </>
            )
          }) : "Sem Documentos..."
        }
      </div>

      {createModelShow 
      ? <>
        <div className="createDocsModelCon fixed top-0 left-0 right-0 bottom-0 bg-[rgb(0,0,0,.3)] w-screen h-screen flex flex-col items-center justify-center">
        <div className="createDocsModel bg-[#fff] rounded-lg w-[35vw] h[25vh] p-[15px]">
          <h3 className='text-[20px]'>Create new Document</h3>

          <div className='inputCon mt-3'>
            <p className="text-[14px] text-[#808080]">Title</p>
            <div className="inputBox w-[100%]">
              <i><MdOutlineTitle /></i>
              <input onChange={(e)=>{setTitle(e.target.value)}} value={title} type="text" placeholder='Title' id='title' name='title' required />
            </div>
          </div>

          <div className="flex items-center gap-2 justify-between w-full my-3">
            <div onClick={createDoc} className="btnBlue !min-w-[49%]">Create New Document</div>
            <div onClick={()=>{setCreateModelShow(false)}} className="p-[10px] bg-[#D1D5DB] text-black rounded-lg border-0 cursor-pointer min-w-[49%] flex justify-center items-center">Cancel</div>
          </div>
        </div>
      </div>
      </>
      :""
      }
      
    </>
  )
}

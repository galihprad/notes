import React, { useState } from 'react'
import Data from'./Data'
import Card from './Card'


let text='';
let addData={};
let newList=[]
// let List=Data;



const Input=()=> {
    const [List, setList]=useState(Data);
    const handleChange=(e)=> {
       text= e.target.value;
      }

      const handleSubmit=(e)=> {
        e.preventDefault();
        addData={judul:text};
        console.log('tseks',text, addData);
        newList=List.concat(addData);
        setList(newList)
        console.log('list',List);
      }

      const listCard=List.map((item)=><Card title={item.judul}  />);
    return (
        <div>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
          />
          <button>
            Add
          </button>
          </form>
          oii
          <div>
              {listCard}
          </div>
        </div>

    )
}




export default Input
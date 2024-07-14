import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinish, setshowfinish] = useState(true)
  
  useEffect(() => {
   let todostring=localStorage.getItem("todos")
   if(todostring){
    let toods=JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
   }
  }, [])
  
  const savetols=(e)=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const togglefinish=(e)=>{
    setshowfinish(!showfinish)
  }

  const handleedit=(e,id)=>{
  let t=todos.filter(i=>i.id===id)
  setTodo(t[0].todo)
  let newTodos=todos.filter(item=>{
    return item.id!==id
  });
  setTodos(newTodos)
  savetols()
  }

  
  const handledelete=(e,id)=>{    
    let newTodos=todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    savetols()
  }

  const handleadd=()=>{
    setTodos([...todos,{id: uuidv4(),todo,iscompleted: false}])
    setTodo("")
    savetols()
   }


  const handlechange=(e)=>{
    setTodo(e.target.value)
  } 


  const handlecheckbox=(e) => {                           //toggole karna h iscompleted
    let id=e.target.name;
    let index=todos.findIndex(item=>{
      return item.id===id;
    })
    let newTodos=[...todos];
    newTodos[index].iscompleted=!newTodos[index].iscompleted
    setTodos(newTodos)
    savetols()
  }
  
  return (
    <>
    <Navbar/>       
      <div className="md:conatiner mx-3 md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[40%]">
      <h1 className='font-bold text-center text-3xl'>iTask-Manage Your Todos at one place</h1>
              <div className="addtodo my-5 flex flex-col gap-4">
                <h2 className='text-2xl font-bold'>Add a Todo</h2>
                <div className="flex">
                <input onChange={handlechange} value={todo} type="text" className='w-full rounded-xl px-5 py-1'/>
                <button onClick={handleadd} disabled={todo.length<=3} className='bg-violet-800 p-4 py-2 mx-2 disabled:bg-violet-700 hover:bg-violet-950 font-bold text-sm text-white rounded-xl'>Save</button>
                </div>
                </div>
         <input className='my-4' id='show' onChange={togglefinish} type="checkbox" checked={showfinish} /> 
         <label className='mx-2' htmlFor="show">Show Finished</label>
         <div className="h-[1px] bg-black opacity-20 w-[90%] mx-auto my-2"></div>
          <h2 className='text-2xl font-bold'>Your Todos</h2>
          <div className="todos">
            {todos.length===0 && <div className='m-5'>No Todo to display</div>}
            {todos.map(item=>{ 
          
           return (showfinish || !item.iscompleted) && <div key={item.id} className="todo flex  my-3 justify-between">
            <div className='flex gap-5'>
            <input name={item.id} onChange={handlecheckbox} type="checkbox" checked={item.iscompleted} id='' />
              <div className={item.iscompleted?"line-through":""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
             <button onClick={(e)=>handleedit(e,item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 font-bold text-sm text-white rounded-md mx-1'><FaEdit />
             </button>
             <button onClick={(e)=>handledelete(e,item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 font-bold text-sm text-white rounded-md mx-1'><AiFillDelete /></button>
            </div>
            </div>
              })}
          </div>
          </div>         
    </>
  )
}

export default App

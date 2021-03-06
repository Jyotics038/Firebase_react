import {useState,useEffect} from "react";
import './App.css';
import {db} from "./firebase-config";
import {collection,getDocs,addDoc,updateDoc,doc,deleteDoc} from "firebase/firestore";

function App() {
  const[newName,setNewName] =useState("");
  const[newAge,setNewAge] =useState(0);

  const [users,setUsers]=useState([]);
  const userCollectionRef=collection(db,"users");
  
  //to create user just add into database and our webpage
  const createUser=async()=>{
    addDoc(userCollectionRef,{name:newName,age:Number(newAge)});
  }
  
  //to update user age or increase
  const updateUser=async(id,age)=>{
    const userDoc=doc(db,"users",id);
    const newFields={age:age+1}
    await updateDoc(userDoc,newFields);
  }
  
  //to delete specific users 
   const deleteUser=async(id)=>{
    const userDoc=doc(db,"users",id);
    await deleteDoc(userDoc);
   }

  //access data from database and render on web page
  useEffect(()=>{
     const getUsers=async()=>{
         const data=await getDocs(userCollectionRef);
         setUsers(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
         console.log(data);
     }
     getUsers();
  },[]);

  return <div className="App">
    <input placeholder="Name..."
    onChange={(event)=>{
      setNewName(event.target.value);
    }}
    />
    <input type="number" placeholder="Age..."
    onChange={(event)=>{
      setNewAge(event.target.value);
    }}
    />

     <button onClick={createUser}>Create User</button>
      {users.map((user)=>{
        return(
          <div>
            {" "}
            <h1>Name:{user.name}</h1>
            <h1>Age:{user.age}</h1>
            <button onClick={()=>{
              updateUser(user.id,user.age);
              }}>Increase Age</button>

              <button onClick={()=>{deleteUser(user.id)}}>Delete User</button>
          </div>
        )
      })}
  </div>
}

export default App;

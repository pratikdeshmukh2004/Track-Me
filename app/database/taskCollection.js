import { getAuth } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDocs, limit, orderBy, query, updateDoc, where } from "firebase/firestore";
import useAuth from "../hooks/useAuth";

const auth = useAuth()
const db = auth.db

const listTasks = async () => {
    const uid = getAuth().currentUser.uid

    const q = query(
        collection(db, "tasks"),
        where("user_id", "==", uid),
        orderBy("date", "desc"),
        limit(100)
    )

    const tasks = await getDocs(q);
    const taskList = []
    tasks.forEach((doc) => {
        var task = doc.data()
        task.id = doc.id
        taskList.push(task)
    })

    return taskList
}

const createTask = (task)=>{
    const uid = getAuth().currentUser.uid

    const newTask = addDoc(collection(db, "tasks"), {
        task: task,
        date: new Date(),
        user_id: uid,
        completed: false
    })
}

const deleteTask = async(id)=>{
    await deleteDoc(doc(db, "tasks", id))
}

const updateTask = async(task, newTask) =>{
    await updateDoc(doc(db, "tasks",task.id), newTask).then((data)=> data).catch((err)=>console.log(err))
}

export default { listTasks, createTask, deleteTask, updateTask };
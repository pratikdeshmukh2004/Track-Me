import { getAuth } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDocs, limit, orderBy, query, updateDoc, where } from "firebase/firestore";
import useAuth from "../hooks/useAuth";

const auth = useAuth()
const db = auth.db

const createUpdateContent = async (time, content, contents) => {
    const uid = getAuth().currentUser.uid
    const task = {
        content: content,
        date: new Date(),
        user_id: uid,
        time: time
    }
    if (time in contents) {

        const newTask = addDoc(collection(db, "diary"), task)
    }else{
        const c_id = contents.filter((item)=>item.time == time)[0].id
        await updateDoc(doc(db, "diary",c_id), task).then((data)=> data).catch((err)=>console.log(err))
    }
}

const listContents = async () => {
    const uid = getAuth().currentUser.uid
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const q = query(
        collection(db, "diary"),
        where("user_id", "==", uid),
        where("date", ">", start),
        where("date", "<", end)
    )
    const contents = await getDocs(q);
    var contentList = {}
    contents.forEach((doc) => {
        var content = doc.data()
        contentList[content.time] = content
        contentList[content.time].id = doc.id
    })
    return contentList
}

export default { createUpdateContent, listContents };
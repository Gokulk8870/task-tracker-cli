const command=process.argv[2];

const argument=process.argv[3];


console.log("command :",command);
console.log("argument :",argument);
let tasks=[];
const now=new Date();
const { error } = require("console");
const fs=require("fs");
try{
    if (fs.existsSync("tasks.json")) {
    tasks = JSON.parse(
        fs.readFileSync("tasks.json", "utf8")
    );
    }
}
catch(error){
    console.error("file inside must be contain []");
}


switch(command){
    case "add":{
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();
        let obj={id:tasks.length+1,description:argument,status:"todo",createdat:date+" "+time,updatedat:date+" "+time };
        tasks.push(obj);
        try{
            
            fs.writeFileSync("tasks.json",JSON.stringify(tasks,null,2));
           
            console.log("Json is Created");
        }
        catch(error)
        {
            console.log("file error");
        }
    }
    case "list":{
        tasks = JSON.parse(fs.readFileSync("tasks.json", "utf8"));
        console.log(tasks);
    }
    case "update": {
        const id = Number(process.argv[3]);
        const newDescription = process.argv[4];

        let tasks = JSON.parse(
            fs.readFileSync("tasks.json", "utf8")
        );

        const task = tasks.find(t => t.id === id);

        if (!task) {
            console.log("Task not found");
            break;
        }

        task.description = newDescription;
        task.updatedat = new Date().toLocaleString();

        fs.writeFileSync(
            "tasks.json",
            JSON.stringify(tasks, null, 2)
        );

        console.log("Task updated successfully");
        break;
    }
    case "mark-in-progress":{
        const id = Number(process.argv[3]);
        const status=process.argv[2];
        let tasks=JSON.parse(fs.readFileSync("tasks.json","utf8"));
        const task=tasks.find(t=>t.id===id);
        if(!task){
            console.log("Task not found");
        }
        task.status=status;
        task.updatedat = new Date().toLocaleString();
         fs.writeFileSync(
            "tasks.json",
            JSON.stringify(tasks, null, 2)
        );
        console.log("Task  status updated successfully");
        break;
    }
    case "mark-done":{
        const id = Number(process.argv[3]);
        const status=process.argv[2];
        let tasks=JSON.parse(fs.readFileSync("tasks.json","utf8"));
        const task=tasks.find(t=>t.id===id);
        if(!task){
            console.log("Task not found");
        }
        task.status=status;
        task.updatedat = new Date().toLocaleString();
         fs.writeFileSync(
            "tasks.json",
            JSON.stringify(tasks, null, 2)
        );
        console.log("Task  status updated successfully");
        break;
    }
    case "delete":{
       const id = Number(process.argv[3]);

        let tasks = JSON.parse(
            fs.readFileSync("tasks.json", "utf8")
        );

        const task = tasks.find(t => t.id === id);

        if (!task) {
            console.log("Task not found");
            return;
        }

        tasks = tasks.filter(t => t.id !== id);

        fs.writeFileSync(
            "tasks.json",
            JSON.stringify(tasks, null, 2)
        );

    console.log("Task deleted successfully");
    }
}
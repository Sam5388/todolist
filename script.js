let todoout=document.getElementById("sam");
let todolist=getsavedtodosfromlocalstorage()
let savebutton=document.getElementById('savebutton');
let addbutton=document.getElementById('addid');
let todocount=todolist.length;
console.log(todocount);

addbutton.onclick=function(){
    todocount=todocount+1;
    console.log(todocount)
    let usertext=document.getElementById('inputid');
    let usertextvalue=usertext.value;
    let newtodo={text:usertextvalue,no:todocount,isChecked:false}
    createtodos(newtodo)
    todolist.push(newtodo)
    usertext.value="";
}


function createtodos(item){
    let todocont=document.createElement('div');
    todocont.classList.add('todo-cont');
    todoout.appendChild(todocont);
    
    let checkbox=document.createElement('input');
    checkbox.type='checkbox';
    checkbox.checked=item.isChecked;
    let checkboxid="checkbox"+item['no']
    checkbox.id=checkboxid;
    checkbox.classList.add('checkbox');
    checkbox.onclick=function(){
        label.classList.toggle('checked')
        let checkboxindex=todolist.findIndex(function(item){
            if ("checkbox"+item.no===checkboxid){
                return true;
            }else{
                return false;
            }
        })
         let todoobject=todolist[checkboxindex];
         if (todoobject.isChecked===false){
            todoobject.isChecked=true;
         }else{
            todoobject.isChecked=false;
         }
    }
    todocont.appendChild(checkbox);
    
    let checkboxrightcont=document.createElement('div');
    checkboxrightcont.classList.add('checkbox-right-cont');
    todocont.appendChild(checkboxrightcont);
    let label=document.createElement('label');
    if(item.isChecked===true){
        label.classList.add('checked')
    }
    label.htmlFor=checkboxid;
    label.textContent=item['text'];
    checkboxrightcont.appendChild(label)
    let deleteicon=document.createElement('i');
    deleteicon.classList.add('far','fa-trash-alt','delete-icon-cont')
    deleteicon.onclick=function(){
            todoout.removeChild(todocont)
            let deletedindex=todolist.findIndex(function(item){//find index of the deltedt item and then delte it in todolist and then save then it take only currently presented item
                if ("checkbox"+item.no===checkboxid){
                    return true;
                }else{
                    return false;
                }
              
            })
            todolist.splice(deletedindex,1)
    }
    checkboxrightcont.appendChild(deleteicon)  
}    
for (let item of todolist){
    createtodos(item)
}

savebutton.onclick=function(){
    localStorage.setItem("todolist",JSON.stringify(todolist));
}
function getsavedtodosfromlocalstorage(){
    let stringyfytodos=localStorage.getItem("todolist");
    let originaltodos=JSON.parse(stringyfytodos);
    if(originaltodos===null){
        return [];
    }else{
        return originaltodos;
    }
}












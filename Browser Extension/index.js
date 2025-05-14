
let myLead=[]
const inputEL=document.getElementById("input-el")
const inputbtn=document.getElementById("input-btn")
const ulEL=document.getElementById("ul-el")
const deletBtn=document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLead") )
const tabBtn=document.getElementById("tab-btn")

if(leadsFromLocalStorage){
    myLead=leadsFromLocalStorage
    render(myLead)
}


tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLead.push(tabs[0].url)
        localStorage.setItem("myLead", JSON.stringify(myLead) )
        render(myLead)
    })
})

function render(leads){ 
    let listItems=""
    for(let i=0;i<leads.length;i++){
       listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                 ${leads[i]} 
                </a>
            </li>
            `
    }
    ulEL.innerHTML=listItems
} 

deletBtn.addEventListener("dblclick",function(){
 localStorage.clear()
 myLead=[]
 render(myLead)
})

inputbtn.addEventListener("click",function(){
    
    myLead.push(inputEL.value)
    inputEL.value=" "
    localStorage.setItem("myLead",JSON.stringify(myLead))
    render(myLead)

   // console.log(localStorage.getItem("myLead"))
})

var compilebtn = document.getElementById("compile");

compilebtn.addEventListener("click", function () {
    var language = document.getElementById("lang");
    var langid = language.value;
    createApiObject(langid);
});

function createApiObject(langid) {
    var codearea = document.getElementById("code-editor");
    var code = codearea.value;

    var apiobj = {
        "code": code,
        "langId": langid
    };
    makeApiRequest(apiobj);
}

async function makeApiRequest(apiobj) {
    const res = await fetch("https://codequotient.com/api/executeCode", {
        method: "POST",
        headers: {
            'Content-Type': 'Application/json'
        }, 
        body: JSON.stringify(apiobj)
    });
    let org_data;
    const data = await res.json()

    const id = setInterval( async ()=>{
        const org_res = await fetch(`https://codequotient.com/api/codeResult/` + data.codeId);
        org_data = await org_res.json();
        const a=JSON.parse(org_data.data);
        if(!a.status){
            
            clearInterval(id);
            var b = document.getElementById("output");
            
            if(a.output !== ""){
                b.innerHTML = a.output;
            }

            else{
                b.innerHTML = a.errors;
            }
            
        }   
    },1000)
} 

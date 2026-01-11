const API = "https://round-dew-df56.sinmwaz1.workers.dev/";

function loadData(type){
  fetch(API)
  .then(r=>r.json())
  .then(data=>{
    const container=document.getElementById(type);
    container.innerHTML="";
    for(const group in data[type]){
      data[type][group].forEach(item=>{
        const div=document.createElement("div");
        div.className="card";
        // إضافة الصورة إذا موجودة
        if(item.logo){
          const img=document.createElement("img");
          img.src=item.logo;
          div.appendChild(img);
        }
        const name=document.createElement("div");
        name.textContent=item.name;
        div.appendChild(name);
        div.onclick=()=>window.open(item.stream);
        container.appendChild(div);
      });
    }
  })
  .catch(err=>console.error("خطأ في تحميل البيانات:", err));
}
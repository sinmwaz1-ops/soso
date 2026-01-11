const API = "https://round-dew-df56.sinmwaz1.workers.dev/"; // رابط Worker

function loadData(type){
  fetch(API)
  .then(r=>r.json())
  .then(data=>{
    const container=document.getElementById(type);
    container.innerHTML="";
    const player=document.getElementById('player');

    for(const group in data[type]){
      data[type][group].forEach(item=>{
        const div=document.createElement("div");
        div.className="card";

        // الصورة إذا موجودة
        if(item.logo){
          const img=document.createElement("img");
          img.src=item.logo;
          div.appendChild(img);
        }

        const name=document.createElement("div");
        name.textContent=item.name;
        div.appendChild(name);

        // عند الضغط على الفيلم أو القناة يبدأ التشغيل في المشغل
        div.onclick = () => {
          if(Hls.isSupported()){
            const hls = new Hls();
            hls.loadSource(item.stream);
            hls.attachMedia(player);
          } else {
            player.src = item.stream; // Safari و iOS يدعم مباشرة
          }
          player.play();
          window.scrollTo(0,0);
        };

        container.appendChild(div);
      });
    }
  })
  .catch(err=>console.error("خطأ في تحميل البيانات:", err));
}

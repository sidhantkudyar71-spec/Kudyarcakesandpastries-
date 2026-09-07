const PRODUCTS=[
 {name:"Chocolate Cake",price:600},
 {name:"Vanilla Cake",price:550},
 {name:"Black Forest Cake",price:650},
 {name:"Red Velvet Cake",price:750},
 {name:"Cheesecake",price:700},
 {name:"Pastry",price:80}
];
const ADMIN_PASSWORD="kudyar123"; // CHANGE THIS BEFORE PUBLISHING
const money=n=>"₹"+Number(n).toLocaleString("en-IN");
const orders=()=>JSON.parse(localStorage.getItem("kudyar_orders")||"[]");
function save(a){localStorage.setItem("kudyar_orders",JSON.stringify(a))}
function renderProducts(){
 document.getElementById("products").innerHTML=PRODUCTS.map((p,i)=>`<div class="card"><h3>${p.name}</h3><p class="price">${money(p.price)}</p><p>Freshly prepared and available for order.</p><button class="btn" onclick="choose(${i})">Order</button></div>`).join("");
 document.getElementById("item").innerHTML='<option value="">Select cake / pastry</option>'+PRODUCTS.map((p,i)=>`<option value="${i}">${p.name} — ${money(p.price)}</option>`).join("");
}
function choose(i){document.getElementById("item").value=i;location.hash="order";document.getElementById("name").focus()}
document.getElementById("orderForm").addEventListener("submit",e=>{
 e.preventDefault();let i=Number(document.getElementById("item").value),q=Number(document.getElementById("qty").value),p=PRODUCTS[i];
 let o={id:"KC"+Date.now().toString().slice(-7),name:document.getElementById("name").value,phone:document.getElementById("phone").value,address:document.getElementById("address").value,item:p.name,qty:q,date:document.getElementById("date").value,note:document.getElementById("note").value,total:p.price*q,status:"New"};
 let a=orders();a.unshift(o);save(a);
 document.getElementById("success").hidden=false;document.getElementById("success").textContent=`Order ${o.id} received! Total: ${money(o.total)}. Please contact the shop to confirm delivery.`;
 e.target.reset();document.getElementById("qty").value=1;
});
function adminLogin(){if(document.getElementById("adminPass").value===ADMIN_PASSWORD){sessionStorage.admin="1";showDash()}else alert("Wrong password")}
function adminLogout(){sessionStorage.removeItem("admin");location.reload()}
function showDash(){document.getElementById("loginBox").hidden=true;document.getElementById("dashboard").hidden=false;renderOrders()}
function renderOrders(){
 let a=orders();document.getElementById("total").textContent=a.length;document.getElementById("pending").textContent=a.filter(x=>x.status!=="Delivered").length;document.getElementById("sales").textContent=money(a.reduce((s,x)=>s+x.total,0));
 document.getElementById("orders").innerHTML=a.map((o,idx)=>`<tr><td>${o.id}</td><td>${o.name}<br>${o.phone}</td><td>${o.item}</td><td>${o.qty}</td><td>${o.date}</td><td>${money(o.total)}</td><td><select onchange="changeStatus(${idx},this.value)">${["New","Confirmed","Preparing","Delivered","Cancelled"].map(s=>`<option ${s===o.status?"selected":""}>${s}</option>`).join("")}</select></td></tr>`).join("");
}
function changeStatus(i,s){let a=orders();a[i].status=s;save(a);renderOrders()}
function clearOrders(){if(confirm("Delete all saved orders?")){save([]);renderOrders()}}
function exportOrders(){let a=orders();let rows=[["Order ID","Customer","Phone","Address","Item","Qty","Date","Note","Total","Status"],...a.map(o=>[o.id,o.name,o.phone,o.address,o.item,o.qty,o.date,o.note,o.total,o.status])];let csv=rows.map(r=>r.map(x=>`"${String(x??"").replaceAll('"','""')}"`).join(",")).join("\\n");let blob=new Blob([csv],{type:"text/csv"}),u=URL.createObjectURL(blob),aEl=document.createElement("a");aEl.href=u;aEl.download="kudyar-orders.csv";aEl.click();URL.revokeObjectURL(u)}
renderProducts();if(sessionStorage.admin==="1")showDash();
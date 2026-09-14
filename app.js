const products=[
{name:'Vanilla',cat:'cakes',kind:'Simple Cake',emoji:'🍰',prices:{'½ kg':300,'1 kg':500}},
{name:'Chocolate',cat:'cakes',kind:'Simple Cake',emoji:'🍫',prices:{'½ kg':300,'1 kg':500}},
{name:'Pineapple',cat:'cakes',kind:'Simple Cake',emoji:'🍍',prices:{'½ kg':300,'1 kg':500}},
{name:'Black Forest',cat:'cakes',kind:'Simple Cake',emoji:'🍒',prices:{'½ kg':300,'1 kg':500}},
{name:'Strawberry',cat:'cakes',kind:'Simple Cake',emoji:'🍓',prices:{'½ kg':300,'1 kg':500}},
{name:'Blueberry',cat:'cakes',kind:'Simple Cake',emoji:'🫐',prices:{'½ kg':300,'1 kg':500}},
{name:'Pista',cat:'cakes',kind:'Premium Cake',emoji:'💚',prices:{'½ kg':350,'1 kg':550}},
{name:'Kesar',cat:'cakes',kind:'Premium Cake',emoji:'🌼',prices:{'½ kg':350,'1 kg':550}},
{name:'Butterscotch',cat:'cakes',kind:'Premium Cake',emoji:'🍯',prices:{'½ kg':350,'1 kg':550}},
{name:'Rasmalai',cat:'cakes',kind:'Premium Cake',emoji:'🥛',prices:{'½ kg':350,'1 kg':550}},
{name:'Fruit Cake',cat:'cakes',kind:'Premium Cake',emoji:'🍓',prices:{'½ kg':350,'1 kg':550}},
{name:'Red Velvet',cat:'cakes',kind:'Premium Cake',emoji:'❤️',prices:{'½ kg':350,'1 kg':550}},
{name:'Chocolate Truffle',cat:'cakes',kind:'Premium Cake',emoji:'🍫',prices:{'½ kg':350,'1 kg':550}},
{name:'KitKat Crunchy',cat:'cakes',kind:'Premium Cake',emoji:'🍫',prices:{'½ kg':350,'1 kg':550}},
{name:'Vanilla Pastry',cat:'pastries',kind:'Pastry',emoji:'🧁',prices:{'1 pc':30}},
{name:'Strawberry Pastry',cat:'pastries',kind:'Pastry',emoji:'🍓',prices:{'1 pc':30}},
{name:'Pineapple Pastry',cat:'pastries',kind:'Pastry',emoji:'🍍',prices:{'1 pc':30}},
{name:'Truffle Pastry',cat:'pastries',kind:'Pastry',emoji:'🍫',prices:{'1 pc':30}},
{name:'Fruit Pastry',cat:'pastries',kind:'Pastry',emoji:'🍓',prices:{'1 pc':30}},
{name:'Cupcake',cat:'pastries',kind:'Cupcake',emoji:'🧁',prices:{'1 pc':25}},
{name:'Cheesecake',cat:'cheesecake',kind:'Cheesecake',emoji:'🍰',prices:{'250 g':250}},
{name:'Mawa Dry Cake',cat:'dry',kind:'Dry Cake',emoji:'🍞',prices:{'Price':'On request'}},
{name:'Red Velvet Dry Cake',cat:'dry',kind:'Dry Cake',emoji:'❤️',prices:{'Price':'On request'}},
{name:'Rasmalai Dry Cake',cat:'dry',kind:'Dry Cake',emoji:'🥛',prices:{'Price':'On request'}},
{name:'Vanilla Dry Cake',cat:'dry',kind:'Dry Cake',emoji:'🍞',prices:{'Price':'On request'}},
{name:'Chocolate Brownie',cat:'dry',kind:'Dry Cake',emoji:'🍫',prices:{'Price':'On request'}}];
let current='all',selected=products[0],cart=[];
function money(v){return typeof v==='number'?'₹'+v:'₹'+v}
function render(filter=current){current=filter;const grid=document.getElementById('productGrid');const list=filter==='all'?products:products.filter(p=>p.cat===filter);grid.innerHTML=list.map((p,i)=>{const first=Object.values(p.prices)[0];return `<article class="card"><div class="pic">${p.emoji}</div><div class="card-body"><h3>${p.name}</h3><p>${p.kind}</p><span class="price">${typeof first==='number'?money(first)+'+' : first}</span><button class="orderadd" onclick="addToOrder(${products.indexOf(p)})">Add</button></div></article>`}).join('')}
function filterMenu(f,btn){render(f);if(btn){document.querySelectorAll('.filters button').forEach(x=>x.classList.remove('active'));btn.classList.add('active')}document.getElementById('menu').scrollIntoView({behavior:'smooth'})}
function addToOrder(i){selected=products[i];cart.push(selected);document.getElementById('cartCount').textContent=cart.length;populateForm(selected);document.getElementById('order').scrollIntoView({behavior:'smooth'})}
function populateForm(p){const sel=document.getElementById('product'),size=document.getElementById('size');sel.innerHTML=products.map((x,i)=>`<option value="${i}" ${x===p?'selected':''}>${x.name}</option>`).join('');updateSizes();size.selectedIndex=0;updateTotal()}
function updateSizes(){const p=products[+document.getElementById('product').value];document.getElementById('size').innerHTML=Object.entries(p.prices).map(([s,v])=>`<option value="${s}" data-price="${typeof v==='number'?v:0}">${s}${typeof v==='number'?' — '+money(v):' — '+v}</option>`).join('');updateTotal()}
function updateTotal(){const o=document.getElementById('size').selectedOptions[0];document.getElementById('total').textContent=o&&+o.dataset.price?money(+o.dataset.price):'On request'}
function scrollToOrder(){document.getElementById('order').scrollIntoView({behavior:'smooth'})}
function sendOrder(e){e.preventDefault();const p=products[+document.getElementById('product').value],s=document.getElementById('size').value,total=document.getElementById('total').textContent,n=document.getElementById('name').value,ph=document.getElementById('phone').value,msg=document.getElementById('message').value;const text=`Hello Kudyar Cakes & Pastries!%0A%0AName: ${encodeURIComponent(n)}%0APhone: ${encodeURIComponent(ph)}%0AProduct: ${encodeURIComponent(p.name)}%0ASize/Quantity: ${encodeURIComponent(s)}%0AEstimated total: ${encodeURIComponent(total)}%0AMessage: ${encodeURIComponent(msg)}`;window.open('https://wa.me/919858299901?text='+text,'_blank')}
document.getElementById('product').addEventListener('change',updateSizes);document.getElementById('size').addEventListener('change',updateTotal);render();populateForm(products[0]);


function loadProduk(){

fetch("/api/produk")

.then(response=>response.json())

.then(data=>{

let tabel="";


data.forEach(item=>{

tabel += `
<tr>

<td>${item.id}</td>

<td>${item.nama}</td>

<td>${item.harga}</td>

<td>${item.stok}</td>

</tr>
`;

});


document.getElementById(
"listProduk"
).innerHTML=tabel;


});

}



function tambahProduk(){


let data={

nama:
document.getElementById("nama").value,

harga:
document.getElementById("harga").value,

stok:
document.getElementById("stok").value

};



fetch("/api/produk",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:
JSON.stringify(data)

})

.then(
()=>{

alert("Produk berhasil ditambah");

loadProduk();

}

);


}



loadProduk();


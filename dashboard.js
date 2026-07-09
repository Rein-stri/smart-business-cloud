document.addEventListener("DOMContentLoaded", function(){

    loadDashboard();

});


function loadDashboard(){

    // Ambil jumlah produk
    fetch("/api/produk")
    .then(response => response.json())
    .then(data => {

        document.querySelector(
        ".box:nth-child(3) p"
        ).innerHTML = data.length;

    })
    .catch(error=>{
        console.log(error);
    });



    // Ambil pelanggan
    fetch("/api/pelanggan")
    .then(response=>response.json())
    .then(data=>{

        document.querySelector(
        ".box:nth-child(2) p"
        ).innerHTML=data.length;

    })
    .catch(error=>{
        console.log(error);
    });



    // Ambil laporan penjualan

    fetch("/api/laporan")
    .then(response=>response.json())
    .then(data=>{

        document.querySelector(
        ".box:nth-child(1) p"
        ).innerHTML =
        "Rp " + data.pendapatan;

    })
    .catch(error=>{
        console.log(error);
    });


}



function logout(){

    fetch("/api/logout")
    
    .then(()=>{

        window.location.href="/";

    });

}

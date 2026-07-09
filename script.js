const API_URL = window.location.origin;

function showMessage(message,color="#1565C0"){
    const hasil=document.getElementById("hasil");
    if(hasil){
        hasil.innerHTML=message;
        hasil.style.color=color;
    }
}

async function register(){

    const username=document.getElementById("username")?.value;
    const password=document.getElementById("password")?.value;

    if(!username||!password){
        showMessage("Username dan Password wajib diisi.","red");
        return;
    }

    showMessage("Fitur register akan dihubungkan ke backend Flask.");
}

async function login(){

    const username=document.getElementById("username")?.value;
    const password=document.getElementById("password")?.value;

    if(!username||!password){
        showMessage("Username dan Password wajib diisi.","red");
        return;
    }

    showMessage("Login berhasil (mode demo).");

    setTimeout(()=>{
        window.location.href="dashboard.html";
    },1000);

}

function logout(){

    window.location.href="index.html";

}

function kirimAI(){

    const prompt=document.getElementById("prompt");

    const hasil=document.getElementById("hasilAI");

    if(prompt&&hasil){

        hasil.innerHTML="AI sedang diproses... (demo)";

    }

}

function simpanProfil(){

    alert("Profil berhasil disimpan (demo).");

}

function ubahPassword(){

    alert("Password berhasil diubah (demo).");

}

function simpanPengaturan(){

    alert("Pengaturan berhasil disimpan (demo).");

}

function kirimPesan(){

    alert("Pesan berhasil dikirim (demo).");

}

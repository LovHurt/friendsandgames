const mongoose = require("mongoose")

mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("Veritabanına başarıyla bağlandı")
    })
    .catch((err)=> {
        console.log("Veritabanına bağlanırken hata oluştu : ", err)
    })
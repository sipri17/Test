import { useEffect, useState } from "react";
import baseUrl from '../utilities/baseUrl'


export default function DownloadTransactions() {
    function downloadBlob(content, filename, contentType) {
        // Create a blob
        var blob = new Blob([content], { type: contentType });
        var url = URL.createObjectURL(blob);

        // Create a link to download it
        var pom = document.createElement('a');
        pom.href = url;
        pom.setAttribute('download', filename);
        pom.click();
    }

    const [dataDownload,setDataDownload] = useState("")

    const fetchTransactions = async (input) => {
        try {
            const res = await fetch(`${baseUrl}/transaction`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    access_token: localStorage.access_token
                },
            })
            console.log(res)
            const data = await res.json()

            const result = data.map(el => {
                const totalPrice = el.totalItem * el.Item.price
                const newEl = [el.tanggalInput, el.Company.name, el.Item.name, el.totalItem, el.Item.price, totalPrice, el.Item.stock]
                return newEl
            })

            let dataCSV = "Tanggal Input|Nama Perusahaan|Nama Barang|Total Barang|Harga Barang|Grand Total|Sisa Barang" + "\n" + result.map(e => e.join("|")).join("\n")
            console.log(dataCSV, '<<data');
            setDataDownload(dataCSV)
            
        } catch (error) {
            console.log(error, "<<<error");

        }
    }



    useEffect(() => {
        fetchTransactions()
        .then(_=>{
            downloadBlob(dataDownload, 'transaksi', 'text/csv;charset=utf-8;')
        })
    }, [])
}

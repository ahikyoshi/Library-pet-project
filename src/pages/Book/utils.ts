export const getAmountRate = (rate: any): number => {
    let amount: number = 0
    for(let key in rate){
        amount = amount + rate[key]
    }
    return amount / 6
}

    // function testSend(){
    //     let input = document.getElementById("testFile")

    //     let data = new FormData()
    //     data.append("file", input.files[0])
    //     data.append("id",book._id)

    //     axios.post("http://localhost:4444/library/book/upload/text", data, {
    //        " Content-Type":" multipart/form-data", 
    //     })
    // }
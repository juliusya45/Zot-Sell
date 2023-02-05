function userData(){
    var first=document.getElementById("fname").value;
    var mail=document.getElementById("email").value;
    var pass=document.getElementById("password").value;
    console.log(first + ", " + mail + ", " + pass);

    var listing = {
        first : first,
        mail : mail,
        pass : pass
    }
    console.log(listing);

    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(listing)
    }).then(res => {
        console.log('JSON sent')
    })
    .then(data => console.log(data))
    .catch(error => console.log('Form POST error.'));
}
function userData(){
    var user=document.getElementById("username").value;
    var pass=document.getElementById("password").value;

    var listing = {
        user : user,
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
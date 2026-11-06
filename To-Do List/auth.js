function signupSubmit(e){
    e.preventDefault();
    var data = $("#signupForm").serialize();
    var jsonData = Object.fromEntries(new URLSearchParams(data));    
    $.ajax({
        type : 'POST',
        url : 'https://todo-list.dcism.org/signup_action.php',
        data: JSON.stringify(jsonData),      
        dataType: 'json', 
        success : function(response) {
            alert(response["message"]);
            if(response["status"] == 200){
                $('#signupForm')[0].reset();
                toggleForms();
            }
        }
    });
}

function signinSubmit(e){
    e.preventDefault();
    var url = "https://todo-list.dcism.org/signin_action.php";
    var data = $("#signinForm").serialize(); 
    
    $.ajax({
        type : 'GET', 
        url : url + "?" + data,
        success : function(response) {
            var res = typeof response === "object" ? response : JSON.parse(response);
            if(res["status"] == 200){
                $('#signinForm')[0].reset();
                window.location.replace('index.html'); 
            } else {
                alert(res["message"]);
            }
        },
        error : function(xhr, status, error) {
            console.error("AJAX Error:", error);
            alert("Connection error or invalid credentials format.");
        }
    });
}

function signoutClick(e){
    e.preventDefault();
    window.location.replace('signup.html'); 
}
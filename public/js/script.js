(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

  // index
  let taxswitch = document.getElementById("flexSwitchCheckDefault");
    taxswitch.addEventListener("click", () => {
      let taxInfo = document.getElementsByClassName('tax-info');
      for(info of taxInfo){
        if(info.style.display != "inline"){
          info.style.display = "inline";
          console.log("on");
        }else{
          info.style.display = "none";
          console.log("off");
        }
      }
    })

// flash timeout 
    const alert = document.getElementById(success-alert);
    if (alert) {
      setTimeout(() => {
        alert.classList.add('fade-out');
        setTimeout(() => {
          const bsAlert = bootstrap.Alert.getOrCreateInstance(alert);
          bsAlert.close();  // Dismiss the alert
        }, 500); // Wait for CSS transition to finish
      }, 3000); // Show alert for 3 seconds
    }
  



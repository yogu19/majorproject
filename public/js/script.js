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
  document.addEventListener("DOMContentLoaded", () => {
    let taxswitch = document.getElementById("flexSwitchCheckDefault");
    if (taxswitch) {
      taxswitch.addEventListener("click", () => {
        let taxInfo = document.getElementsByClassName('tax-info');
        for (let info of taxInfo) {
          if (info.style.display !== "inline") {
            info.style.display = "inline";
            console.log("on");
          } else {
            info.style.display = "none";
            console.log("off");
          }
        }
      });
    }
  });

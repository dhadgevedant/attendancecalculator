
function calculate(){
    const total = document.querySelector('#total')
    const attended = document.querySelector('#attended')

    const result = document.getElementById('result')

    let op = 0.0
    op = ( attended.value - (total.value * 0.75))/-0.25;

    if(op > 0){
        result.querySelector('h2').innerHTML = "You have to Attend "+ op + " Lectures To Reach 75% Attendance" 
    }
    else{

        op = ((attended.value/0.75) - total.value)
        result.querySelector('h2').innerHTML = "You can <b>BUNK "+ Math.floor(op) + "</b> Lectures To Maintain 75%+  Attendance" 
    }
   
}

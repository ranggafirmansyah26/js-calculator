const buttons = document.querySelectorAll('.input .input-row button');
const output = document.getElementById('output');
const result = document.getElementById('result');
const clear = document.getElementById('clear');
const del = document.getElementById('delete');
const calculate = document.getElementById('calculate');
const dot = document.getElementById('dot');
const outputContainer = document.querySelector('.container .output-container');
const minusToggle = document.getElementById('minusToggle');


const lastChar = output.innerText.slice(-1)
output.innerText = '0';

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    
    calculate.disabled = false;
    output.style.opacity = 1.0;
    
   if(output.innerText.length > 11){
        outputContainer.style.fontSize = '2.2rem';
    }else{
        outputContainer.style.fontSize = '2.8rem';
    }
    
    if(e.target.classList.contains('operator') || e.target.classList.contains('action')){
        dot.disabled = false;
    }

    if (result.style.display === 'block') {
      result.style.display = 'none';
      if (e.target.classList.contains('operator') || e.target.classList.contains('minusToggle')) {
        output.innerText = result.innerText.replace('=', '');
      } else {
        output.innerText = '';
      }
    }

    if (!e.target.classList.contains('action')) {
      if (output.innerText === '0') {
        if (!e.target.classList.contains('operator')) {
          output.innerText = '';
        }
      }
      
      if(['+', '-', '÷', '×'].includes(lastChar)){
          if(e.target.innerText === '.'){
              output.innerText += '0';
          }
      }
      
      output.innerText += e.target.innerText;
      output.innerText = output.innerText.replace(/[-+×÷]{2,}/g, e.target.innerText);
      
    }
  });
});

clear.addEventListener('click', () => {
  output.innerText = '0';
  output.style.opacity = 1.0;
  result.style.display = 'none';
});

del.addEventListener('click', () => {
  if (output.innerText === 'NaN') {
      output.innerText = 0;
  }
  if (output.innerText !== '0') {
    output.innerText = output.innerText.slice(0, -1);
  }

  if (output.innerText === '' || result.style.display === 'block') {
    result.style.display = 'none';
    output.style.opacity = 1.0;
    output.innerText = '0';
  }
});

minusToggle.addEventListener('click', () => {
    function toggler() {
        const operators = ['+', '-', '×', '÷']; // Ubah sesuai operator matematika yang ingin kamu periksa.

        for (const operator of operators) {
            if (output.innerText.slice(1).includes(operator)) {
                return;
            }
        }return output.innerText *= -1;
    }
    toggler();
});


calculate.addEventListener('click', () => {
  if (output.innerText.endsWith('+') || output.innerText.endsWith('-') || output.innerText.endsWith('×') || output.innerText.endsWith('÷')){
      output.innerText = output.innerText.slice(0, -1);
      output.innerText = output.innerText.replace(/÷/g, '/');
      output.innerText = output.innerText.replace(/×/g, '*');
      result.innerText = '=' + eval(output.innerText);
  } else {
        output.innerText = output.innerText.replace(/÷/g, '/');
        output.innerText = output.innerText.replace(/×/g, '*');
        result.innerText = '=' + eval(output.innerText);
  }
  
  output.innerText = output.innerText.replace(/\//g, '÷');
  output.innerText = output.innerText.replace(/\*/g, '×'); 
  
  result.style.display = 'block';
  output.style.opacity = 0.5;
  
  calculate.disabled = true;
});

dot.addEventListener('click', () => {
    dot.disabled = true;
})







// Accessible interactivity: theme, contrast, form centered, animations
(function(){
  const themeBtn = document.getElementById('theme-toggle');
  const contrastBtn = document.getElementById('contrast-toggle');
  const form = document.getElementById('demo-form');
  const msg = document.getElementById('form-message');

  function setPressed(btn, val){
    btn.setAttribute('aria-pressed', String(val));
  }

  themeBtn.addEventListener('click', function(){
    const isDark = document.documentElement.classList.toggle('dark-mode');
    setPressed(this, isDark);
    this.setAttribute('aria-label', isDark ? 'Desativar tema escuro' : 'Ativar tema escuro');
    try{ localStorage.setItem('prefers-dark', isDark ? '1' : '0'); }catch(e){}
  });

  contrastBtn.addEventListener('click', function(){
    const isHigh = document.documentElement.classList.toggle('high-contrast');
    setPressed(this, isHigh);
    this.setAttribute('aria-label', isHigh ? 'Desativar alto contraste' : 'Ativar alto contraste');
    try{ localStorage.setItem('prefers-contrast', isHigh ? '1' : '0'); }catch(e){}
  });

  // load preferences
  try{
    if(localStorage.getItem('prefers-dark') === '1'){ document.documentElement.classList.add('dark-mode'); themeBtn.setAttribute('aria-pressed','true'); }
    if(localStorage.getItem('prefers-contrast') === '1'){ document.documentElement.classList.add('high-contrast'); contrastBtn.setAttribute('aria-pressed','true'); }
  }catch(e){}

  // Keyboard accessible shortcuts: Alt+T toggles theme
  window.addEventListener('keydown', function(e){
    if(e.altKey && e.key.toLowerCase() === 't'){ themeBtn.click(); }
  });

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    if(!name || !email){ msg.textContent = 'Preencha os campos obrigatórios.'; msg.focus(); return; }
    msg.textContent = 'Formulário enviado com sucesso (demo).';
    form.reset();
    setTimeout(()=>{ msg.textContent = ''; }, 4000);
  });
})();

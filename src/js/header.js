import  refs from './common/refs.js';

const{
    headerRefs,
    navHomeRefs,
    navLibrRefs,
    btnHomeRefs,
    btnLibrRefs,
    formSearchRefs,
    inputSearchRefs,
    librListRefs} = refs.refs
    
    const currentHeader = {
        home: 'header__home',
        lib: 'header__library',
        hidden: 'is-hidden',
        current: 'current',
      };
      const{ 
        home, 
        lib, 
        hidden, 
        current } = currentHeader

        navLibrRefs.addEventListener('click', libOpenClick);
        navHomeRefs.addEventListener('click', homeOpenClick);
        
        function libOpenClick() {
          headerRefs.classList.add(lib);
          headerRefs.classList.remove(home);
          formSearchRefs.classList.add(hidden);
          librListRefs.classList.remove(hidden);
          btnLibrRefs.classList.add(current);
          btnHomeRefs.classList.remove(current);
        }
        
        function homeOpenClick() {
          headerRefs.classList.remove(lib);
          headerRefs.classList.add(home);
          formSearchRefs.classList.remove(hidden);
          librListRefs.classList.add(hidden);
          btnHomeRefs.classList.add(current);
          btnLibrRefs.classList.remove(current);
        }
        const logoRefs=document.querySelector('.logo')
        logoRefs.addEventListener('click',homeOpenClick)
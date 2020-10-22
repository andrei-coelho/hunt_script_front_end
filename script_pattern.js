/**
 * 
 *         ____     ____     ____      ____     _____________     ____________    
 *        /   /|   /   /|   /   /|    /   /|   /    ____     /|  /___    ____/|   
 *       /   /_/__/   / /  /   / /   /   / /  /   /  ___/   / /  |__/   / ____/   
 *      /    ____    / /  /   / /   /   / /  /   / /   /   / /     /   / /        
 *     /   / ___/   / /  /   /_/___/   / /  /   / /   /   / /     /   / /         
 *    /___/ /  /___/ /  /_____________/ /  /___/ /   /___/ /     /___/ /          
 *    |____/   |____/   |______________/   |____/    |____/      |____/   
 * 
 *       [http://huntmarketing.com.br] 
 * 
 *        @version 1.1
 *        @author
 *          ┏━━━┓━━┳━━━━┓━━━┓━━┓━┓
 *          ┃ ┏┓┃ ┃┃┃ ┓┓┃┃━┓┃ ┳┛ ┃
 *          ┃ ┣┃┃ ┃┃┃ ┻┛┃┃━┓┃ ┻┓ ┃
 *          ┗━┛┗┛━┻━┛━━━┛━ ┗┗━━┛━┛
 *        @description
 *          Script auxiliar do Robô Hunter
 *          Usado para computar cliques dos perfis no FB      
 *        @client 
 *          -> my_client_here <-  
 *                                                            
 * 
 */



/*
    PARA TESTES ------ apague esse comentário depois
    const _ATUAL_URL = 'minha_url_para_test/slug/id_fb'.trim(),
    use o id do FB -> andrei.coelho.5 <- na url
*/

console.log(`
         ____     ____     ____      ____     _____________     ____________    
        /   /|   /   /|   /   /|    /   /|   /    ____     /|  /___    ____/|   
       /   /_/__/   / /  /   / /   /   / /  /   /  ___/   / /  |__/   / ____/   
      /    ____    / /  /   / /   /   / /  /   / /   /   / /     /   / /        
     /   / ___/   / /  /   /_/___/   / /  /   / /   /   / /     /   / /         
    /___/ /  /___/ /  /_____________/ /  /___/ /   /___/ /     /___/ /          
    |____/   |____/   |______________/   |____/    |____/      |____/  
   
    script carregado!
`);


// CONFIG INICIAL
const _ATUAL_URL         = window.location.href.trim(),
      _API_URL_HUNT      = "https://www.huntmarketing.com.br/api/";

// CONFIG CLIENTE
const _DATA_CLIENT_NAME  = "my_client_here",
      _BG_COLOR_TEMPLAT  = "#333";

// CONFIG DA EXPRESSÃO REGULAR PARA ENVIO DE INFORMAÇÕES
const _expression        = /slug\/([^\s]{3,})/g,
      _grupos            = _expression.exec(_ATUAL_URL);

// CONFIG DAS INFORMAÇÕES QUE SERÃO ENVIADAS
const _infos = _grupos ? {

        slug:"geral",
        idFB:_grupos[1]

    } : false;
    
var urAPI  = _API_URL_HUNT + _DATA_CLIENT_NAME + "/save_access/" + _infos.slug + "/" + _infos.idFB;





if(_infos) _hunt_save_access_id(_infos);
var statusD = false;

function _hunt_save_access_id(_grupos) {

    var script  = document.createElement('script');
    script.src  = 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js';
    script.type = 'text/javascript';
   
    script.onload = function() {

        var $ = window.jQuery;

        $.ajax({

            url: urAPI,
            type: 'get',

            success: function (response) {
                if(response.error == false){
                    let template = _hunt_generateMessageBoasVindas(response.user.nome);
                    $('body').append(template);
                    $("#close_toast_"+_DATA_CLIENT_NAME).click(function(){
                        _hunt_close();
                    })
                    _hunt_dismiss();
                }
            }

        });

    };

    // adiciona o jquery
    document.getElementsByTagName('head')[0].appendChild(script);
}

function _hunt_dismiss() {
    setTimeout(function() {
        _hunt_close();
    }, 5000);
}

function _hunt_close(){

    const ELEMENT_TOAST = document.getElementById("toast_"+_DATA_CLIENT_NAME);

    if(!statusD){

        statusD = true;
        var opacity = 1;

        var apagar  = setInterval(function() {
            if(opacity > 0){
                opacity = opacity - 0.1;
                ELEMENT_TOAST.style.opacity = opacity;
            } else {
                ELEMENT_TOAST.style.display = 'none';
                clearInterval(apagar);
            }
        }, 50);

    }
}

function _hunt_generateMessageBoasVindas(nome){
    return `<div id="toast_${_DATA_CLIENT_NAME}" style="
        font-family: Arial,Helvetica,sans-serif;
        min-width: 250px;
        margin-left: -125px;
        background-color: ${_BG_COLOR_TEMPLAT};
        color: #fff;
        text-align: center;
        border-radius: 2px;
        padding: 16px;
        position: fixed;
        z-index: 999999999;
        right: 10px;
        top: 30px;
        border-radius: 13px;
        -webkit-box-shadow: 0px 0px 49px -5px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 0px 49px -5px rgba(0,0,0,0.75);
        box-shadow: 0px 0px 49px -5px rgba(0,0,0,0.75);
        height: 10px;
        text-align: right;
    ">  
        <p style="position: relative; top: -20px; text-align: center; width: 100%;">Olá <b>${nome}</b>, seja bem vindo!</p>
        <span id="close_toast_${_DATA_CLIENT_NAME}" style="
            width: 10px; height: 10px;
            position: relative; top: -75px;
            right: -20px; text-align: right;
            background-color: white;
            padding: 4px;
            padding-left: 6px;
            padding-right: 6px;
            border-radius: 30px;
            cursor:pointer;
            ">
            <img style="width: 10px;" 
            src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjMyOXB0IiB2aWV3Qm94PSIwIDAgMzI5LjI2OTMzIDMyOSIgd2lkdGg9IjMyOXB0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im0xOTQuODAwNzgxIDE2NC43Njk1MzEgMTI4LjIxMDkzOC0xMjguMjE0ODQzYzguMzQzNzUtOC4zMzk4NDQgOC4zNDM3NS0yMS44MjQyMTkgMC0zMC4xNjQwNjMtOC4zMzk4NDQtOC4zMzk4NDQtMjEuODI0MjE5LTguMzM5ODQ0LTMwLjE2NDA2MyAwbC0xMjguMjE0ODQ0IDEyOC4yMTQ4NDQtMTI4LjIxMDkzNy0xMjguMjE0ODQ0Yy04LjM0Mzc1LTguMzM5ODQ0LTIxLjgyNDIxOS04LjMzOTg0NC0zMC4xNjQwNjMgMC04LjM0Mzc1IDguMzM5ODQ0LTguMzQzNzUgMjEuODI0MjE5IDAgMzAuMTY0MDYzbDEyOC4yMTA5MzggMTI4LjIxNDg0My0xMjguMjEwOTM4IDEyOC4yMTQ4NDRjLTguMzQzNzUgOC4zMzk4NDQtOC4zNDM3NSAyMS44MjQyMTkgMCAzMC4xNjQwNjMgNC4xNTYyNSA0LjE2MDE1NiA5LjYyMTA5NCA2LjI1IDE1LjA4MjAzMiA2LjI1IDUuNDYwOTM3IDAgMTAuOTIxODc1LTIuMDg5ODQ0IDE1LjA4MjAzMS02LjI1bDEyOC4yMTA5MzctMTI4LjIxNDg0NCAxMjguMjE0ODQ0IDEyOC4yMTQ4NDRjNC4xNjAxNTYgNC4xNjAxNTYgOS42MjEwOTQgNi4yNSAxNS4wODIwMzIgNi4yNSA1LjQ2MDkzNyAwIDEwLjkyMTg3NC0yLjA4OTg0NCAxNS4wODIwMzEtNi4yNSA4LjM0Mzc1LTguMzM5ODQ0IDguMzQzNzUtMjEuODI0MjE5IDAtMzAuMTY0MDYzem0wIDAiLz48L3N2Zz4=" />
        </span>
    </div>`;
}

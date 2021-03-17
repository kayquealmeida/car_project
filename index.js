(function ($, doc) {
  'use strict';

  var app = (function () {

    return {
      initEvents: function initEvents() {
        this.storeInformation();
        this.init();
      },

      storeInformation: function storeInformation() {
        var ajax = new XMLHttpRequest();
        ajax.open('GET', 'data/company.json', true);
        ajax.send()
        ajax.addEventListener('readystatechange', this.getStoreInformation, false);
      },

      getStoreInformation: function getStoreInformation() {
        if(!app.isRequestOk.call(this))
          return;

        var data = JSON.parse(this.responseText);
        var $tituloPagina = $('[data-js="tituloPagina"]').get();
        $tituloPagina.textContent = data.name + ' - ' + data.phone;
      },

      isRequestOk: function isRequestOk() {
        return this.readyState === 4 && this.status === 200;
      },

      init: function init() {
        $('[data-js="formCadastro"]').on('submit', this.handleForm);
      },

      handleForm: function handleForm(e) {
        e.preventDefault();
        var $tBody = $('[data-js="tableBody"]').get();
        $tBody.appendChild(app.createNewCar());
      },

      createNewCar: function createNewCar() {
        var $fragment = doc.createDocumentFragment();
        var $tr = doc.createElement('tr');
        var $imageTd = doc.createElement('td');
        var $marcaModeloTd = doc.createElement('td');
        var $anoTd = doc.createElement('td');
        var $placaTd = doc.createElement('td');
        var $corTd = doc.createElement('td');
        var $img = doc.createElement('img');

        $img.setAttribute('src', $('[data-js="inputImg"]').get().value);
        $imageTd.appendChild($img);
        $marcaModeloTd.textContent = $('[data-js="inputMarcaModelo"]').get().value;
        $anoTd.textContent = $('[data-js="inputAno"]').get().value;
        $placaTd.textContent = $('[data-js="inputPlaca"]').get().value;
        $corTd.textContent = $('[data-js="inputCor"]').get().value;

        $tr.appendChild($imageTd);
        $tr.appendChild($marcaModeloTd);
        $tr.appendChild($anoTd);
        $tr.appendChild($placaTd);
        $tr.appendChild($corTd);

        return $fragment.appendChild($tr);

      }

    };

  })()

  app.initEvents();


})(window.DOM, document);

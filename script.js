// Inicializa a câmera
function iniciarCamera() {
    const video = document.getElementById('camera');
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" } // Usa a câmera traseira
        }).then((stream) => {
            video.srcObject = stream;
            video.play();
        }).catch((err) => {
            console.error("Erro ao acessar a câmera: ", err);
            alert("Erro ao acessar a câmera: " + err.message);
        });
    } else {
        alert('Navegador não suporta acesso à câmera.');
    }
}

// Mostrar a câmera quando o botão é clicado
function mostrarCamera() {
    document.getElementById('camera-container').style.display = 'block';
    iniciarCamera();
}

// Captura a foto da câmera e exibe
function capturarFoto() {
    const video = document.getElementById('camera');
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Adiciona marca d'água na foto
    context.font = "20px Arial";
    context.fillStyle = "white";
    context.fillText(`AMI: ${document.getElementById('ami').value}`, 10, 20);
    context.fillText(`Site: ${document.getElementById('site').value}`, 10, 50);
    context.fillText(`Técnico: ${document.getElementById('tecnico').value}`, 10, 80);
    context.fillText(`Localização: ${document.getElementById('localizacao').value}`, 10, 110);

    const dataURL = canvas.toDataURL('image/png');
    exibirFoto(dataURL);
}

// Exibe a foto abaixo do relatório
function exibirFoto(dataURL) {
    const img = document.createElement('img');
    img.src = dataURL;
    document.getElementById('photos').appendChild(img);
    document.getElementById('save-button').style.display = 'block';
    document.getElementById('whatsapp-button').style.display = 'block';
}

// Salva a foto localmente
function salvarFoto(dataURL) {
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'foto_relatorio.png';
    link.click();
}

document.getElementById('save-button').addEventListener('click', function () {
    const photos = document.getElementById('photos').getElementsByTagName('img');
    if (photos.length > 0) {
        const dataURL = photos[0].src;
        salvarFoto(dataURL);
        alert('Foto salva no dispositivo.');
    }
});

// Função para enviar relatório e foto via WhatsApp
function enviarRelatorio() {
    const resultado = document.getElementById('resultado').textContent;
    const photos = document.getElementById('photos').getElementsByTagName('img');
    let dataURL = '';
    if (photos.length > 0) {
        dataURL = photos[0].src; // Considera apenas a primeira foto para simplicidade
    }
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(resultado)}%0A${encodeURIComponent(dataURL)}`;
    window.open(whatsappUrl, '_blank');
}

document.getElementById('whatsapp-button').addEventListener('click', function () {
    enviarRelatorio();
});

// Função para obter localização
function obterLocalizacao() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const altitude = position.coords.altitude || 'N/A'; // Nem todos os dispositivos fornecem altitude

            // Adiciona localização no formulário
            document.getElementById('localizacao').value = `Latitude: ${latitude}, Longitude: ${longitude}, Altitude: ${altitude}`;
        }, (err) => {
            console.error("Erro ao obter localização: ", err);
            alert("Erro ao obter localização: " + err.message);
        });
    } else {
        alert('Geolocalização não é suportada pelo navegador.');
    }
}

// Chama a função ao carregar a página
window.onload = obterLocalizacao;

// Função para adicionar mais gabinetes
function adicionarGabinete() {
    const gabinetesContainer = document.getElementById('gabinetesContainer');
    const numeroGabinetes = gabinetesContainer.getElementsByClassName('gabinete').length + 1;

    const gabineteDiv = document.createElement('div');
    gabineteDiv.className = 'gabinete';
    gabineteDiv.id = `gabineteDiv${numeroGabinetes}`;
    gabineteDiv.innerHTML = `
        <label for="gabinete${numeroGabinetes}">*INFORMAR GABINETE - ${numeroGabinetes}:*</label>
        <select id="gabinete${numeroGabinetes}" required>
            <option value="DELTA">DELTA</option>
            <option value="DELTA ORION">DELTA ORION</option>
            <option value="DELTA TX">DELTA TX</option>
            <option value="ELTEK">ELTEK</option>
            <option value="ELTEK FULL TX">ELTEK FULL TX</option>
            <option value="EMERSON">EMERSON</option>
            <option value="EMERSON TX">EMERSON TX</option>
            <option value="PHB">PHB</option>
        </select>

        <label for="retificadores${numeroGabinetes}">*QUANTIDADE DE RETIFICADORES POR GABINETE-FCC:*</label>
        <input type="number" id="retificadores${numeroGabinetes}" required>

        <label for="baterias${numeroGabinetes}">*QUANTIDADE DE BATERIAS NO GABINETE-FCC:*</label>
        <input type="number" id="baterias${numeroGabinetes}" required>

        <label for="siteBateria${numeroGabinetes}">*SITE COM BATERIA:*</label>
        <select id="siteBateria${numeroGabinetes}" required>
            <option value="SIM">SIM</option>
            <option value="NAO">NÃO</option>
        </select>

        <label for="semAutonomia${numeroGabinetes}">*SEM AUTONOMIA:*</label>
        <input type="checkbox" id="semAutonomia${numeroGabinetes}">

        <label for="infoBateria${numeroGabinetes}">*INFORMAÇÕES DA BATERIA:*</label>
        <select id="infoBateria${numeroGabinetes}" required>
            <option value="EP TELECOM">EP TELECOM</option>
            <option value="HUAWEI">HUAWEI</option>
            <option value="MOURA">MOURA</option>
            <option value="NEWMAX">NEWMAX</option>
            <option value="UNIPOWER">UNIPOWER</option>
            <option value="ZTE">ZTE</option>
        </select>

        <label for="quantidadeBancos${numeroGabinetes}">*QUANTIDADE DE BANCOS:*</label>
        <input type="number" id="quantidadeBancos${numeroGabinetes}" required>

        <label for="capacidade${numeroGabinetes}">*CAPACIDADE:*</label>
        <input type="text" id="capacidade${numeroGabinetes}" required>

        <label for="volts${numeroGabinetes}">*VOLTS:*</label>
        <select id="volts${numeroGabinetes}" required>
            <option value="2 V">2 V</option>
            <option value="12 V">12 V</option>
            <option value="24 V">24 V</option>
            <option value="48 V">48 V</option>
        </select>

        <label for="elemento${numeroGabinetes}">*ELEMENTO:*</label>
        <input type="text" id="elemento${numeroGabinetes}" required>

        <label for="consumoFonte${numeroGabinetes}">*CONSUMO FONTE:*</label>
        <input type="text" id="consumoFonte${numeroGabinetes}" required>

        <button type="button" onclick="removerGabinete(${numeroGabinetes})">Remover Gabinete</button>
    `;

    gabinetesContainer.appendChild(gabineteDiv);
}

// Função para remover gabinetes
function removerGabinete(numero) {
    const gabineteDiv = document.getElementById(`gabineteDiv${numero}`);
    gabineteDiv.remove();
}

// Função para gerar o relatório (continuação)
function gerarRelatorio() {
    const relatorio = {
        site: document.getElementById('site').value.toUpperCase(),
        ami: document.getElementById('ami').value.toUpperCase(),
        tecnico: document.getElementById('tecnico').value.toUpperCase(),
        supervisor: document.getElementById('supervisor').value.toUpperCase(),
        coordenador: document.getElementById('coordenador').value.toUpperCase(),
        dataAcionamento: document.getElementById('dataAcionamento').value,
        dataDeslocamento: document.getElementById('dataDeslocamento').value,
        dataEntradaSite: document.getElementById('dataEntradaSite').value,
        dataSaidaSite: document.getElementById('dataSaidaSite').value,
        quemAcionou: document.getElementById('quemAcionou').value.toUpperCase(),
        cadeado: document.getElementById('cadeado').value.toUpperCase(),
        modeloCadeado: document.getElementById('modeloCadeado').value.toUpperCase(),
        ModeloGradil: document.getElementById('ModeloGradil').value.toUpperCase(),
        vandalizado: document.getElementById('vandalizado').value.toUpperCase(),
        Gradilcadeado: document.getElementById('Gradilcadeado').value.toUpperCase(),
        siteGPON: document.getElementById('siteGPON').value.toUpperCase(),
        zeladoria: document.getElementById('zeladoria').value.toUpperCase(),
        estadoPortas: document.getElementById('estadoPortas').value.toUpperCase(),
        portaGabinete: document.getElementById('portaGabinete').value.toUpperCase(),
        posteInterno: document.getElementById('posteInterno').value.toUpperCase(),
        iluminacao: document.getElementById('iluminacao').value.toUpperCase(),
        falhaAtividade: document.getElementById('falhaAtividade').value.toUpperCase(),
        causaEncontrada: document.getElementById('causaEncontrada').value.toUpperCase(),
        acaoRealizada: document.getElementById('acaoRealizada').value.toUpperCase(),
        pendencias: document.getElementById('pendencias').value.toUpperCase(),
        amiPendencia: document.getElementById('amiPendencia').value.toUpperCase(),
        testadoCom: document.getElementById('testadoCom').value.toUpperCase(),
        obs: document.getElementById('obs').value.toUpperCase(),
        gabinetes: []
    };

    const gabinetes = document.getElementsByClassName('gabinete');
    for (let i = 0; i < gabinetes.length; i++) {
        const gabinete = {
            tipo: document.getElementById(`gabinete${i + 1}`).value.toUpperCase(),
            retificadores: document.getElementById(`retificadores${i + 1}`).value,
            baterias: document.getElementById(`baterias${i + 1}`).value,
            siteBateria: document.getElementById(`siteBateria${i + 1}`).value.toUpperCase(),
            semAutonomia: document.getElementById(`semAutonomia${i + 1}`).checked ? 'SIM' : 'NÃO',
            infoBateria: document.getElementById(`infoBateria${i + 1}`).value.toUpperCase(),
            quantidadeBancos: document.getElementById(`quantidadeBancos${i + 1}`).value,
            capacidade: document.getElementById(`capacidade${i + 1}`).value.toUpperCase(),
            volts: document.getElementById(`volts${i + 1}`).value.toUpperCase(),
            elemento: document.getElementById(`elemento${i + 1}`).value.toUpperCase(),
            consumoFonte: document.getElementById(`consumoFonte${i + 1}`).value.toUpperCase()
        };
        relatorio.gabinetes.push(gabinete);
    }

    let resultado = `
*SITE:* ${relatorio.site}
*AMI:* ${relatorio.ami}
*NOME DO TÉCNICO:* ${relatorio.tecnico}
*NOME DO SUPERVISOR:* ${relatorio.supervisor}
*COORDENADOR:* ${relatorio.coordenador}
*DATA ACIONAMENTO:* ${relatorio.dataAcionamento}
*DATA HORA DESLOCAMENTO:* ${relatorio.dataDeslocamento}
*DATA HORA ENTRADA SITE:* ${relatorio.dataEntradaSite}
*DATA HORA SAÍDA SITE:* ${relatorio.dataSaidaSite}
*QUEM ACIONOU:* ${relatorio.quemAcionou}
*SITE POSSUI CADEADO:* ${relatorio.cadeado}
*MODELO DO CADEADO:* ${relatorio.modeloCadeado}
*GRADIL POSSUI CADEADO:* ${relatorio.Gradilcadeado}
*MODELO CADEADO GRADIL:* ${relatorio.ModeloGradil}
*SITE VANDALIZADO:* ${relatorio.vandalizado}`;

    relatorio.gabinetes.forEach((gabinete, index) => {
        resultado += `
*INFORMAR GABINETE - ${index + 1}:* ${gabinete.tipo}
*QUANTIDADE DE RETIFICADORES POR GABINETE-FCC:* ${gabinete.retificadores}
*QUANTIDADE DE BATERIAS NO GABINETE-FCC:* ${gabinete.baterias}
*SITE COM BATERIA:* ${gabinete.siteBateria}
*SEM AUTONOMIA:* ${gabinete.semAutonomia}
*INFORMAÇÕES DA BATERIA:* ${gabinete.infoBateria}
*QUANTIDADE DE BANCOS:* ${gabinete.quantidadeBancos}
*CAPACIDADE:* ${gabinete.capacidade}
*VOLTS:* ${gabinete.volts}
*ELEMENTO:* ${gabinete.elemento}
*CONSUMO FONTE:* ${gabinete.consumoFonte}`;
    });

    resultado += `
*SITE POSSUI REDE GPON:* ${relatorio.siteGPON}
*NECESSÁRIO ZELADORIA:* ${relatorio.zeladoria}
*ESTADO DAS PORTAS DOS GABINETES:* ${relatorio.estadoPortas}
*INFORMAR A PORTA DE QUAL GABINETE:* ${relatorio.portaGabinete}
*EXISTÊNCIA POSTE INTERNO:* ${relatorio.posteInterno}
*EXISTÊNCIA ILUMINAÇÃO INTERNA-EXTERNA:* ${relatorio.iluminacao}
*FALHA DA ATIVIDADE:* ${relatorio.falhaAtividade}
*CAUSA ENCONTRADA:* ${relatorio.causaEncontrada}
*AÇÃO REALIZADA:* ${relatorio.acaoRealizada}
*PENDÊNCIAS:* ${relatorio.pendencias}
*AMI DA PENDENCIA:* ${relatorio.amiPendencia}
*TESTADO COM:* ${relatorio.testadoCom}
*OBS:* ${relatorio.obs}`;

    document.getElementById('resultado').textContent = resultado;
}

// Evento para gerar relatório
document.getElementById('gerarRelatorioButton').addEventListener('click', gerarRelatorio);

// Evento para iniciar a câmera
document.getElementById('camera-init-button').addEventListener('click', mostrarCamera);

// Evento para capturar a foto
document.getElementById('capture-button').addEventListener('click', capturarFoto);

// Evento para salvar a foto localmente
document.getElementById('save-button').addEventListener('click', function () {
    const photos = document.getElementById('photos').getElementsByTagName('img');
    if (photos.length > 0) {
        const dataURL = photos[0].src;
        salvarFoto(dataURL);
        alert('Foto salva no dispositivo.');
    }
});

// Evento para enviar relatório e foto via WhatsApp
document.getElementById('whatsapp-button').addEventListener('click', enviarRelatorio);

// Obtém a localização ao carregar a página
window.onload = obterLocalizacao;
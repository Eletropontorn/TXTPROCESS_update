function processarArquivo() {
  const input = document.getElementById("arquivoEntrada");
  const file = input.files[0];

  if (!file) {
    alert("Selecione um arquivo primeiro.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function(e) {
    const conteudo = e.target.result;
    const linhas = conteudo.split(/\r?\n/).slice(1); // remove o cabeçalho

    const novasLinhas = [];

    for (const linha of linhas) {
      if (!linha.trim()) continue; // pula linhas vazias

      const partes = linha.split(/\t+/); // separa por tabulações

      const matricula = partes[2];
      const dataHora = partes[partes.length - 1];

      if (matricula && dataHora) {
        const matriculaFormatada = matricula.padStart(5, "0");
        novasLinhas.push(`${matriculaFormatada} ${dataHora}`);
      }
    }

    const resultado = novasLinhas.join("\n");
    const blob = new Blob([resultado], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.getElementById("downloadLink");
    if (link.href) URL.revokeObjectURL(link.href);
    link.href = url;
    link.download = "arquivo_processado.txt";
    link.style.display = "inline-block";

    document.getElementById("mensagem").innerText = "✅ Arquivo processado com sucesso!";
  };

  reader.readAsText(file);
}


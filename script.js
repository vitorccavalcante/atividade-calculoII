document.getElementById("equation-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Obter os coeficientes inseridos
    const a = parseFloat(document.getElementById("a").value);
    const b = parseFloat(document.getElementById("b").value);
    const c = parseFloat(document.getElementById("c").value);

    // Calcular as raízes usando a fórmula de Bhaskara
    const discriminante = b * b - 4 * a * c;
    let raiz1, raiz2;
    let processText = `<strong>Passos:</strong><br>`;

    if (discriminante > 0) {
        raiz1 = (-b + Math.sqrt(discriminante)) / (2 * a);
        raiz2 = (-b - Math.sqrt(discriminante)) / (2 * a);
        processText += `<br>Δ = b² - 4ac = ${b}² - 4(${a})(${c}) = ${discriminante}<br>`;
        processText += `<br>x₁ = (-b + √Δ) / 2a = ${(-b + Math.sqrt(discriminante)).toFixed(2)} / ${2 * a} = ${raiz1.toFixed(2)}<br>`;
        processText += `x₂ = (-b - √Δ) / 2a = ${(-b - Math.sqrt(discriminante)).toFixed(2)} / ${2 * a} = ${raiz2.toFixed(2)}<br>`;
        document.getElementById("roots").textContent = `Raízes: x₁ = ${raiz1.toFixed(2)}, x₂ = ${raiz2.toFixed(2)}`;
    } else if (discriminante === 0) {
        raiz1 = -b / (2 * a);
        processText += `<br>Δ = b² - 4ac = ${b}² - 4(${a})(${c}) = 0<br>`;
        processText += `<br>Raiz única: x = -b / 2a = ${-b} / ${2 * a} = ${raiz1.toFixed(2)}<br>`;
        document.getElementById("roots").textContent = `Raiz única: x = ${raiz1.toFixed(2)}`;
    } else {
        document.getElementById("roots").textContent = "Não existem raízes reais.";
        processText += `Δ = b² - 4ac = ${b}² - 4(${a})(${c}) = ${discriminante}<br>`;
        processText += `<br>O discriminante é negativo, então não existem raízes reais.<br>`;
    }


    // Mostrar o processo no HTML
    document.getElementById("process").innerHTML = processText;

    // Encolher o formulário
    document.getElementById("equation-form").classList.add("shrink");
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("result").classList.add("shrink");


    // Mostrar o gráfico da equação quadrática
    const ctx = document.getElementById('quadratic-graph').getContext('2d');
    document.getElementById('quadratic-graph').classList.remove("hidden");

    if (window.chart) {
        window.chart.destroy();
    }

    const data = [];
    for (let x = -10; x <= 10; x += 0.1) {
        const y = a * Math.pow(x, 2) + b * x + c;
        data.push({x, y});
    }

    window.chart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Função quadrática',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                annotation: {
                    annotations: {
                        line0: {
                            type: 'line',
                            yMin: 0,
                            yMax: 0,
                            borderColor: 'red', // Cor da linha
                            borderWidth: 2, // Espessura da linha
                            borderDash: [10, 5], // Estilo da linha (pontilhada)
                            label: {
                                content: 'y = 0',
                                enabled: true,
                                position: 'top'
                            }
                        },
                        line1: {
                            type: 'line',
                            xMin: 0,
                            xMax: 0,
                            borderColor: 'blue', // Cor da linha
                            borderWidth: 2, // Espessura da linha
                            borderDash: [10, 5], // Estilo da linha (pontilhada)
                            label: {
                                content: 'x = 0',
                                enabled: true,
                                position: 'top'
                            }
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    ticks: {
                        stepSize: 1
                    }
                },
                y: {
                    ticks: {
                        stepSize: 10
                    }
                }
            }
        }
    });
});
